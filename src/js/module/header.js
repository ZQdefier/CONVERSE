define(['jquery','url','cookie'],($,url) => {
    class Header{
        constructor() {
            this.container = $(".header");
            this.load().then(() => {
                this.bindevents();
                this.cartNum();
                this.isLogin();
                this.userBox = false;
                this.searchBox = false;
                this.top = 0;
            })
        }

        // 载入头部页面
        load() {
            return new Promise(resolve => {
                this.container.load("/html/module/header.html",()=>{
                    resolve();
                })
            });
        }

        // 监听事件
        bindevents() {
            $("#header-user").on('click',() => {
                this.userSlide()
            })
            $("#userLogin").on('click',() => {
                this.userLogin()
            })
            $("#userReg").on('click',() => {
                this.userReg()
            })
            $("#headerSearch").on('click',() => {
                this.userSearch()
            })
            $(".header").on('click',"#loginBtn",() => {
                this.login();
            })
            $(".header").on('click',"#regBtn",() => {
                this.register();
            })
            $(".header").on('click',"#loginOut",() => {
                this.loginOut();
            })
            $(".header").on('click',".header-modal",() => {
                this.modal();
            })
            $(window).on('scroll',() => {
                this.scroll();
            })
        }
        
        // 购物车数量变化功能
        cartNum() {
            let cart = localStorage.getItem("cart");
            let res = 0;
            if(cart&&cart !== "[]"){
                cart = JSON.parse(cart);
                $(cart).each((i,shop) => {
                    res += shop.num
                }) 
                $("#cartNum").html(res)
            }else{
                $("#cartNum").html(0)
            }
            return res;
        }

        // 头像点击效果
        userSlide() {
            if(this.searchBox === true) this.userSearch();
            $("#headerUser").slideToggle();
            this.userBox = !this.userBox;
            if(this.userBox) $(".header-modal").show();
            else $(".header-modal").hide();
        }
        
        // 登录框切换效果
        userLogin() {
            if(this.userBox === false){
                this.userSlide();
                $(".header-modal").show();
            } 
            $("#regBox").fadeOut();
            $("#loginBox").fadeIn();
        }

        // 登录功能
        login() {
            let name = $("#user").val();
            let psd = $("#psd").val();
            $.post(url.phpBaseUrl + "user/login.php",{name,psd},res => {
                if(res.res_code===1){
                    
                    // 是否记住密码
                    let expires = $("#remember").prop("checked")?{expires:7} : {};
                    expires = Object.assign({path:"/"},expires);
                    $.cookie('username',name,expires);                  
                    this.userSlide();
                    this.isLogin();
                }
                alert(res.res_message)
            },"json");
        }


        // 登录状态效果
        isLogin() {
            let username = $.cookie("username");
            if(username){
                $("#unlogin").hide();
                $("#onlogin").show();
                $("#loginName").html(username);
            }else{
                $("#onlogin").hide();
                $("#unlogin").show();
            }
        }


        // 退出登录
        loginOut() {
            if(confirm("确认退出么")){
                $("#onlogin").hide();
                $("#unlogin").show();
                $.removeCookie("username",{path: "/"});
            }
        }

        // 注册框切换效果
        userReg() {
            if(this.userBox === false){
                this.userSlide();
                $(".header-modal").show();
            } 
            $("#loginBox").fadeOut();
            $("#regBox").fadeIn();
        }

        // 注册功能
        register() {
            let name = $("#regName").val();
            let psd = $("#regPsd").val();
            $.post(url.phpBaseUrl + "user/register.php",{name,psd},res => {
                if(res.res_code===1){
                    this.userLogin();
                }
                alert(res.res_message)
            },"json")
        }

        // 搜索框切换效果
        userSearch() {
            if(this.userBox === true) this.userSlide();
            $("#searchBox").find("input").val("")
            $("#searchBox").slideToggle();
            this.searchBox = !this.searchBox;
            if(this.searchBox) $(".header-modal").show();
            else $(".header-modal").hide();
        }

        //搜索功能
        search() {

        }


        // 模态框消失
        modal() {
            if(this.userBox) this.userSlide();
            if(this.searchBox) this.userSearch();
            $(".header-modal").hide();
        }

        // 滚动效果
        scroll() {
            let newTop = $(window).scrollTop();
            if(newTop - this.top > 0){
                $(".header-chat").stop().animate({top:'-100px'},() => {
                    $(".header-chat").animate({top:'200px'},700)
                })
            }else{
                $(".header-chat").stop().animate({top:'900px'},() => {
                    $(".header-chat").animate({top:'200px'},1500)
                })
            }
            this.top = newTop;

        }
    }
    return new Header()
})