var lib = {};

module.exports = lib;
var jsex = require("jsex");

lib.Cmp = {gt:1,eq:0,lt:-1};
lib.Order = {small:-1, large:1, equal:0};

lib.AscCmp = function(v1, v2)
{
    return v1 < v2 ? lib.Order.small : v1 > v2 ? lib.Order.large : lib.Order.equal;
};

lib.DescCmp = function(v1, v2)
{
    return v1 < v2 ? lib.Order.large : v1 > v2 ? lib.Order.small : lib.Order.equal;
};

lib.IsAndroid = function () {
    return cc.sys.os === cc.sys.OS_ANDROID;
};

lib.IsIOS = function () {
    return cc.sys.os === cc.sys.OS_IOS;
};

lib.IsWindows = function () {
    return cc.sys.os === cc.sys.OS_WINDOWS;
};

lib.IsMac = function () {
    return cc.sys.os === cc.sys.OS_OSX;
};

/**
 *
 * @param returnValue
 * @return {{_return: *, _break: number}}
 */
lib.foreachBreak = function (returnValue) {
    return {_return:returnValue, _break:1};
};

/**
 * Iterate over an object or an array, executing a function for each matched element.
 * @param {object|array} obj
 * @param {function} iterator
 * @param {object} [context]
 */
lib.foreach = function (obj, iterator, context) {
    if (!obj)
        return;
    if (obj instanceof Array) {
        for (var i = 0, li = obj.length; i < li; i++) {
            var re = iterator.call(context, obj[i], i);

            if(re && re._break)
            {
                return re._return;
            }
        }
    } else {
        for (var key in obj) {
            var re = iterator.call(context, obj[key], key) ;
            if(re && re._break)
            {
                return re._return;
            }
        }
    }
};

lib.IsEmptyJson = function(obj)
{
    if(!obj) return true;

        for(var k in obj)
            return false;

        return true;
};

// SvrTime

lib.SvrTime = {
    Clt0:0
};

lib.SvrTime.Svr0 = {
    Y: 0, // 当前年，月，日
    M: 0,
    D: 0,
    ms: 0, // 当前时间的毫秒数
    t: 0, // 当前总毫秒数
};

lib.SvrTime.Init = function (svr_time0) {
    if(!svr_time0) return;
    lib.SvrTime.Svr0 = svr_time0;
    lib.SvrTime.Clt0 = Date.now();
};
/***
 *
 * @param off_ms
 * @returns {Date}
 */
lib.SvrTime.GetTimeOff = function (off_ms) {
    var s0 = lib.SvrTime.Svr0;
    var date =  new Date();
    date.setFullYear(s0.Y, s0.M - 1, s0.D);
    date.setHours(0, 0, 0,s0.ms+ off_ms );
    // date.setMilliseconds(s0.ms+ off_ms);
    return date;
};
/**
 *
 * @param total_ms
 * @returns {Date}
 */
lib.SvrTime.GetTimeTms = function (total_ms) {
    return lib.SvrTime.GetTimeOff(total_ms - lib.SvrTime.Svr0.t);
};

/**
 *
 * @returns {Date}
 */
lib.SvrTime.Now = function () {
    return lib.SvrTime.GetTimeOff(Date.now() - lib.SvrTime.Clt0);
};


/**
 *
 * @returns {Number}
 */
lib.SvrTime.NowMS = function () {
    return  Date.now() - lib.SvrTime.Clt0 + lib.SvrTime.Svr0.t;
};



// TimeSpan

/**
 *
 * @param { Number | {h:*, m:*, s:*, d:*} } secs
 */
