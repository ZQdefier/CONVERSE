require(['config'],() => {
    require(['header','template','url','footer'],(header,template,url) => {
        class List{
            constructor() {
                this.getdata();
                this.listen();
                this.highPrice = false;
                this.fList = [];
                this.orderlist = [];
                this.filterbox = [];
            }

            // 获取数据
            getdata() {
                $.get(url.rapBaseUrl+"list/item",res => {
                    this.list = res.res_body;
                    this.render(this.list);
                })
            }

            // 渲染页面
            render(data) {
                $("#list-container").html(template("list-template",{list:data}))
            }

            // 监听事件
            listen() {
                $(".content-filter").on('click','dt',e => this.typeshow(e.target))
                $(".content-list-order-type").on('click','a', e => this.order(e))
                $(".content-filter-content").on('change',"input",e => this.check(e))
                $(".content-filter-title").on('change','input',e => this.checkOut(e))
                $(".reset").on('click',() => this.reset())
            }


            // 类型展开效果
            typeshow(dt) {
                let dl = $(dt).parent();
                let height = dl.css("height");
                if(height === "25px"){
                    if(dl.prop("id") === "series"){
                        dl.css({height:"104px"}).siblings("dl:visible").css({height:"25px"})
                    }else if(dl.prop("id") === "kids"){
                        dl.css({height:"70px"}).siblings("dl:visible").css({height:"25px"})
                    }else{
                        dl.css({height:"172px"}).siblings("dl:visible").css({height:"25px"})
                    }
                    $(dt).css({'background-image':"url(/imgs/minus.png)"})
                    dl.siblings().children("dt").css({'background-image':"url(/imgs/plus.png)"})
                }else{
                    dl.css({height:"25px"})
                    $(dt).css({'background-image':"url(/imgs/plus.png)"});
                }
            }


            // 筛选效果功能
            check(e) {
                let dl = $(e.target).parents("dl");
                let index = $(e.target).parents("dd").index();
                let idname = dl.prop("id");
                console.log(index);
                let title = dl.find("dt").html();
                let keyword = $(e.target).siblings("span").html();
                dl.hide();
                $(".reset span").show();
                $(e.target).prop("checked",false);
                $("#filter-box").append(`<li id=f${dl.prop("id")}>
                <h4>${title}</h4>
                <div>
                    <input type="checkbox" name="xl" id="" checked> <span>${keyword}</span>
                </div>
            </li>`)
                this.filterbox.push({idname,index})
                console.log(this.filterbox);
                this.filter(idname,index);
            }



            // 筛选数据功能
            filter(idname,index) {
                index = index *1;
                let list = [];
                if(this.fList.length === 0){
                    if(this.orderlist.length === 0){
                        $(this.list).each((i,item) => {
                            list.push(item)
                        })
                    }else{
                        $(this.orderlist).each((i,item) => {
                            list.push(item)
                        })
                    }
                    this.fList = list;
                }
                this.fList = $(this.fList).filter(function(){
                    return this[idname] === index;
                })
                this.fList = $.makeArray(this.fList);
                this.render(this.fList);
            }

            // 清除筛选
            checkOut(e) {
                let $li = $(e.target).parents("li");
                let idname = $li.prop("id").slice(1);
                let title = $li.find("h4").html();
                $li.remove();
                $(".content-filter-content dl").each((i,dl) => {
                    if($(dl).find("dt").html() === title){
                        $(dl).show();
                        this.typeshow($(dl).find("dt")[0])
                    }
                })
                if($("#filter-box li").length === 0) return this.reset();
                
                // 清除一组筛选后，页面重新渲染
                this.filterbox = $(this.filterbox).filter(function(){
                    return this.idname !== idname;
                })
                this.filterbox = $.makeArray(this.filterbox);
                this.fList = [];
                $(this.filterbox).each((i,item) => {
                    this.filter(item.idname,item.index);
                })
            }
            
            // 重置筛选
            reset() {
                $("#filter-box li").remove();
                $(".content-filter-content dl:hidden").show().each((i,dl) => {
                    let dt = $(dl).find("dt")[0];
                    this.typeshow(dt);
                })
                $(".reset span").hide();
                this.fList = [];
                this.filterbox = [];
                if(this.orderlist.length === 0) this.render(this.list);
                else this.render(this.orderlist);
            }


            // 排序
            order(e) {
                if(e.target.tagName === "I") return;
                let idType = $(e.target).prop("id");
                let list = [];
                if(this.fList.length === 0){
                    $(this.list).each((i,item) => {
                        list.push(item)
                    })
                }else{
                    $(this.fList).each((i,item) => {
                        list.push(item)
                    })
                }
                this.orderlist = list;
                $(e.target).addClass("active").siblings().removeClass("active")
                if(idType === "defaul"){             // 默认排序
                    this.render(this.list);
                }else if(idType === "price"){        // 价格排序
                    if(this.highPrice){
                        list.sort((a,b) =>{          // 降序
                            return b[idType] - a[idType]
                        })
                        this.render(list);
                        $(".drop").show().css({display:"inline-block"});
                        $(".litre").hide();
                    }else{
                        list.sort((a,b) =>{          // 升序
                            return a[idType] - b[idType]
                        })
                        this.render(list);
                        $(".drop").hide();
                        $(".litre").show();
                    }
                    this.highPrice = !this.highPrice;
                }else{                          // 销量，好评排序
                    list.sort((a,b) =>{
                        return a[idType] - b[idType]
                    })
                    this.render(list);
                }
            }
        }
        new List()
    })
})