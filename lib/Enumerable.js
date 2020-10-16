/**
 * Created by zhy on 2015/8/10.
 */

var Enumerable = function (obj_or_arr) {
    this._e = obj_or_arr || [];
    this._isArray = Array.isArray(obj_or_arr);

    /**
     *
     * @return {{}|[]}
     */
    this.enumerable = function () {
        return this._e;
    };

    if(this._isArray)
    {


        /**
         *
         * @returns {Enumerable}
         */
        this.clone = function(){
            var _this = this._e;
            var lst = [];
            //var newlst = new lib.List(lst);

            for(var k = 0;k<_this.length;k++)
            {
                lst.push(_this[k] );
            }
            return new Enumerable(lst);
        };
        /**
         *
         * @returns {Enumerable}
         */
        this.distinct = function(){
            var _this = this._e;
            var lst = [];
            //var newlst = new lib.List(lst);

            for(var k = 0;k<_this.length;k++)
            {
                if(lst.indexOf(_this[k] ) >= 0) {
                    //cc.log("get %s", this._data[k]);
                    continue;
                }
                lst.push(_this[k] );
            }
            return new Enumerable(lst);
        };

        /**
         *
         * @param val
         * @returns { Number }
         */
        this.remove = function( val) {
            var _this = this._e;
            var index = _this.indexOf(val);
            if (index > -1) {
                _this.splice(index, 1);
                return index;
            }
            return index;
        };

        /**
         *
         * @param {Function} predicate
         * @param {Function} converter
         * @returns {*}
         */
        this.first = function(predicate) {
            var _this = this._e;
            var fc = predicate || function (v) {
                return true;
            };

            //var _this = this;
            var l = _this.length;


            for (var k = 0; k < l; k++) {
                var v = _this[k];
                if (fc(v, k))
                    return converter ? converter(v, k) : v;
            }

            return null;
        };




        /**
         *
         * @param predicate
         * @returns {Enumerable}
         */
        this.where = function(predicate){
            var _this = this._e;
            var lst = [];

            var fc = predicate || function(v){ return v;};

            //var _this = this;
            var l = _this.length;


            for(var k = 0;k< l;k++)
            {
                var v = _this[k];
                if(fc(v, k))
                    lst.push(v);
            }

            return new Enumerable( lst );
        };


        /**
         *
         * @param key_selector
         * @param value_selector
         * @returns {Enumerable}
         */
        this.toObject= function(key_selector, value_selector){
            var obj = this._e;
            var dic = {};

            var ks = key_selector || function (v, k) {return k;};
            var vs = value_selector || function(v){ return v;};


            var l = obj.length;
            for(var k = 0;k< l;k++)
            {
                var v = obj[k];
                dic[ks(v,k)] = vs(v, k);
            }

            return new Enumerable(dic);
        };

        /**
         * @param selector
         * @returns {Enumerable}
         */
        this.select = function(selector){
            var _this = this._e;
            var lst = [];

            var fc = selector || function(v){ return v;};

            //var _this = this;
            var l = _this.length;

            for(var k = 0;k< l;k++)
            {
                var v = _this[k];
                lst.push( fc(v, k));
            }

            return new Enumerable(lst);
        };


        /**
         * @param predicate
         * @returns {number}
         */
        this.count = function( predicate){
            var _this = this._e;

            if(!_this) return 0;
            //var _this = this;
            var l = _this.length;
            if(predicate)
            {
                var n = 0;
                for(var k = 0;k< l;k++)
                {
                    var v = _this[k];
                    if ( predicate(v, k) )        n++;
                }

                return n;
            }
            else
            {
                return l;

            }

        };



        /**
         *
         * @param value
         * @param comparer
         * @return {number|undefined}
         */
        this.find = function( value, comparer){
            var _this = this._e;

            var fc = comparer || function (_value, v) {      return v == _value;      };

            var l = _this.length;
            for(var k = 0;k< l;k++)
            {
                if (fc(value, _this[k] ,k)) return k;
            }

            return undefined;
        };


        /**
         *
         * @param value
         * @param comparer
         * @return {boolean}
         */
        this.contains= function( value, comparer){
            var _this = this._e;

            var fc = comparer || function (_value, v) {      return v == _value;      };

            var l = _this.length;
            for(var k = 0;k< l;k++)
            {
                if (fc(value, _this[k] ,k)) return true;
            }

            return false;
        };



        this.max = function( selectorCompare, selectorRe){
            var _this = this._e;

            var max = null;
            var re = null;
            var fc = selectorCompare || function(v){ return v;};
            var fre = selectorRe || fc;

            //var _this = this;
            var l = _this.length;

            for(var k = 0;k<l;k++)
            {
                var v = _this[k];
                var c = fc(v, k);
                if (null === max || max < c)
                {
                    max = c;
                    re = fre(v, k);
                }
            }


            return re
        } ;


        this.min = function( selectorCompare, selectorRe){
            var _this = this._e;

            var min = null;
            var re = null;
            var fc = selectorCompare || function(v){ return v;};
            var fre = selectorRe || fc;

            //var _this = this;
            var l = _this.length;

            for(var k = 0;k<l;k++)
            {
                var v = _this[k];
                var c = fc(v, k);
                if (null === min || min > c)
                {
                    min = c;
                    re = fre(v, k);
                }
            }

            return re
        } ;

        /**
         *
         * @param {Function} num_convertor
         * @returns {number}
         */
        this.average = function(num_convertor){
            var _this = this._e;

            //var _this = this;
            var l = _this.length;
            if(l === 0) return 0;

            return this.sum( num_convertor) / l;
        };

        /**
         *
         * @param {Function} num_convertor
         * @returns {number}
         */
        this.sum = function( num_convertor){
            var _this = this._e;

            if(_this.length === 0) return 0;
            var fc = num_convertor || function(v){ return v;};

            //var _this = this;
            var l = _this.length;

            var sum = 0;

            for(var k = 0;k<l;k++)
            {
                var v = _this[k];
                var c = fc(v, k);
                sum += c;
            }

            return sum;
        };

        this.all = function( predicate){
            var _this = this._e;

            var fc = predicate || function(v){ return v;};

            //var _this = this;
            var l = _this.length;

            for(var k = 0;k<l;k++)
            {
                var v = _this[k];
                if (! fc(v, k) )            return false;
            }

            return true;
        };

        this.any = function(predicate){

            var _this = this._e;

            var fc = predicate || function(v){ return v;};

            //var _this = this;
            var l = _this.length;

            for(var k = 0;k<l;k++)
            {
                var v = _this[k];
                if ( fc(v, k) )            return true;
            }

            return false;
        };


    }else
    {

        /**
         *
         * @param {Function} predicate
         * @param {Function} converter
         * @returns {*}
         */
        this.first = function( predicate, converter) {
            var _this = this._e;

            var fc = predicate || function (v) {
                return 1;
            };

            for(var k in _this || {})
            {
                var v = _this[k];
                if (fc(v, k))
                    return converter ? converter(v, k) : v;
            }

            return null;
        };

        this.max = function( selectorCompare, selectorRe){
            var max = null;
            var re = null;
            var fc = selectorCompare || function(v){ return v;};
            var fre = selectorRe || fc;

            var obj = this._e;

            for (var k in obj || {})
            {
                var v = obj[k];
                var c = fc(v, k);
                if (null === max || max < c)
                {
                    max = c;
                    re = fre(v, k);
                }
            }

            return re
        } ;


        this.min = function( selectorCompare, selectorRe){
            var min = null;
            var re = null;
            var fc = selectorCompare || function(v){ return v;};
            var fre = selectorRe || fc;

            var obj = this._e;

            for (var k in obj || {})
            {
                var v = obj[k];
                var c = fc(v, k);
                if (null === min || min > c)
                {
                    min = c;
                    re = fre(v, k);
                }
            }

            return re
        } ;

        /**
         *
         * @param {Function} num_convertor
         * @returns {number}
         */
        this.average = function( num_convertor){

            var fc = num_convertor || function(v){ return v;};

            var sum = 0;
            var n = 0;

            var obj = this._e;

            for(var k in obj || {})
            {
                var v = obj[k];
                var c = fc(v, k);
                sum += c;
                n ++;
            }

            return n > 0 ? sum / n : 0;
        };


        /**
         *
         * @param {Function} num_convertor
         * @returns {number}
         */
        this.sum = function( num_convertor){

            var fc = num_convertor || function(v){ return v;};

            var sum = 0;

            var obj = this._e;

            for(var k in obj || {})
            {
                var v = obj[k];
                var c = fc(v, k);
                sum += c;
            }

            return sum;
        };

        this.all = function( predicate){

            var fc = predicate || function(v){ return v;};

            var obj = this._e;

            for(var k in obj || {})
            {
                var v = obj[k];
                if (! fc(v, k) )            return false;
            }

            return true;
        };

        this.any = function( predicate){

            var obj = this._e;

            var fc = predicate || function(v){ return v;};

            for(var k in obj || {})
            {
                var v = obj[k];
                if ( fc(v, k) )            return true;
            }

            return false;
        };



        /**
         *
         * @param value
         * @param comparer
         * @return {string|undefined}
         */
        this.find = function( value, comparer){

            var fc = comparer || function (_value, v) {      return v == _value;      };
            var obj = this._e;
            for(var k in obj || {})
            {
                if (fc(value, obj[k] ,k)) return k;
            }

            return undefined;
        };

        /**
         *
         * @param value
         * @param comparer
         * @return {boolean}
         */
        this.contains = function( value, comparer){

            var fc = comparer || function (_value, v) {      return v == _value;      };
            var obj = this._e;
            for(var k in obj || {})
            {
                if (fc(value, obj[k] ,k)) return true;
            }

            return false;
        };


        /**
         * @param predicate
         * @returns {number}
         */
        this.count= function( predicate){


            var obj = this._e;
            var n = 0;
            if(predicate)
            {
                for(var k in obj || {})
                {
                    var v = obj[k];
                    if ( predicate(v, k) )        n++;
                }
            }
            else
            {
                for(var k in obj || {}) n ++;

            }

            return n;
        };

        /**
         *
         * @returns {Enumerable}
         */
        this.getKeys= function(){

            var obj = this._e;

            var lst = [];
            for(var k in obj || {})
            {
                lst.push(k);
            }

            return  new Enumerable(lst);
        };

        /**
         *
         * @returns {Enumerable}
         */
        this.getValues= function(){
            var obj = this._e;
            var lst = [];
            for(var k in obj || {})
            {
                lst.push(obj[k]);
            }

            return new Enumerable(lst);
        };

        /**
         *
         * @param key_selector
         * @param value_selector
         * @returns {Enumerable}
         */
        this.toObject= function(key_selector, value_selector){
            var obj = this._e;
            var dic = {};

            var ks = key_selector || function (v, k) {return k;};
            var vs = value_selector || function(v){ return v;};


            for(var k in obj || {})
            {
                var v = obj[k];
                dic[ks(v,k)] = vs(v, k);
            }

            return new Enumerable(dic);
        };

        /**
         *
         * @param selector
         * @returns {Enumerable}
         */
        this.select= function( selector){
            var obj = this._e;

            var lst = [];

            var fc = selector || function(v){ return v;};


            for(var k in obj || {})
            {
                var v = obj[k];
                lst.push( fc(v, k));
            }

            return new Enumerable(lst);
        };

        /**
         *
         * @param predicate
         * @returns {Enumerable}
         */
        this.where= function(predicate){
            var obj = this._e;

            var dic = {};

            var fc = predicate || function(v){ return v;};


            for(var k in obj || {})
            {
                var v = obj[k];
                if(fc(v, k))
                    dic[k] = v;
            }

            return new Enumerable(dic);
        };

        /**
         * @returns {Enumerable}
         */
        this.clone =function(){
            var obj = this._e;

            var n = {};

            for (var k in obj || {})
                n[k] =  obj[k];

            return new Enumerable(n);
        };
    }


};


module.exports = Enumerable;