lib.TimeSpan = function(secs){

    this._secs = 0;
    if(typeof secs === 'number')
        this._secs = Math.floor(secs || 0);
    else if (secs){
        this._secs = Math.floor((secs.s || 0)
            + (secs.h || 0) * lib.TimeSpan.SecsPerHour
            + (secs.m || 0) * lib.TimeSpan.SecsPerMinute
            + (secs.d || 0) * lib.TimeSpan.SecsPerDay
        )
        ;
    }



    this.totalSeconds=function() {
        return this._secs;
    };

    this.totalMins=function() {
        return Math.floor(this._secs / lib.TimeSpan.SecsPerMinute);
    };


    this.totalHours=function() {
        return Math.floor(this._secs / lib.TimeSpan.SecsPerHour);
    };

    this.totalDays=function() {
        return Math.floor(this._secs / lib.TimeSpan.SecsPerDay);
    };

    this.day=function() {
        return Math.floor(this._secs / lib.TimeSpan.SecsPerDay);
    };

    this.hour=function() {
        return Math.floor((this._secs % lib.TimeSpan.SecsPerDay) / lib.TimeSpan.SecsPerHour);
    };

    this.minute=function() {
        return Math.floor((this._secs % lib.TimeSpan.SecsPerHour) / lib.TimeSpan.SecsPerMinute);
    };

    this.second=function() {
        return this._secs % lib.TimeSpan.SecsPerMinute;
    };


    /**
     *
     * @param {string} format d,h,m,s, D,H,M,S
     * @returns {string}
     */
    this.toString=function (format) {
        var d = this.day();
        var h = this.hour();
        var m = this.minute();
        var s = this.second();
        return jsex.String.Format(format, {
            d: d, h: h, m: m, s: s
            , H: h < 10 ? "0" + h : h
            , M: m < 10 ? "0" + m : m
            , S: s < 10 ? "0" + s : s
        });
    }
};


lib.TimeSpan.SecsPerHour = 60*60;
lib.TimeSpan.SecsPerMinute = 60;
lib.TimeSpan.MinutesPerHour = 60;
lib.TimeSpan.SecsPerDay = 24 * 60*60;
lib.TimeSpan.MinutesPerDay = 24 * 60;
lib.TimeSpan.HoursPerDay = 24;

// Bit


lib.Bit = lib.Bit || {};

// 0   1   2   3   4   5   6   7   8   9   a   b   c   d   e   f
lib.Bit. TableNumOneF    =  [ 0,  1,  1,  2,  1,  2,  2,  3,  1,  2,  2,  3,  2,  3,  3,  4];
lib.Bit. TableAddOneF    =  [ 1,  3,  3,  7,  5,  7,  7,0xf,  9,0xb,0xb,0xf,0xd,0xf,0xf,0xf];
lib.Bit. TableAddOneLowF =  [ 1,  3,  3,  7,  3,  7,  7,0xf,  3,  7,  7,0xf,  7,0xf,0xf,0xf];
lib.Bit. TableDelOneF    =  [ 0,  0,  0,  1,  0,  1,  2,  3,  0,  1,  2,  3,  4,  5,  6,  7];
lib.Bit. TableDelOneLowF =  [ 0,  0,  0,  1,  0,  1,  1,  3,  0,  1,  1,  3,  1,  3,  3,  7];


lib.Bit.sub = function(v1, v2){
    return ((v1)& ~(v2));
};

lib.Bit.add = function(v1, v2){
    return v1|v2;
};

lib.Bit.hasAll = function(v, bits){ return (((v)&(bits)) === (bits)); };

lib.Bit.hasAny = function(v, bits){ return (((v)&(bits)) !== 0); };

lib.Bit.hasNothing = function(v, bits) { return (((v)&(bits)) === 0); };

lib.Bit.hasSame = function(v1, v2, bits){ return   (((v1)&(bits)) === ((v2)&(bits))); };

lib.Bit.count1 = function(bits){

    var n = 0;
    while ( bits > 0 )
    {
        n += lib.Bit.TableNumOneF[bits & 0xf];
        bits >>= 4;
    }
    return n;
};



lib.Bit.firstR1 = function( bits)
{
    var bit = 0;
    while ( bits > 0 )
    {
        if ( (bits & 1) !== 0)
        {
            return bit;
        }
        bits >>= 1;
        bit++;
    }

    return -1;
};

lib.Bit.firstL1 = function( bits)
{
    var bit = 0;
    while ( bits > 0 )
    {
        bits >>= 1;
        bit++;
    }

    return bit - 1;
};

lib.Bit64 = lib.Bit64 || {};

