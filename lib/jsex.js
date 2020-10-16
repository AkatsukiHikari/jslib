var jsex = {};

module.exports = jsex;

var lib = require("lib");

//
// JavaScript unit
// Add-on for the string and number manipulation
//
// Copyright (c) 2005, 2006, 2007, 2010, 2011 by Ildar Shaimordanov
//

/*

 The following code is described in ECMA drafts and
 might be implemented in the future of ECMA

 */

jsex.String = {};



/**
 * object.x(number)
 * object.repeat(number)
 * Transform the string object multiplying the string
 *
 * @param       number  Amount of repeating
 * @return      string
 * @access      public
 * @see         http://svn.debugger.ru/repos/jslibs/BrowserExtensions/trunk/ext/string.js
 * @see         http://wiki.ecmascript.org/doku.php?id=harmony:string_extras
 */
jsex.String.repeat = function(_this, n)
{
    if(String.prototype.repeat)
    {
        return _this.repeat(n);
    }
    n = Math.max(n || 0, 0);
    return new Array(n + 1).join(_this.valueOf());
};




/**
 * Returns true if the sequence of characters of searchString converted
 * to a String match the corresponding characters of this object
 * (converted to a String) starting at position. Otherwise returns false.
 *
 * @param       string
 * @param       integer
 * @return      bollean
 * @acess       public
 */
jsex.String.startsWith = function(_this, searchString, position)
{
    if ( String.prototype.startsWith ) {
        return _this.startsWith(searchString, position);
    }
    position = Math.max(position || 0, 0);
    return _this.indexOf(searchString) == position;
};




/**
 * Returns true if the sequence of characters of searchString converted
 * to a String match the corresponding characters of this object
 * (converted to a String) starting at endPosition - length(this).
 * Otherwise returns false.
 *
 * @param       string
 * @param       integer
 * @return      bollean
 * @acess       public
 */
jsex.String.endsWith = function(_this, searchString, endPosition)
{
    if ( String.prototype.endsWith ) {
        return _this.endsWith(searchString, endPosition);
    }
    endPosition = Math.max(endPosition || 0, 0);
    var s = String(searchString);
    var pos = _this.lastIndexOf(s);
    return pos >= 0 && pos == _this.length - s.length - endPosition;
};




/**
 * If searchString appears as a substring of the result of converting
 * this object to a String, at one or more positions that are greater than
 * or equal to position, then return true; otherwise, returns false.
 * If position is undefined, 0 is assumed, so as to search all of the String.
 *
 * @param       string
 * @param       integer
 * @return      bollean
 * @acess       public
 */
jsex.String.contains = function(_this,searchString, position)
{

    if (  String.prototype.contains ) {
        return _this.contains(searchString, position);
    }
    position = Math.max(position || 0, 0);
    return _this.indexOf(searchString) != -1;
};




/**
 * Returns an Array object with elements corresponding to
 * the characters of this object (converted to a String).
 *
 * @param       void
 * @return      array
 * @acess       public
 */
jsex.String.toArray = function(_this)
{
    if (  String.prototype.toArray ) {
        return _this.toArray();
    }
    return _this.split('');
};





/**
 * Returns an Array object with elements corresponding to
 * the characters of this object (converted to a String) in reverse order.
 *
 * @param       void
 * @return      string
 * @acess       public
 */
jsex.String.reverse = function(_this)
{
    if (  String.prototype.reverse ) {
        _this.reverse();
    }
    return _this.split('').reverse().join('');
};




jsex.String.__re__Format = /\{(\w+)\}/g;


/**
 * @example
 * '{0}is not {1} + {2}'.format('JavaScript', 'Java', 'Script');
 * @param {String} _this
 * @param {object} args
 * @returns {string}
 */
jsex.String.Format = function(_this, args)
{
    return _this.replace(jsex.String.__re__Format, function($0, $1)
    {
        return args[$1] !== void 0 ? args[$1] : $0;
    });
};



