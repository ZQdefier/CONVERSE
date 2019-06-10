
require(['config'],() => {
    require(['header','template','url','zoom','fly','footer'], (header,template,url) => {
        class Detail{
            constructor() {
                this.getdata();
                this.bindevent();
            }

            // 获取数据
            getdata() {
                $.get(url.rapBaseUrl+"detail/info",res => {
                    this.data = res.res_body;
                    $("#detail-container").html(template("detail-template",{list:this.data}))
                    this.zoom();
                })
            }

            // 放大镜
            zoom(){
                $('.zoom-img').elevateZoom({
                    gallery:'gal1',
                    cursor: 'crosshair',
                    galleryActiveClass : 'active',
                    borderSize: '1',
                    borderColor :'#888',
                    zoomWindowHeight: 600,
                    zoomWindowWidth: 250,
                    zoomWindowOffetx: -750,
                    zoomWindowOffety: -75
                });
                
            }

            // 给按键绑事件
            bindevent() {
                $(".main").on('click','#addCart',e =>{
                    this.addCart(e);
                })
            }


            // 加入购物车,存localStorage
            addCart(e) {

                // 特效动画
                $(`<img src='${this.data.img[0]}' style='width:30px;height:30px'>`).fly({
                    start: {
                        left: e.clientX,
                        top: e.clientY
                    },
                    end: {
                        left: 900,
                        top: 20
                    },
                    onEnd: function () {
                        this.destroy();                     
                    }
                })


                var id = Number(location.search.slice(8));
                var size = $("#size option:selected").text() * 1;
                var num = $("#num option:selected").text() * 1;
                if(isNaN(size)) return alert("请选择尺码");
                this.data = {...this.data,id,num,size};
                // console.log(this.data);
                var cart = localStorage.getItem("cart");
                if(cart){
                    cart = JSON.parse(cart)
                    var index = -1;
                    var have = cart.some((shop,i) => {
                        index = i
                        return shop.id === this.data.id
                    })
                    if(have){
                        cart[index].num += num;
                    }else{
                        cart.push(this.data)
                    }
                    localStorage.setItem("cart",JSON.stringify(cart))
                }else{
                    localStorage.setItem("cart",JSON.stringify([this.data]))
                }

            }
        }
        new Detail()
    })
})