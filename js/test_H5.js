/**
 * Created by 98435 on 2017/2/24.
 */
function H5() {
    this.id = ('h5_'+Math.random()).replace('.','_');
    this.el = $('<div class="h5" id="'+this.id+'"></div>').hide();
    this.page = [];
    $('body').append(this.el);


    /*添加页面*/
    this.addPage = function (name, text) {
        var page = $('<div class="h5_page section">');
        if(name != undefined){
            page.addClass('h5_page_'+name)
        }
        if(text != undefined){
            page.text(text)
        }
        this.page.push(page);
        this.el.append(page);
        if(typeof this.whenAddPag === "function"){
            this.whenAddPag();
        }
        return this
    };

    /*添加组件*/
    this.addComponent = function (name,cfg) {
        var cfg = cfg || {};
        cfg = $.extend({
            type:'base'
        },cfg);

        var component; //定义一个变量来储存组件
        switch (cfg.type){
            case "base":
                component = new H5ComponentBase(name,cfg);
                break;
            case "Polyline":
                component = new H5ComponentPolyline(name,cfg);
                break;
            case "Bar":
                component = new H5ComponentBar(name,cfg);
                break;
            case "Radar":
                component = new H5ComponentRadar(name,cfg);
                break;
            case "BarV":
                component = new H5ComponentBarV(name,cfg);
                break;
            case "Point":
                component = new H5ComponentPoint(name,cfg);
                break;
            case "Pie":
            component = new H5ComponentPie(name,cfg);
                break;
            case "Ring":
                component = new H5ComponentRing(name,cfg);
                break;
            default:
        }
        var page = this.page.slice(-1)[0];
        page.append(component);

        return this
    };

    /*H5对象初始化呈现*/
    this.loader = function ( firstPage ) {
        this.el.fullpage({
            onLeave:function(index,nextIndex,direction){
                $(this).find('.h5_component').trigger('onLeave');
            },
            afterLoad:function(anchorLink,index){
                $(this).find('.h5_component').trigger('onLoad');
            }
        });
        this.page[0].find('.h5_component').trigger('onLoad');
        this.el.show();
        if(firstPage){
            $.fn.fullpage.moveTo(firstPage);
        }
    };
    this.loader = typeof H5_loading == 'function'?H5_loading:this.loader;
    return this;




}