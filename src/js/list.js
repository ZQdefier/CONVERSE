require(['config'],() => {
    require(['header','template','url','footer'],(header,template,url) => {
        class List{
            constructor() {
                this.getdata();
                this.bindevents();
            }

            // 获取数据
            getdata() {
                $.get(url.rapBaseUrl+"list/item",res => {
                    this.list = res.res_body;
                    $("#list-container").html(template("list-template",{list:this.list}))
                })
            }

            // 监听事件
            bindevents() {
                
            }

        }
        new List()
    })
})