lib.Bit64.Shift = [ 0x1	,//	1
    0x2	,//	2
    0x4	,//	3
    0x8	,//	4
    0x10	,//	5
    0x20	,//	6
    0x40	,//	7
    0x80	,//	8
    0x100	,//	9
    0x200	,//	10
    0x400	,//	11
    0x800	,//	12
    0x1000	,//	13
    0x2000	,//	14
    0x4000	,//	15
    0x8000	,//	16
    0x10000	,//	17
    0x20000	,//	18
    0x40000	,//	19
    0x80000	,//	20
    0x100000	,//	21
    0x200000	,//	22
    0x400000	,//	23
    0x800000	,//	24
    0x1000000	,//	25
    0x2000000	,//	26
    0x4000000	,//	27
    0x8000000	,//	28
    0x10000000	,//	29
    0x20000000	,//	30
    0x40000000	,//	31
    0x80000000	,//	32
    0x100000000	,//	33
    0x200000000	,//	34
    0x400000000	,//	35
    0x800000000	,//	36
    0x1000000000	,//	37
    0x2000000000	,//	38
    0x4000000000	,//	39
    0x8000000000	,//	40
    0x10000000000	,//	41
    0x20000000000	,//	42
    0x40000000000	,//	43
    0x80000000000	,//	44
    0x100000000000	,//	45
    0x200000000000	,//	46
    0x400000000000	,//	47
    0x800000000000	,//	48
    0x1000000000000	,//	49
    0x2000000000000	,//	50
    0x4000000000000	,//	51
    0x8000000000000	,//	52
    0x10000000000000	,//	53
    0x20000000000000	,//	54
    0x40000000000000	,//	55
    0x80000000000000	,//	56
    0x100000000000000	,//	57
    0x200000000000000	,//	58
    0x400000000000000	,//	59
    0x800000000000000	,//	60
    0x1000000000000000	,//	61
    0x2000000000000000	,//	62
    0x4000000000000000	,//	63
    0x8000000000000000	,//	64


];

lib.Bit64.shiftL = function (v, bits) {
    return v * lib.Bit64.Shift[bits];
};

lib.Bit64.shiftR = function (v, bits) {
    return Math.floor( v / lib.Bit64.Shift[bits] );
};


lib.Bit64.shiftR1 = function (v) {
    return (v- (v & 1))/2;
};

lib.Bit64.shiftR4 = function (v) {
    return (v- (v & 0xf))/16;
};

lib.Bit64.shiftR28 = function (v) {
    return (v- (v & 0xfffffff))/0x10000000;
};
lib.Bit64.shiftR31 = function (v) {
    return (v- (v & 0x7fffffff))/0x80000000;
};
lib.Bit64.shiftRlow = function (v, lowbits) {
    return (v - (v & (lib.Bit64.Shift[lowbits] - 1))) / lib.Bit64.Shift[lowbits];
};

lib.Bit64.MAX = 0x100000000 / 2;

lib.Bit64.or = function (v1 ,v2) {
    var re = v1 | v2;
    if((v1 < lib.Bit64.MAX) && (v2 < lib.Bit64.MAX))
        return re;
    return (re & 0x7fffffff) + lib.Bit64.shiftL(lib.Bit64.shiftR31(v1) | lib.Bit64.shiftR31(v2), 31);
};

lib.Bit64.and = function (v1, v2) {
    // cc.log("lib.Bit64.and", v1, v2);
    var re = v1 & v2;
    if((v1 < lib.Bit64.MAX) && (v2 < lib.Bit64.MAX))
        return re;
    return (re & 0x7fffffff) + lib.Bit64.shiftL(lib.Bit64.shiftR31(v1) & lib.Bit64.shiftR31(v2), 31);
    // cc.log("   re", re);

    // return re;
};

lib.Bit64.xor = function (v1, v2) {
    var re = v1 ^ v2;
    if((v1 < lib.Bit64.MAX) && (v2 < lib.Bit64.MAX))
        return re;
    return (re & 0x7fffffff) + lib.Bit64.shiftL(lib.Bit64.shiftR31(v1) ^ lib.Bit64.shiftR31(v2), 31);
};

lib.Bit64.not = function (v) {
    return  -(v + 1);
};


