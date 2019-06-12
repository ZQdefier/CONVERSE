require(['config'],() => {
    require(['header','template','swiper','url','footer'],(header,template,Swiper,url) => {
        class Index{
            constructor() {
                this.banner();
                this.getdata();
                this.hover();
            }

            // 轮播图效果
            banner() {
                var mySwiper = new Swiper('.swiper-container', {
                    autoplay: {//自动播放
                        delay: 2000,
                        stopOnLastSlide: false,
                        disableOnInteraction: false,
                    },
                    loop : true,// 循环
                    effect : 'fade',// 切换效果
                    speed:1000,// 切换速度
                    navigation: {//前进后退
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    pagination: {// 分页器
                        el: '.swiper-pagination',
                        renderBullet: function (index, className) {
                            var text=null
                            switch(index){
                                case 0:text='Pro BB';break;
                                case 1:text='JWANDERSON';break;
                                case 2:text='PRIDE';break;
                                case 3:text='STAR SERIES';break;
                                case 4:text='JP GOLD';break;
                            }
                            return '<span class="' + className + '">' + text + '</span>';
                        },
                        clickable :true,
                    },                   
                })
            }

            // 获取热销数据
            getdata() {
                $.get(url.rapBaseUrl+"index/hotshow",res => {
                    $("#show-container").html(template("show-template",{list:res.res_body}))
                })
                $.get(url.rapBaseUrl+"index/newshow",res => {
                    console.log(res.res_body);
                    $("#new-container").html(template("new-template",{list:res.res_body}))
                })
            }

            // 热销hover效果的实现
            hover() {
                var index = 0;
                $("#hotShop").find("li").hover(function(){
                    if($(this).index() === index) return;
                    index = $(this).index();
                    var _left = 12 + index*25 + "%";
                    $("#hotSj").css('left',_left);
                    $(".hotshop-show").fadeOut(200).eq(index).fadeIn(1000); 

                    
                })
            }
        }

        new Index();
    })
})