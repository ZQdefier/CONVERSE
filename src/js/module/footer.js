define(["jquery"], $ => {
    function Footer () {
        this.container = $(".footer");
        this.load();
    }
    $.extend(Footer.prototype,{
        load () {
            this.container.load('/html/module/footer.html');
        }
    })
    new Footer();

})