lib.Bit64.sub = function(v1, v2){
    return lib.Bit64.and(v1, lib.Bit64.not(v2));
};

lib.Bit64.add = function(v1, v2){
    return lib.Bit64.or(v1 ,v2);
};

lib.Bit64.hasAll = function(v, bits){ return (lib.Bit64.and((v),(bits)) === (bits)); };

lib.Bit64.hasAny = function(v, bits){

    if(v & bits)
        return true;

    if(lib.Bit64.shiftR28(v) & lib.Bit64.shiftR28(bits))
        return true;

    return false;
    // return (lib.Bit64.and((v),(bits)) !== 0);
};

lib.Bit64.hasNothing = function(v, bits) {
    if(v & bits)
        return false;

    if(lib.Bit64.shiftR28(v) & lib.Bit64.shiftR28(bits))
        return false;

    return true;

    // return (lib.Bit64.and((v),(bits)) === 0);
};

lib.Bit64.hasSame = function(v1, v2, bits){
    if((v1&bits) === (v2&bits))
    {
        var bits = lib.Bit64.shiftR28(bits);

        if((lib.Bit64.shiftR28(v1) & bits) === (lib.Bit64.shiftR28(v2) & bits))
        {
            return true;
        }
    }

    return false;
    // return   (lib.Bit64.and((v1),(bits)) === lib.Bit64.and((v2),(bits)));
};

lib.Bit64.count1 = function(bits){

    var n = 0;
    var bl = bits & 0xfffffff;
    while ( bl > 0 )
    {
        n += lib.Bit.TableNumOneF[bl & 0xf];
        bl >>= 4;
    }

    bl = lib.Bit64.shiftR28(bits);
    while ( bl > 0 )
    {
        n += lib.Bit.TableNumOneF[bl & 0xf];
        bl >>= 4;
    }

    return n;
};



lib.Bit64.firstR1 = function( bits)
{
    var bit = 0;

    var bl = bits & 0xfffffff;
    while ( bl > 0 )
    {
        if ( (bl & 1) !== 0)
        {
            return bit;
        }
        bl >>= 1;
        bit++;
    }


    bl = lib.Bit64.shiftR28(bits);
    while ( bl > 0 )
    {
        if ( (bl & 1) !== 0)
        {
            return bit;
        }
        bl >>= 1;
        bit++;
    }

    return -1;
};

lib.Bit64.firstL1 = function( bits)
{
    var bit = 0;

    var bl = bits & 0xfffffff;
    while ( bl > 0 )
    {
        bl >>= 1;
        bit++;
    }

    bl = lib.Bit64.shiftR28(bits);
    while ( bl > 0 )
    {
        bl >>= 1;
        bit++;
    }

    return bit - 1;
};

/**
 *
 * @param {String} s
 */
lib.Bit64.parse = function (s) {
    var len = s.length;

    // cc.log("bit64 parse", s, typeof s, len);
    if(len <= 0)
        return 0;

    if(len < 10)
    {
        return parseInt(s);
    }

    return parseInt(s.substring(0, len - 9)) * 1000000000 + parseInt(s.substring(len - 9));
};

lib.BitBig = lib.BitBig || {};

lib.BitBig.hasBit = function(x, ibit){

    var i = ibit  >> 2;
    if(x.length < i+1)
        return 0;

    var h = x.slice(-1-i);
    h = h.charAt(0);
    var b = ibit  & 3;
    return lib.Bit.hasNothing(parseInt(h, 16), 1 << b) ? 0 : 1;
};

lib.BitBig.orBit = function(x, ibit)
{
    x = x || "0";

    var i = ibit >> 2;
    if(x.length < i+1)
    {
        x = "0".repeat(i+1) + x;
    }

    var h = x.slice(-1-i);
    h = h.charAt(0);
    var b = ibit & 3;
    h = parseInt(h, 16) | (1 << b);

    x = x.slice(0, -1-i) + (h.toString(16)) + (i > 0 ?  x.slice(-i):"");
    // var pp = p.PPBag.Set(pk, log.ToString("X"));
    // p.Changes.Add(pp);
    return x.replace(/^0+/, '');
};
// TimesAutoIncrease

