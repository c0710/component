/**
 * Created by 98435 on 2017/2/21.
 */
/*基本环图组件对象*/
var H5ComponentRing = function(myRadar,cfg){
    var component = new H5ComponentBase(myRadar,cfg);
    /*背景绘制*/
    var w = cfg.width;
    var h = cfg.height;
    /*添加一个蒙版层 项目文本层*/
    var draw = document.createElement('canvas');
    var cxt = draw.getContext('2d');
    $(draw).css('zIndex',2);
    draw.width = cxt.width = w ;
    draw.height = cxt.height = h ;
    component.append(draw);
    var r = w/2;
    cxt.fillStyle = '#f5f5f5';
    cxt.strokeStyle = '#f5f5f5';
    cxt.beginPath();
    cxt.arc(r,r,r*0.8,0,2*Math.PI);
    cxt.fill();
    cxt.stroke();
    /*项目文本*/
    var text = $('<div class="text">'+cfg.data[0]+'</div>');
    var rate = $('<div class="rate">'+cfg.data[1]*100+'%</div>');
    var font_size = r*.15+'px';
    text.append(rate);
    text.css('zIndex',3).css('fontSize',font_size).css('color', cfg.data[2] || '#ff6767');
    component.append(text);

    /*加入数据层*/
    var draw = document.createElement('canvas');
    var cxt = draw.getContext('2d');
    draw.width = cxt.width = w ;
    draw.height = cxt.height = h ;
    component.append(draw);
    /*数据层*/
    function render(per) {
        cxt.clearRect(0,0,w,h);
        cxt.lineWidth = .1;
        cxt.fillStyle = cfg.data[2] || '#ff6767';
        cxt.strokeStyle = cfg.data[2] || '#ff6767';
        sAngle = 1.5*Math.PI;
        eAngle = 1.5*Math.PI+2*Math.PI * cfg.data[1] * per;
        cxt.beginPath();
        cxt.moveTo(r,r);
        cxt.arc(r,r,r,sAngle,eAngle);
        cxt.closePath();
        cxt.fill();
        cxt.stroke();
    }





    component.on('onLeave',function () {
        var s = 1;
        for(var i =0;i<100;i++){
            setTimeout(function () {
                s-=0.01;
                if(s<0)s=0;
                 render(s)
            },i*10)
        }

    });
    component.on('onLoad',function () {
        var s = 0;
        for(var i =0;i<100;i++){
            setTimeout(function () {
                s+=0.01;
                if(s>1)s=1;
                 render(s)
            },i*10+500)
        }


    });



    return component
};