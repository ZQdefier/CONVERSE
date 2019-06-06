define(['jquery'],$ => {
    class Header{
        constructor() {
            this.container = $(".header");
            this.load().then(() => {
                this.bindevents();
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
        }
        
        // 头像点击事件
        userSider() {
            if(this.searchBox === true) this.userSearch();
            $("#headerUser").slideToggle();
            this.userBox = !this.userBox;
        }
        
        // 登录框事件
        userLogin() {
            if(this.userBox === false) this.userSider();
            $("#regBox").fadeOut();
            $("#loginBox").fadeIn();
        }

        // 注册框事件
        userReg() {
            if(this.userBox === false) this.userSider();
            $("#loginBox").fadeOut();
            $("#regBox").fadeIn();
        }

        // 搜索框事件
        userSearch() {
            if(this.userBox === true) this.userSider();
            $("#searchBox").find("input").val("")
            $("#searchBox").slideToggle();
            this.searchBox = !this.searchBox;
        }
    }
    return new Header()
})