/**
 *
 * @param {num} ms_add
 * @param {number|function} max
 * @param {number} used
 * @param {Date} lastuse
 */
lib.TimesAutoIncrease = new function(ms_add, max,used, lastuse){



        this._msAdd = ms_add || (1000 * 60);
        this._max = max || 0;
        this._used = used || 0;
        this._last = lastuse || 0;

    this.getMax = function () {
        var m = this._max;
        return cc.isFunction(m) ? m():m;
    };

    this.getLeftNow = function(){
        var max = this.getMax();

        return max - this.getUsedNow();
    };


    this.getUsedNow = function(){
        var now = lib.SvrTime.NowMS();
        var pass = now - this._last;
        var add = pass / this._msAdd;

        return Math.ceil(Math.max(0, this._used - add));
    };

    this.useOne  =function(){
        this.useNum(1);
    };

    this.useNum  = function(num){
        var used = this._used;
        this._used = 0;
        if( used  <= 0){
            this._used = num;
            this._last = lib.SvrTime.NowMS();
        }else{
            var now = lib.SvrTime.NowMS();
            var pass = now - this._last;
            var add = pass / this._msAdd;
            used = used - add;

            if(used <= 0){
                this._used = num;
            }else{
                this._used = used + num;
            }
        }
        this._last = lib.SvrTime.NowMS();

    };

    /**
     *
     * @param num
     * @returns {lib.TimeSpan}
     */
    this.getTimeSpanToNum = function(num){
        num = num || 1;

        var max = this.getMax();
        if(max >= num)
            return new lib.TimeSpan(0);

        var now = lib.SvrTime.NowMS();
        var pass = now - this._last;
        var add = pass / this._msAdd;
        var left = max - this._used + add;

        if(left >= num)
            return new lib.TimeSpan(0);

        return new lib.TimeSpan(( (num - left) * this._msAdd ) / 1000);
    };
};

/**
 *
 * @param {num} ms_add
 * @param {number|function} max
 * @param {number} left
 * @param {Date} lastuse
 */
lib.TimesLeftAutoIncrease = function(ms_add, max, left, lastuse){


        this._msAdd = ms_add || (1000 * 60);
        this._max = max || 0;
        this._left = left || 0;
        this._last = lastuse || 0;


    this.getMax = function () {
        var m = this._max;
        return cc.isFunction(m) ? m():m;
    };

    this.getLeftNow = function(){
        var max = this.getMax();
        if(this._left >= max)
            return this._left;

        var now = lib.SvrTime.NowMS();
        var pass = now - this._last;
        var add = pass / this._msAdd;

        return Math.min(this._left + add, max);
    };

    this.getUsedNow  = function(){
        var max = this.getMax();
        if(this._left >= max)
            return 0;

        var now = lib.SvrTime.NowMS();
        var pass = now - this._last;
        var add = pass / this._msAdd;

        return Math.max(0, Math.min(max, max - (this._left + add)));
    };



    this.useOne  =function(){
        var left = this.getLeftNow();

        this._left = left - 1;
        this._last = lib.SvrTime.NowMS();

    };

    this.useNum  =function(num){
        var left = this.getLeftNow();

        this._left = left - num;
        this._last = lib.SvrTime.NowMS();
    };


    /**
     *
     * @param num
     * @returns {lib.TimeSpan}
     */
    this.getTimeSpanToNum  =function(num){
        num = num || 1;
        var left = this.getLeftNow();
        if(left >= num)
            return 0;

        var add = num - left;
        return lib.TimeSpan(( add * this._msAdd ) / 1000);
    };
};


// TimesPerDay

/**
 * @param {lib.TimeSpan} reset_time
 * @param {Number|function} total
 * @param {Number} used
 * @param {Date} last_use_time
 */
