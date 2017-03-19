/**
 * Created by 98435 on 2017/2/21.
 */
/*基本饼图组件对象*/
var H5ComponentPie = function(myPie,cfg){
    var component = new H5ComponentBase(myPie,cfg);
    /*背景绘制*/
    var w = cfg.width;
    var h = cfg.height;
    /*加入一个画布*/
    var draw = document.createElement('canvas');
    var cxt = draw.getContext('2d');
    draw.width = cxt.width = w ;
    draw.height = cxt.height = h ;
    $(draw).css('zIndex',1);
    component.append(draw);
    var r = w/2;
    /*添加一个底图层*/
    cxt.beginPath();
    cxt.arc(r,r,r,0,2*Math.PI);
    cxt.lineWidth = 0.1;
    cxt.strokeStyle = '#eee';
    cxt.fillStyle = '#eee';
    cxt.fill();
    cxt.stroke();

    /*添加一个数据层*/
    var draw = document.createElement('canvas');
    var cxt = draw.getContext('2d');
    draw.width = cxt.width = w ;
    draw.height = cxt.height = h ;
    $(draw).css('zIndex',2);
    component.append(draw);
    var colors = ['green','yellow','pink','deepskyblue','orangered','purple'];
    var sAngle = 1.5*Math.PI,
        eAngle = 0,
        aAngle = 2*Math.PI;

    var step = cfg.data.length;
    for(var i=0;i<step;i++){
        var item = cfg.data[i];
        var color = item[2] || (colors.pop());

        eAngle = sAngle + aAngle * item[1];
        cxt.beginPath();
        cxt.lineWidth = 0.1;
        cxt.strokeStyle = color;
        cxt.fillStyle = color;
        cxt.moveTo(r,r);
        cxt.arc(r,r,r,sAngle,eAngle);
        cxt.fill();
        cxt.stroke();
        sAngle = eAngle;

        //加入所有项目文本及百分比
        var text = $('<div class="text"></div>');
        text.text(cfg.data[i][0]);
        var per = $('<div class="per"></div>');
        per.text(cfg.data[i][1]*100+'%');
        text.append(per);
        text.css('zIndex',10);
        component.append(text);
        var x = r + Math.sin(.5*Math.PI - sAngle) *r;
        var y = r + Math.cos(.5*Math.PI - sAngle) *r;
        if(x>w/2){
            text.css('left',x/2)
        }else{
            text.css('right',(w-x)/2)
        }
        if(y>h/2){
            text.css('top',y/2)
        }else{
            text.css('bottom',(h-y)/2);
        }
        if(cfg.data[i][2]){
            text.css('color',cfg.data[i][2])
        }
        text.css('opacity',0);




    }
    /*添加一个蒙版层*/
    var draw = document.createElement('canvas');
    var cxt = draw.getContext('2d');
    draw.width = cxt.width = w ;
    draw.height = cxt.height = h ;
    $(draw).css('zIndex',3);
    component.append(draw);
    cxt.lineWidth = 0.1;
    cxt.strokeStyle = '#eee';
    cxt.fillStyle = '#eee';
    function render(per) {

        cxt.clearRect(0,0,w,h);
        cxt.beginPath();
        cxt.moveTo(r,r);
        if(per <= 0){
            cxt.arc(r,r,r,0,2*Math.PI);
            component.find('.text').css('opacity',0)
        }else{
            cxt.arc(r,r,r,sAngle,sAngle+(2*Math.PI)*per,true);
        }
        if(per>=1){
            component.find('.text').css('opacity',1)
        }
        cxt.fill();
        cxt.stroke();
    }

     render(0);



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