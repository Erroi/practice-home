(function(doc,win){
    var docEl = doc.documentElement;
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    var recalc = function(){
        var m = window.document.createElement('meta');
        m.setAttribute('name','viewport');
        window.document.head.appendChild(m);
        var dpr = window.devicePixelRatio || 1;
        m.setAttribute('content','width=device-width,user-scalable=no,initial-scale=' + 1/dpr
                                    + ',maximum-scale=' + 1/dpr
                                    + ',minimum-scale' + 1/dpr);

        var clientWidth = docEl.clientWidth;
        if(!clientWidth) return;
        docEl.style.fontSize = (clientWidth / 18.75) + 'px';    //20px
    };
    window.addEventListener(resizeEvt,recalc,false);
    doc.addEventListener('DOMContentLoaded',recalc,false);
})(document,window);