lib.TimesPerDay = function (reset_time, total, used, last_use_time){

        this._resettime = reset_time;
        this._used = used || 0;
        this._last = last_use_time || 0;
        this._total = total || 0;



    this.getLastUseTimeMS  =function () {
        return this._last;
    };

    this.getTotal  =function(){
        var t = this._total;
        return typeof (t) === "function"  ? t(): t;
    };

    this.getUsedNow=function(){
        var lrt  = this.getLastResetTime();
        //cc.log("getCurLeft lu  %d  lrt %d", this._last, lrt.getTime());

        if (this._last < lrt.getTime()) {

            return 0;
        }

        return this._used;


    };

    this.getLeftNow = function() {

        var lrt  = this.getLastResetTime();
        cc.log("getCurLeft lu  %d  lrt %d", this._last, lrt.getTime());

        if (this._last < lrt.getTime()) {

            return this.getTotal();
        }

        return Math.max(0,this.getTotal() - this._used);
    };

    this.useOne  = function(){
        var used = this.getUsedNow();
        this._used = used + 1;
        var last = lib.SvrTime.NowMS();
        last -= last % 1000;
        last += this._used;
        this._last = last;
    };


    this.useNum  =function(num){
        var used = this.getUsedNow();
        this._used = used + num;
        this._last = lib.SvrTime.NowMS();
    };

    /**
     *
     * @returns {Date}
     */
    this.getLastResetTime = function(){
        var now = lib.SvrTime.Now();
        //cc.log("getLastResetTime now %d ts %f rst %d", now.getTime(), now.getTimeSecs(),this._tsReset.totalSeconds());
        if (jsex.Date.getTimeOfDay(now).totalSeconds() > this._resettime.totalSeconds() ) {

            return jsex.Date.createFromDateAndTime(now, this._resettime);
        }
        else {

            var d = jsex.Date.createFromDateAndTime(now,  this._resettime);
            //cc.log("ddd %d", d.getTime());
            return jsex.Date.addDays(d,-1);
        }
    };


    /**
     *
     * @returns {Date}
     */
    this.getNextResetTime = function() {
        var now = lib.SvrTime.Now();
        //cc.log("getNextResetTime now %d ts %f rst %d", now.getTime(), now.getTimeSecs(),this._tsReset.totalSeconds());
        if (jsex.Date.getTimeOfDay(now).totalSeconds() > this._resettime.totalSeconds() ) {

            var d = jsex.Date.createFromDateAndTime(now, this._resettime);
            return jsex.Date.addDays(d,1);
        }
        else {

            return jsex.Date.createFromDateAndTime(now, this._resettime);
        }
    };
};


lib.TimesPerDay.CreateByLeft = function (reset_time, total, left, last_use_time) {
    return new lib.TimesPerDay(reset_time, total, total - left, last_use_time);
};


lib.A00 = {x:0,y:0};

lib.ALB = {x:0,y:0};
lib.ALC = {x:0,y:0.5};
lib.ALT = {x:0,y:1};
lib.ABL = {x:0,y:0};
lib.ACL = {x:0,y:0.5};
lib.ATL = {x:0,y:1};


lib.ACB = {x:0.5,y:0};
lib.ABC = {x:0.5,y:0};
lib.ACC = {x:0.5,y:0.5};
lib.ACT = {x:0.5,y:1};
lib.ATC = {x:0.5,y:1};

lib.ARB = {x:1,y:0};
lib.ARC = {x:1,y:0.5};
lib.ART = {x:1,y:1};
lib.ABR = {x:1,y:0};
lib.ACR = {x:1,y:0.5};
lib.ATR = {x:1,y:1};

lib.ALB = {x:0,y:0};
lib.ALM = {x:0,y:0.5};
lib.ALT = {x:0,y:1};
lib.ABL = {x:0,y:0};
lib.AML = {x:0,y:0.5};
lib.ATL = {x:0,y:1};


lib.AMB = {x:0.5,y:0};
lib.ABM = {x:0.5,y:0};
lib.AMM = {x:0.5,y:0.5};
lib.AMT = {x:0.5,y:1};
lib.ATM = {x:0.5,y:1};

lib.ARB = {x:1,y:0};
lib.ARM = {x:1,y:0.5};
lib.ART = {x:1,y:1};
lib.ABR = {x:1,y:0};
lib.AMR = {x:1,y:0.5};
lib.ATR = {x:1,y:1};


// storage

