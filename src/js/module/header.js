define(['jquery'],$ => {
    class Header{
        constructor() {
            this.container = $(".header");
            this.load().then()
        }
        load() {
            return new Promise(resolve => {
                this.container.load("/html/module/header.html",()=>{
                    resolve();
                })
            });
        }
    }
    return new Header()
})