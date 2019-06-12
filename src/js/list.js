require(['config'],() => {
    require(['header','template','url','footer'],(header,template,url) => {
        class List{
            constructor() {
                this.getdata();
                this.listen();
                this.highPrice = false;
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
                $(".content-filter").on('click','dt',e => this.typeshow(e))
                $(".content-list-order-type").on('click','a', e => this.order(e))
            }


            // 类型展示效果
            typeshow(e) {
                let dl = $(e.target).parent();
                let height = dl.css("height");
                if(height === "25px"){
                    if(dl.prop("id") === "series"){
                        dl.css({height:"104px"}).siblings().css({height:"25px"})
                    }else if(dl.prop("id") === "kids"){
                        dl.css({height:"70px"}).siblings().css({height:"25px"})
                    }else{
                        dl.css({height:"172px"}).siblings().css({height:"25px"})
                    }
                }else{
                    dl.css({height:"25px"})
                }
            }


            // 排序
            order(e) {
                if(e.target.tagName === "I") return;
                let idType = $(e.target).prop("id");
                let list = [];
                $(this.list).each((i,item) => {
                    list.push(item)
                })
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