lib.SaveNumber = function(key, v){
    cc.sys.localStorage.setItem(key, v+"");
};
lib.SaveString = function(key, s){
    cc.sys.localStorage.setItem(key, s);
};
lib.SaveObject = function(key, obj){
    cc.sys.localStorage.setItem(key, JSON.stringify(obj));
};


lib.LoadNumber = function(key, v){
    var s = parseFloat(cc.sys.localStorage.getItem(key));

    return isNaN(s) ? v : s;
};
lib.LoadString = function(key, s){
    return cc.sys.localStorage.getItem(key) || s;
};
lib.LoadObject = function(key, obj){
    var s = cc.sys.localStorage.getItem(key);
    try {
        return s ? JSON.parse(s) : obj;
    }catch (e){
        return obj;
    }
};

lib.SecKey = {
    _secKey: 0,
    get:function (reset) {
        if(reset) this._secKey = 0;

        this._secKey = this._secKey ||
            ( (Date.now().toString(36).toUpperCase()) + Math.random().toString(36).slice(2) );
        return this._secKey || lib.SecKey.get(reset);
    },
};





lib.Math = lib.Math || {};

// Returns a random number between 0 (inclusive) and 1 (exclusive)
lib.Math.getRandom01 = function() {
    return Math.random();
};

// Returns a random number between min (inclusive) and max (exclusive)
lib.Math.getRandomBetween = function(min, max) {
    return Math.random() * (max - min) + min;
};


// Returns a random number between 0 (inclusive) and max (exclusive)
lib.Math.getRandom0max = function(max) {
    return Math.random() * (max) ;
};


// Returns a random number between 0 (inclusive) and max (100)
lib.Math.getRandomPer100 = function() {
    return Math.random() * 100 ;
};

// Returns a random integer between 0 (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
lib.Math.getRandomInt0max = function( max) {
    return Math.floor(Math.random() * (max )) ;
};


// Returns a random integer between 0 (included) and 0x7ffffff (included)
// Using Math.round() will give you a non-uniform distribution!
lib.Math.getRandomInt = function( ) {
    return Math.floor(-Math.random() * -0x80000000) ;
};

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
lib.Math.getRandomIntBetween = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

/**
 *
 * @param {cc.Point} p0 starting point
 * @param {cc.Point} p1 ending point
 * @param {cc.Point} m0 starting tangent
 * @param {cc.Point} m1 ending tangent
 * @param t [0,1]
 * @returns {{x, y}|cc.Point}
 */
lib.Math.hermite = function(p0, p1, m0 ,m1, t){
    var t3 = t * t  * t;
    var t2 = t * t;
    return cc.p(
        (2 * t3 +- 3 * t2 + 1) * p0.x + (t3 - 2 * t2 + t) * m0.x + (-2 * t3 + 3 * t2) * p1.x + (t3 - t2) * m1.x
        ,(2 * t3 +- 3 * t2 + 1) * p0.y + (t3 - 2 * t2 + t) * m0.y + (-2 * t3 + 3 * t2) * p1.y + (t3 - t2) * m1.y
    );
};

lib.Math.$GPSUnit = 1000000000000;
// 方法定义 la,lo
lib.Math.calcDistance = function( la1,  lo1,  la2,  lo2, unit){
    unit = unit || 1;
    la1 /= unit;
    lo1 /= unit;
    la2 /= unit;
    lo2 /= unit;

    var radLat1 = la1*Math.PI / 180.0;
    var radLat2 = la2*Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var  b = lo1*Math.PI / 180.0 - lo2*Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
        Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s *6378.137 ;// EARTH_RADIUS;
    // s = Math.round(s * 10000) / 10000;
    return s;
};



lib.CountDown = function (ms) {
    this.ms = ms;
    this.start = Date.now();

    this.leftMilliSeconds = function () {
        var now = Date.now();
        var pass = now - this.start;
        var left = this.ms - pass;
        if(left <=0 ) return 0;

        return left;
    };

    this.leftMMSS = function () {
        var left = this.leftMilliSeconds();
        var s = Math.ceil( left / 1000 );
        var mod_s = s % 60;
        var mins = (s - mod_s) / 60;

        return [mins < 10 ?"0":"", mins, ":" ,mod_s<10?"0":"", mod_s].join("");
    };
};