/**
 * Created by a1501 on 2017/8/27.
 */
(function (doc, win) {
    var docEl = doc.documentElement, //获取html标签
        //orientationchange方向改变事件
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {

            var m = window.document.createElement("meta");
            m.setAttribute("name", "viewport");
            window.document.head.appendChild(m);
            var dpr = window.devicePixelRatio || 1;
            m.setAttribute("content", "width=device-width,user-scalable=no,initial-scale=" + 1/dpr
                                                + ",maximum-scale=" +  1/dpr
                                                + ",minimum-scale=" + 1/dpr);      //主要解决1px问题


            //当前设备视口宽度
            var clientWidth = docEl.clientWidth;                                  //主要解决rem 问题
            if (!clientWidth) return;
            docEl.style.fontSize = (clientWidth / 18.75) + 'px';    //  375 / 18.75 = 20px
        };                                                          // 写代码时是按照 设计稿 750 / 2 / 20 来计算rem的

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

(function(w) {
    function Alert(param) {
        this.title = param.title;
        this.content = param.content;
        this.alert = null;
        this.init();

        setTimeout(this.destroy.bind(this), param.time || 500);
    }

    Alert.prototype.init = function() {
        this.alert = document.createElement("div");
        this.alert.style.position = "absolute";
        this.alert.style.top = 0;
        this.alert.style.bottom = 0;
        this.alert.style.left = 0;
        this.alert.style.right = 0;
        this.alert.style.zIndex = 9999;

        var alert = document.createElement("div");
        alert.style.position = "absolute";
        alert.style.width = "6.5rem";
        alert.style.height = "2.3rem";
        alert.style.background = "grey";
        alert.style.zIndex = "9999";
        alert.style.top = 0;
        alert.style.bottom = 0;
        alert.style.left = 0;
        alert.style.right = 0;
        alert.style.margin = "auto";
        alert.style.opacity = 0.8;
        alert.style.textAlign = "center";
        alert.style.color = "#fff";
        alert.style.borderRadius = "5px";
        alert.style.display = "table";

        var title = document.createElement("div");
        title.style.position = "absolute";
        title.style.height = "15px";
        title.style.top = 0;
        title.innerHTML = this.title;

        var content = document.createElement("div");
        // content.style.position = "absolute";
        content.style.width = alert.style.width;
        content.style.display = "table-cell";
        content.style.verticalAlign = "middle";
        // content.style.top = title.style.height;
        // content.style.lineHeight = '2rem';
        // content.style.bottom = 0;
        content.style.textAlign = "center";
        content.style.fontSize = "0.7rem";
        content.innerHTML = this.content;

        alert.appendChild(title);
        alert.appendChild(content);
        this.alert.appendChild(alert);

        document.body.appendChild(this.alert)
    };

    Alert.prototype.destroy = function() {
        document.body.removeChild(this.alert);
    };

    w.Alert = function(param) {
        return new Alert(param);
    }
})(window);