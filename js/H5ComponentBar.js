/**
 * Created by 98435 on 2017/2/21.
 */
/*基本柱状图组件对象*/
var H5ComponentBar = function(myBar,cfg){
    var component = new H5ComponentBase(myBar,cfg);

    /*循环data组，每个value同样也是一个数组*/
    $.each(cfg.data,function (index, value) {
        var line = $('<div class="line"></div>'),
            name = $('<div class="name"></div>'),
            rate = $('<div class="rate"></div>'),
            per = $('<div class="per"></div>'),
            bg = $('<div class="bg"></div>');

        var width = value[1]*100+'%';
        bg.css('backgroundColor','');
        if(value[2]){
            bg.css('backgroundColor',value[2])
        }
        name.text(value[0]);
        per.text(width);
        rate.width(width);

        rate.append(bg,per);
        line.append(name,rate);
        component.append(line);



    });




    return component
};