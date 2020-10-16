var ws = {};
var jsex = require("jsex");
var lib = require("lib");
var MD5 = require("md5");


ws.WS = function()
{
    this.socket = null;
    this.handle = null;

    this.hasSocket = function () {
        return this.socket;
    };
    /**
     *
     * @param {string} url
     * @param {ws.Handle} handle
     */
    this.connect = function (url, handle) {

        cc.error("ws.connect", url);
        var _this = this;
        this.handle = handle;
        handle.showBlock();

        this.socket = new WebSocket(url+"?SecKey=" + lib.SecKey.get(true));

        this.socket.onopen = function (event) {
            cc.log("WS connected", event);

            handle.onConnect(event);
            if (handle.firstTask) handle.firstTask();
            handle.hideBlock();

        };

        this.socket.onmessage = function (event) {
            if(event)
                cc.log("WS message:", event.data);

            handle.onMessage(event);
        };

        this.socket.onclose = function (event) {
            cc.log("WS closed");

            if(_this.socket) {
                _this.socket = null;

                handle.hideBlock();
                handle.onClose(event);
            }
        };

        this.socket.onerror = function (event) {
            // if(event)

            cc.error("WS error:", event || "");

            _this.close();

            handle.hideBlock();
            handle.onError(event);
        }
    };


    this._sendText = function (raw, wait) {

        cc.log("\n$Send=> vvvvvvvvvvvvvvvvvvvvvvvvvvvv \n",raw, "\n");

        if (this.socket && this.socket.readyState === 1) {

            if (wait) {
                this.handle.showBlock();
            }
            this.socket.send(raw);
        }
    };

    /**
     *
     * @param {ws.Request} req
     */
    this.sendUri = function (req) {
        cc.log("==",req.act, req.data,"==");

        this.handle.beforeRequest(req);

        var uri = req.toUri();
        var md5 = MD5.calcMD5(uri + "$" + lib.SecKey.get());


        this._sendText("U" + uri.replace("/?", "/" + md5 + "?"), req.wait);

        return req;
    };

    /**
     *
     * @param {ws.Request} req
     */
    this.sendJson = function (req) {
        cc.log("==",req.act, req.data,"==");

        this.handle.beforeRequest(req);

        var j = req.toJson();
        var sj = JSON.stringify(j).replace(/"/g, "");
        var kvs = jsex.RegExp.execAll(/[a-zA-Z0-9_.-]+:[a-zA-Z0-9_.-]+/g,sj, function (m) { return m[0];});
        var signstr = kvs.sort((v1, v2)=>{ return v1.toLowerCase() < v2.toLowerCase() ? lib.Order.small : lib.Order.large; }).join(",") + "$" + lib.SecKey.get();
        var md5 = MD5.calcMD5(signstr);
        j.s = md5;
        cc.log("signstr", signstr);
        this._sendText("J" + JSON.stringify(j), req.wait);

        return req;
    };

    this.sendText = function (txt) {
        this._sendText("J" + txt);
    };
    this.setBufferSize = function (size) {
        this._sendText("B" + size); 
    };
    this.sendPing= function () {
        this._sendText("P");
    };

    this.close = function () {
        cc.error("ws.close", this.socket !== null);
        if (this.socket) {
            var s = this.socket;
            this.socket = null;
            s.close();
            return true;
        }
        return false;
    };


    this.getHandler = function () {
        return this.handle;
    }
};

ws.inst  = new ws.WS();
ws.upSelf = function () {

};

var $ReqIndex = 0;
ws.Request = function (act, data, handler, wait) {
    $ReqIndex++;
    this.act = act;
    this.data = data;
    this.index = $ReqIndex;
    this.wait = wait;
    this.handler = handler;
    /**
     *
     * @return {{a: *, d: *, i: *}}
     */
    this.toJson = function () {
        return { a: this.act, d: this.data, i: this.index/*this.wait ? this.index : undefined*/ };
    };

    this.toUri = function () {

        var kv = [];
        for (var k in this.data)
        {
            let v = this.data[k];
            kv.push(k + "=" + encodeURIComponent(v));
        }
        return [
            "i", this.index,/*this.wait ?this.index:0,*/ "://", act, '/?', kv.join("&")
        ].join("");
    };
};

ws.Handle = function () {
    this.onMessage = function (e) {

    };
    this.onError = function () {

    };
    this.onClose = function () {

    };
    this.onConnect = function () {

    };
    /**
     *
     * @param {ws.Request} req
     */
    this.beforeRequest = function (req) {
        this.regHandler(req.index, req.handler);
    };
    this.showBlock = function () { };
    this.hideBlock = function () { };
    this.firstTask = function () { };

    this.handlers = {};
    this.regHandler = function (act, handler) {
        if(act && handler)
            this.handlers[act] = handler;
    };

    this.handler = function (resp) {
        cc.log("  ws handlers", JSON.stringify(this.handlers ));
        cc.log("  ws resp i", resp.i );
        if(resp.i)
        {
            if(resp.d)
                ws.upSelf(resp.d.self, resp.i);
            // Player.updataResp(resp.d.self);
            var h = this.handlers[resp.i];
            if(h)
            {
                h(resp);
                delete  this.handlers[resp.i];
            }

            this.hideBlock();
        }else if(resp.a)
        {
            var h = this.handlers[resp.a];
            if(h)
            {
                h(resp);
            }
        }
    };
};



module.exports = ws;