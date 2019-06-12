define(['jquery','url','cookie'],($,url) => {
    class Header{
        constructor() {
            this.container = $(".header");
            this.load().then(() => {
                this.bindevents();
                this.cartNum();
                this.userBox = false;
                this.searchBox = false;
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
                this.userSider()
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
        userSider() {
            if(this.searchBox === true) this.userSearch();
            $("#headerUser").slideToggle();
            this.userBox = !this.userBox;
        }
        
        // 登录框切换效果
        userLogin() {
            if(this.userBox === false) this.userSider();
            $("#regBox").fadeOut();
            $("#loginBox").fadeIn();
        }

        // 登录功能
        login() {
            let name = $("#user").val();
            let psd = $("#psd").val();
            $.post(url.phpBaseUrl + "user/login.php",{name,psd},res => {
                if(res.res_code===1){
                    console.log(1);
                }else{
                    console.log(2);
                }
                alert(res.res_message)
            },"json");
        }

        // 注册框切换效果
        userReg() {
            if(this.userBox === false) this.userSider();
            $("#loginBox").fadeOut();
            $("#regBox").fadeIn();
        }

        // 注册功能
        register() {
            
        }

        // 搜索框切换效果
        userSearch() {
            if(this.userBox === true) this.userSider();
            $("#searchBox").find("input").val("")
            $("#searchBox").slideToggle();
            this.searchBox = !this.searchBox;
        }

        //搜索功能
        search() {

        }
    }
    return new Header()
})