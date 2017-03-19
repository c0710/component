/**
 * Created by 98435 on 2017/2/21.
 */
/*基本散点图组件对象*/
var H5ComponentPoint = function(name,cfg){
    var component = new H5ComponentBase(name,cfg);

    var base = cfg.data[0][1];  /*以第一个数据的比例为大小的100%；*/

    /*输出每个point*/
    $.each(cfg.data,function (index, value) {
        var point = $('<div class="point point_'+index+'"></div>');

        var name = $('<div class="name">'+value[0]+'</div>'),
            rate = $('<div class="rate">'+(value[1]*100)+'%</div>');
        name.append(rate);
        point.append(name);


        var per = (value[1]/base)*100+'%';
        point.width(per)
            .height(per);
        if(value[2]){
            point.css('backgroundColor',value[2])
        }
        if(value[3] !== undefined && value[4] !== undefined){
            point.css('left',value[3]).css('top',value[4]);
        }


        component.append(point);
    });


    return component
};