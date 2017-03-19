/**
 * Created by 98435 on 2017/2/21.
 */
/*基本图文组件对象*/
var H5ComponentBase = function(name,cfg){
    var cfg = cfg || {};
    var id = ('h5_c_'+Math.random()).replace('.','_');
    var cls = 'h5_component_name_'+name +' h5_component_'+cfg.type;
    var component = $('<div class="h5_component '+cls+'" id="'+id+'"></div>');
    if(cfg.text)component.text(cfg.text);
    if(cfg.width)component.width(cfg.width/2);
    if(cfg.height)component.height(cfg.height/2);
    if(cfg.css)component.css(cfg.css);
    if(cfg.bg)component.css('backgroundImage','url('+cfg.bg+')');
    if(cfg.center === true){
        component.css({
            'marginLeft':cfg.width/4*-1+'px',
            'left':'50%'
        })
    }
    if(typeof cfg.onclick === "function"){
        component.click(cfg.onclick)
    }


    component.on('onLeave',function(){
        setTimeout(function () {
            component.removeClass(cls+'_load').addClass(cls+'_leave');
            if(cfg.animateOut) component.animate(cfg.animateOut,cfg.outSpeed||'normal');
        },cfg.delay || 0);
        return false
    });
    component.on('onLoad',function(){
        setTimeout(function () {
            component.removeClass(cls+'_leave').addClass(cls+'_load');
            if(cfg.animateIn) component.animate(cfg.animateIn,cfg.inSpeed||'normal');
        },cfg.delay || 0);
        return false
    });
    return component;

};