jsex.String.__re__format = /\{(\d+)\}/g;


/**
 * @example
 * '{0}is not {1} + {2}'.format('JavaScript', 'Java', 'Script');
 * @param {String} _this
 * @param {Array|string|number} args
 * @returns {string}
 */
jsex.String.format = function(_this, args)
{
    if(! Array.isArray(  args ))
    {
        args = [args];
    }
    return _this.replace(jsex.String.__re__format, function($0, $1)
    {
        return args[$1] !== void 0 ? args[$1] : $0;
    });
};

/**
 * object.padding(number, string)
 * Transform the string object to string of the actual width filling by the padding character (by default ' ')
 * Negative value of width means left padding, and positive value means right one
 *
 * @param       number  Width of string
 * @param       string  Padding chacracter (by default, ' ')
 * @return      string
 * @access      public
 */
jsex.String.padding = function(_this, n, c)
{
    var val = _this.valueOf();
    if ( Math.abs(n) <= val.length ) {
        return val;
    }
    var m = Math.max((Math.abs(n) - val.length) || 0, 0);
    var pad = Array(m + 1).join(String(c || ' ').charAt(0));
//      var pad = String(c || ' ').charAt(0).repeat(Math.abs(n) - this.length);
    return (n < 0) ? pad + val : val + pad;
//      return (n < 0) ? val + pad : pad + val;
};

/**
 * object.padLeft(number, string)
 * Wrapper for object.padding
 * Transform the string object to string of the actual width adding the leading padding character (by default ' ')
 *
 * @param       number  Width of string
 * @param       string  Padding chacracter
 * @return      string
 * @access      public
 */
jsex.String.padLeft = function(_this, n, c)
{
    return jsex.String.padding(_this,-Math.abs(n), c);
};

/**
 * object.alignRight(number, string)
 * Wrapper for object.padding
 * Synonym for object.padLeft
 *
 * @param       number  Width of string
 * @param       string  Padding chacracter
 * @return      string
 * @access      public
 */
jsex.String.alignRight = jsex.String.padLeft;

/**
 * object.padRight(number, string)
 * Wrapper for object.padding
 * Transform the string object to string of the actual width adding the trailing padding character (by default ' ')
 *
 * @param       number  Width of string
 * @param       string  Padding chacracter
 * @return      string
 * @access      public
 */
jsex.String.padRight = function(_this, n, c)
{
    return jsex.String.padding(_this,Math.abs(n), c);
};
/**
 * object.alignLeft(number, string)
 * Wrapper for object.padding
 * Synonym for object.padRight
 *
 * @param       number  Width of string
 * @param       string  Padding chacracter
 * @return      string
 * @access      public
 */
jsex.String.alignLeft = jsex.String.padRight;

