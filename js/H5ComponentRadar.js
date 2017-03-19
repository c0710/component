/**
 * Created by 98435 on 2017/2/21.
 */
/*基本雷达图组件对象*/
var H5ComponentRadar = function(myRadar,cfg){
    var component = new H5ComponentBase(myRadar,cfg);
    /*背景绘制*/
    var w = cfg.width;
    var h = cfg.height;
    /*加入一个画布*/ /*--网格线背景*/
    var draw = document.createElement('canvas');
    var cxt = draw.getContext('2d');
    draw.width = cxt.width = w ;
    draw.height = cxt.height = h ;
    component.append(draw);
    var r = w/2;
    var step = cfg.data.length;

    /*绘制网格线，分面绘制，分为10份*/
    var isBlue = false;
    for(var s=10;s>0;s--){
        cxt.beginPath();
        for(var i=0;i<step;i++){
            var reg= (2*Math.PI/360)*(360/step)*i;
            var x =r + Math.cos(reg) * r*(s/10);
            var y =r + Math.sin(reg) * r*(s/10);
            cxt.lineTo(x,y);
        }
        cxt.closePath();
        cxt.fillStyle = (isBlue = !isBlue)?'#99c0ff':'#f1f9ff';
        cxt.fill();
        cxt.stroke();
    }
    /*绘制伞骨*/
    cxt.beginPath();
    for(var i=0;i<step;i++){
        var reg= (2*Math.PI/360)*(360/step)*i;
        var x =r + Math.cos(reg) * r;
        var y =r + Math.sin(reg) * r;
        cxt.moveTo(r,r);
        cxt.lineTo(x,y);
        /*输出项目文字*/
        var text = $('<div class="text">');
        text.text(cfg.data[i][0]);
        component.append(text);
        text.css('opacity',0);
        text.css('transition','all 0.5s '+i*0.1+'s');
        if(x>w/2){
            text.css('left',x/2);
        }else{
            text.css('right',(w-x)/2);
        }
        if(y>h/2){
            text.css('top',y/2)
        }else{
            text.css('bottom',(h-y)/2)
        }

    }

    cxt.closePath();
    cxt.strokeStyle = '#e0e0e0';
    cxt.stroke();

    /*绘制数据层*/
    var draw = document.createElement('canvas');
    var cxt = draw.getContext('2d');
    draw.width = cxt.width = w ;
    draw.height = cxt.height = h ;
    component.append(draw);

    /*绘制折线*/
function render(per) {
    if(per>=1){
        component.find('.text').css('opacity',1)
    }else{
        component.find('.text').css('opacity',0)
    }
    cxt.clearRect(0,0,w,h);
    cxt.beginPath();

    /*输出折线*/
    for(var i=0;i<step;i++) {

        var rate = cfg.data[i][1] * per;
        var reg = (2 * Math.PI / 360) * (360 / step) * i;
        var x = r + Math.cos(reg) * r * rate;
        var y = r + Math.sin(reg) * r * rate;
        cxt.lineTo(x,y);
    }
    cxt.closePath();
    cxt.strokeStyle = '#f00';
    cxt.fillStyle = 'rgba(255,0,0,.3)';
    cxt.fill();
    cxt.stroke();

    /*输出点*/
    for(var i=0;i<step;i++) {
        var rate = cfg.data[i][1] * per;
        var reg = (2 * Math.PI / 360) * (360 / step) * i;
        var x = r + Math.cos(reg) * r * rate;
        var y = r + Math.sin(reg) * r * rate;
        cxt.beginPath();
        cxt.arc(x,y,5,0,2*Math.PI);
        cxt.fillStyle = '#ff7676';
        cxt.fill();
        cxt.closePath();

    }


}















    component.on('onLeave',function () {
        var s = 1;
        for(var i =0;i<100;i++){
            setTimeout(function () {
                s-=0.01;
                 render(s)
            },i*10)
        }
    });
    component.on('onLoad',function () {
        var s = 0;
        for(var i =0;i<100;i++){
            setTimeout(function () {
                s+=0.01;
                 render(s)
            },i*10+500)
        }

    });



    return component
};