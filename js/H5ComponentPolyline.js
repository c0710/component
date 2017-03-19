/**
 * Created by 98435 on 2017/2/21.
 */
/*基本折线图组件对象*/
var H5ComponentPolyline = function(myPolyline,cfg){
    var component = new H5ComponentBase(myPolyline,cfg);
    /*网格线绘制*/
    var w = cfg.width;
    var h = cfg.height;
    /*加入一个画布*/ /*----背景层*/
    var draw = document.createElement('canvas');
    var cxt = draw.getContext('2d');
    draw.width = cxt.width = w ;
    draw.height = cxt.height = h ;
    component.append(draw);

    /*水平网格线*/
    var step = 10;
    cxt.beginPath();
    cxt.lineWidth = 1;
    cxt.strokeStyle = '#666';
    window.cxt = cxt;
    for(var i = 0;i < step+1;i++){
        var y = (h/step) * i;
        cxt.moveTo(0,y);
        cxt.lineTo(w,y);
    }
    /*垂直网格线*/
    step = cfg.data.length+1;
    var text_w = w/step;
    for(var i = 0; i<step+1; i++){
        var x = (w/step)*i;
        cxt.moveTo(x,0);
        cxt.lineTo(x,h);
        if(cfg.data[i]){
            var text = $('<div class="text">'+cfg.data[i][0]+'</div>');
            text.css('width',text_w/2).css('left',x/2+text_w/2-text_w/4);

            component.append(text);
        }

    }
    cxt.stroke();


    /*加入另一个画布*/ /*----数据层*/
    var draw = document.createElement('canvas');
    var cxt = draw.getContext('2d');

    draw.width = cxt.width = w ;
    draw.height = cxt.height = h ;
    component.append(draw);

    function render(per) {
        /*清空画布*/
        cxt.clearRect(0,0,w,h);
        /*折线数据*/
        cxt.beginPath();
        cxt.lineWidth = 5;
        cxt.strokeStyle = '#ff8878';
        var x = 0;
        var y = 0;
        var row_w = w/(cfg.data.length+1 );
        /*画点*/
        for(var i in cfg.data){
            var item = cfg.data[i];
            x = row_w * i +  row_w;
            y = (1-item[1]*per)*h;
            cxt.moveTo(x,y);
            cxt.arc(x,y,5,0,2*Math.PI);
        }
        /*连线*/
        /*移动画笔到第一个点位置*/
        cxt.moveTo(row_w,(1-cfg.data[0][1]*per)*h);
        for(var i =0;i < cfg.data.length;i++){
            item = cfg.data[i];
            x = row_w * i +  row_w;
            y = (1-item[1]*per)*h;
            cxt.lineTo(x,y);
        }
        cxt.stroke();
        /*绘制阴影*/
        cxt.lineWidth = 1;
        cxt.strokeStyle = 'rgba(0,0,0,0)';
        cxt.lineTo(x,h);
        cxt.lineTo(row_w,h);
        cxt.fillStyle = 'rgba(255,118,118,.4)';
        cxt.fill();
        cxt.stroke();
        /*写数据*/
        for(var i in cfg.data){
            var item = cfg.data[i];
            x = row_w * i +  row_w;
            y = (1-item[1]*per)*h;
            cxt.font = 'normal 25px Arial';
            cxt.fillStyle = item[2]?item[2]:'#595959';
            cxt.fillText(((item[1]*100)>>0)+'%',x-10,y-10)
        }
        cxt.stroke();
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