jsex.String.__re__sprintf = /%%|%(?:(\d+)[\$#])?([+-])?('.|0| )?(\d*)(?:\.(\d+))?([bcdfosuxXhH])/g;

/**
 * @param {String} _this
 * @param {Array|string|number} args
 * @param argument_list
 */
jsex.String.sprintf = function(_this, args){

    if(! Array.isArray(  args ))
    {
        args = [args];
    }
    var index = 0;

    var x;
    var ins;
    var fn;

    /*
     * The callback function accepts the following properties
     *      x.index contains the substring position found at the origin string
     *      x[0] contains the found substring
     *      x[1] contains the index specifier (as \d+\$ or \d+#)
     *      x[2] contains the alignment specifier ("+" or "-" or empty)
     *      x[3] contains the padding specifier (space char, "0" or defined as '.)
     *      x[4] contains the width specifier (as \d*)
     *      x[5] contains the floating-point precision specifier (as \.\d*)
     *      x[6] contains the type specifier (as [bcdfosuxX])
     */
    return _this.replace(jsex.String.__re__sprintf, function()
    {
        if ( arguments[0] == "%%" ) {
            return "%";
        }

        x = [];
        for (var i = 0; i < arguments.length; i++) {
            x[i] = arguments[i] || '';
        }
        x[3] = x[3].slice(-1) || ' ';

        ins = args[+x[1] ? x[1] - 1 : index++];
//              index++;

        return jsex.String.__sprintf[x[6]](ins, x);
    });
};




jsex.String.__sprintf = {};



jsex.String.__sprintf.b = function(ins, x)
{
    return jsex.String.__Number.bin(ins, x[2] + x[4], x[3]);
};
jsex.String.__sprintf.c = function(ins, x)
{
    return jsex.String.padding( String.fromCharCode(ins),x[2] + x[4], x[3]);
};
jsex.String.__sprintf.d =
    jsex.String.__sprintf.u = function(ins, x)
    {
        return jsex.String.__Number.dec(ins,x[2] + x[4], x[3]);
    };
jsex.String.__sprintf.f = function(ins, x)
{
    var ins = Number(ins);
//      var fn = String.prototype.padding;
    if (x[5]) {
        ins = ins.toFixed(x[5]);
    } else if (x[4]) {
        ins = ins.toExponential(x[4]);
    } else {
        ins = ins.toExponential();
    }
    // Invert sign because this is not number but string
    x[2] = x[2] == "-" ? "+" : "-";
    return jsex.String.padding(ins,x[2] + x[4], x[3]);
//      return fn.call(ins, x[2] + x[4], x[3]);
};
jsex.String.__sprintf.o = function(ins, x)
{
    return jsex.String.__Number.oct(ins,x[2] + x[4], x[3]);
};
jsex.String.__sprintf.s = function(ins, x)
{
    return jsex.String.padding(ins,x[2] + x[4], x[3]);
};
jsex.String.__sprintf.x = function(ins, x)
{
    return jsex.String.__Number.hexl(ins,x[2] + x[4], x[3]);
};
jsex.String.__sprintf.X = function(ins, x)
{
    return jsex.String.__Number.hex(ins,x[2] + x[4], x[3]);
};
jsex.String.__sprintf.h = function(ins, x)
{
    var ins = String.prototype.replace.call(ins, /,/g, '');
    // Invert sign because this is not number but string
    x[2] = x[2] == "-" ? "+" : "-";
    return jsex.String.padding(jsex.String.__Number.human(ins,x[5], true)
        ,x[2] + x[4], x[3]);
};
jsex.String.__sprintf.H = function(ins, x)
{
    var ins = String.prototype.replace.call(ins, /,/g, '');
    // Invert sign because this is not number but string
    x[2] = x[2] == "-" ? "+" : "-";
    return jsex.String.padding(jsex.String.__Number.human(ins,x[5], false)
        ,x[2] + x[4], x[3]);
};

jsex.String.__Number = {};

/**
 * object.radix(number, number, string)
 * Transform the number object to string in accordance with a scale of notation
 * If it is necessary the numeric string will aligned to right and filled by '0' character, by default
 *
 * @param       number  Radix of scale of notation (it have to be greater or equal 2 and below or equal 36)
 * @param       number  Width of numeric string
 * @param       string  Padding chacracter (by default, '0')
 * @return      string  Numeric string
 * @access      public
 */
jsex.String.__Number.radix = function(_this,r, n, c)
{
    return jsex.String.padding(_this.toString(r), -n, c);
//      return this.toString(r).padding(-Math.abs(n), c);
};

/**
 * object.bin(number, string)
 * Transform the number object to string of binary presentation
 *
 * @param       number  Width of numeric string
 * @param       string  Padding chacracter (by default, '0')
 * @return      string  Numeric string
 * @access      public
 */
jsex.String.__Number.bin = function(_this,n, c)
{
    return jsex.String.__Number.radix(_this,0x02, n, c);
//      return this.radix(0x02, (n) ? n : 16, c);
};

/**
 * object.oct(number, string)
 * Transform the number object to string of octal presentation
 *
 * @param       number  Width of numeric string
 * @param       string  Padding chacracter (by default, '0')
 * @return      string  Numeric string
 * @access      public
 */
jsex.String.__Number.oct = function(_this,n, c)
{
    return jsex.String.__Number.radix(_this,0x08, n, c);
//      return this.radix(0x08, (n) ? n : 6, c);
};

/**
 * object.dec(number, string)
 * Transform the number object to string of decimal presentation
 *
 * @param       number  Width of numeric string
 * @param       string  Padding chacracter (by default, '0')
 * @return      string  Numeric string
 * @access      public
 */
jsex.String.__Number.dec = function(_this,n, c)
{
    return jsex.String.__Number.radix(_this,0x0A, n, c);
};

/**
 * object.hexl(number, string)
 * Transform the number object to string of hexadecimal presentation in lower-case of major characters (0-9 and a-f)
 *
 * @param       number  Width of numeric string
 * @param       string  Padding chacracter (by default, '0')
 * @return      string  Numeric string
 * @access      public
 */
jsex.String.__Number.hexl = function(_this,n, c)
{
    return jsex.String.__Number.radix(_this,0x10, n, c);
//      return this.radix(0x10, (n) ? n : 4, c);
};

/**
 * object.hex(number, string)
 * Transform the number object to string of the hexadecimal presentation
 * in upper-case of major characters (0-9 and A-F)
 *
 * @param       number  Width of numeric string
 * @param       string  Padding chacracter (by default, '0')
 * @return      string  Numeric string
 * @access      public
 */
jsex.String.__Number.hex = function(_this,n, c)
{
    return jsex.String.__Number.radix(_this,0x10, n, c).toUpperCase();
};

/**
 * object.human([digits[, true]])
 * Transform the number object to string in human-readable format (e.h., 1k, 234M, 5G)
 *
 * @example
 * var n = 1001;
 *
 * // will output 1.001K
 * var h = n.human(3);
 *
 * // will output 1001.000
 * var H = n.human(3, true);
 *
 * @param       integer Optional. Number of digits after the decimal point. Must be in the range 0-20, inclusive.
 * @param       boolean Optional. If true then use powers of 1024 not 1000
 * @return      string  Human-readable string
 * @access      public
 */
jsex.String.__Number.human = function(_this,digits, binary)
{
    var n = Math.abs(_this);
    var p = _this;
    var s = '';
    var divs = arguments.callee.add(binary);
    for (var i = divs.length - 1; i >= 0; i--) {
        if ( n >= divs[i].d ) {
            p /= divs[i].d;
            s = divs[i].s;
            break;
        }
    }
    return p.toFixed(digits) + s;
};

/**
 * Subsidiary method.
 * Stores suffixes and divisors to use in jsex.String.__Number.human.
 *
 * @param       boolean
 * @param       string
 * @param       divisor
 * @return      array
 * @access      static
 */
jsex.String.__Number.human.add = function(binary, suffix, divisor)
{
    var name = binary ? 'div2' : 'div10';
    var divs = jsex.String.__Number.human[name] = jsex.String.__Number.human[name] || [];

    if ( arguments.length < 3 ) {
        return divs;
    }

    divs.push({s: suffix, d: Math.abs(divisor)});
    divs.sort(function(a, b)
    {
        return a.d - b.d;
    });

    return divs;
};

// Binary prefixes
jsex.String.__Number.human.add(true,  'K', 1 << 10);
jsex.String.__Number.human.add(true,  'M', 1 << 20);
jsex.String.__Number.human.add(true,  'G', 1 << 30);
jsex.String.__Number.human.add(true,  'T', Math.pow(2, 40));

// Decimal prefixes
jsex.String.__Number.human.add(false, 'K', 1e3);
jsex.String.__Number.human.add(false, 'M', 1e6);
jsex.String.__Number.human.add(false, 'G', 1e9);
jsex.String.__Number.human.add(false, 'T', 1e12);

/**
 * object.fromHuman([digits[, binary]])
 * Transform the human-friendly string to the valid numeriv value
 *
 * @example
 * var n = 1001;
 *
 * // will output 1.001K
 * var h = n.human(3);
 *
 * // will output 1001
 * var m = h.fromHuman(h);
 *
 * @param       boolean Optional. If true then use powers of 1024 not 1000
 * @return      number
 * @access      public
 */
jsex.String.__Number.fromHuman = function(value, binary)
{
    var m = String(value).match(/^([\-\+]?\d+\.?\d*)([A-Z])?$/);
    if ( ! m ) {
        return Number.NaN;
    }
    if ( ! m[2] ) {
        return +m[1];
    }
    var divs = jsex.String.__Number.human.add(binary);
    for (var i = 0; i < divs.length; i++) {
        if ( divs[i].s == m[2] ) {
            return m[1] * divs[i].d;
        }
    }
    return Number.NaN;
};



jsex.String.__re__parseUrl = /^(?:([a-z]+):(?:([a-z]*):)?\/\/)?(?:([^:@]*)(?::([^:@]*))?@)?((?:[a-z0-9_-]+\.)+[a-z]{2,}|localhost|(?:(?:[01]?\d\d?|2[0-4]\d|25[0-5])\.){3}(?:(?:[01]?\d\d?|2[0-4]\d|25[0-5])))(?::(\d+))?(?:([^:\?\#]+))?(?:\?([^\#]+))?(?:\#([^\s]+))?$/i;

/**
 *
 * @param {String} _this
 * @returns {*}
 */
jsex.String.parseUrl = function(_this)
{
    var matches = _this.match(jsex.String.__re__parseUrl);

    if ( ! matches ) {
        return null;
    }

    return {
        scheme: matches[1] || '',
        subscheme: matches[2] || '',
        user: matches[3] || '',
        pass: matches[4] || '',
        host: matches[5],
        port: matches[6] || '',
        path: matches[7] || '',
        query: matches[8] || '',
        fragment: matches[9] || ''};


};

jsex.String.__re__camelize = /([^-]+)|(?:-(.)([^-]+))/mg;
jsex.String.camelize = function(_this)
{
    return _this.replace(jsex.String.__re__camelize , function($0, $1, $2, $3)
    {
        return ($2 || '').toUpperCase() + ($3 || $1).toLowerCase();
    });
};

jsex.String.__re__uncamelize = /[A-Z]/g;
jsex.String.uncamelize = function(_this)
{
    return _this.replace(jsex.String.__re__uncamelize, function($0)
    {
        return '-' + $0.toLowerCase();
    });
};


jsex.String.__re__splitInts = /-?\d+/g;
/**
 * @param {String} _this
 * @returns {Array}
 */
jsex.String.splitInts = function(_this){
    if(!_this) return [];
    var myRe = jsex.String.__re__splitInts;
    myRe.lastIndex = 0;
    var m;
    var nums = [];

    while ((m = myRe.exec(_this)) !== null) {
        nums.push( parseInt(m[0]) );
    }

    return nums;
};

jsex.RegExp = {


    /**
     *
     * @param {RegExp} reg
     * @param {String} str
     * @returns {Array}
     */
    execAll: function (reg, str, sel) {

        var m;
        var ms = [];

        while ((m = reg.exec(str)) !== null) {
            ms.push(sel?sel(m):m);
        }

        return ms;
    },
};


// Date



jsex.Date = {};

/**
 *
 * @param  {Date} _this
 * @return {number}
 */
jsex.Date.getTimeSecs = function(_this){
    return _this.getHours() * 60 * 60 +  _this.getMinutes() * 60 + _this.getSeconds()
        + _this.getMilliseconds() * 0.001;
};

/**
 *
 * @param  {Date} _this
 * @param {lib.TimeSpan} ts
 */
jsex.Date.setTimeSecs = function(_this, ts){
    _this.setHours(ts.hour());
    _this.setMinutes(ts.minute());
    _this.setSeconds(ts.second());
    _this.setMilliseconds(0);
};


/**
 *
 * @param  {Date} _this
 * @returns {lib.TimeSpan}
 */
jsex.Date.getTimeOfDay = function(_this){
    return new lib.TimeSpan({h:_this.getHours() ,m:  _this.getMinutes() ,s: _this.getSeconds()});
};

/**
 *
 * @param  {Date} _this
 * @param days
 * @returns {Date}
 */
jsex.Date.addDays = function(_this, days){
    var re = new Date(_this.getTime() + days * lib.TimeSpan.SecsPerDay  * 1000);
    return re;
};

jsex.Date.addSeconds = function(_this, secs){
    var re = new Date(_this.getTime() + secs * 1000);
    return re;
};
/**
 *
 * @param {Date} dt1
 * @param {Date} dt2
 * @returns {lib.TimeSpan}
 */
jsex.Date.sub = function(dt1, dt2){
    return new lib.TimeSpan(Math.floor((dt1.getTime() - dt2.getTime() ) * 0.001));
};


/**
 *
 * @param {Date} dt1
 * @param {Date} dt2
 * @returns {Number}
 */
jsex.Date.subMS = function(dt1, dt2){
    return  dt1.getTime() - dt2.getTime() ;
};
/**
 *
 * @returns {Date}
 */
jsex.Date.createFromMS = function(ms){
    var re = new Date();
    re.setTime(ms);
    return re;
};


/**
 *
 * @param {Date} date
 * @param {lib.TimeSpan} time
 * @returns {Date}
 */
jsex.Date.createFromDateAndTime = function(date,time){
    var re = new Date(date.getFullYear(),date.getMonth(),date.getDate()).getTime();

    // jsex.Date.setTimeSecs(re,time);
    return new Date(re + (time ?  time.totalSeconds()*1000 : 0));
};


/**
 *
 * @param {Date} date
 * @returns {Date}
 */
jsex.Date.removeTime = function(date){
    return new Date(date.getFullYear(),date.getMonth(),date.getDate());
};


jsex.TimeZoneOffMS = undefined;
jsex.ServerTimeZoneMS = 8 * 60 * 60 * 1000;

jsex.Date.toLocalTimeMS = function (ms) {
    if(jsex.TimeZoneOffMS === undefined)
    {
        jsex.TimeZoneOffMS = lib.Native.syncDO(lib.Native.Device, lib.Native.Device.$Act.GetTimeZone).data.timezone;
    }

    return ms + jsex.TimeZoneOffMS - jsex.ServerTimeZoneMS;
};

jsex.Date.toLocalTimeH = function (h) {
    if(jsex.TimeZoneOffMS === undefined)
    {
        jsex.TimeZoneOffMS = lib.Native.syncDO(lib.Native.Device, lib.Native.Device.$Act.GetTimeZone).data.timezone;
    }

    return (h + (jsex.TimeZoneOffMS - jsex.ServerTimeZoneMS) / (60 * 60 * 1000)) % 24;
};

/**
 *
 * @param {Date} date
 * @param format
 * @returns {string}
 */
jsex.Date.Format = function (date, format) {
    var dt = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        date: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
    };

    dt.YYYY = dt.year;
    dt.YY = jsex.String.sprintf("%02d", dt.year % 100);

    dt.MM = jsex.String.sprintf("%02d", dt.month);
    dt.M = dt.month;

    dt.DD = jsex.String.sprintf("%02d", dt.date);
    dt.D = dt.date;

    dt.hh = jsex.String.sprintf("%02d", dt.hour);
    dt.h = dt.hour;

    dt.mm = jsex.String.sprintf("%02d", dt.minute);
    dt.m = dt.minute;

    dt.ss = jsex.String.sprintf("%02d", dt.second);
    dt.s = dt.second;

    return jsex.String.Format(format, dt);
};
