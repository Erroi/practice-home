window.onload = function(){

    var goTop = document.getElementById('goTop');
    var content = document.getElementById('content');
    var sideBar = document.getElementById('sideBar');
    
    content.addEventListener('touchmove',function(evt){
        console.log(content.scrollTop)
        if(content.scrollTop > 400){
            sideBar.style.visibility = 'visible';
        }else{
            sideBar.style.visibility = 'hidden';
        }
    },false);

    goTop.addEventListener('click',function(){
        content.scrollTop = 0;
    },false);
}
