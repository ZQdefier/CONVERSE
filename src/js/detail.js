require(['config'],() => {
    require(['header','template','url','zoom','footer'], (header,template,url) => {
        class Detail{
            constructor() {
                this.getdata();
            }

            // 获取数据
            getdata() {
                $.get(url.rapBaseUrl+"detail/info",res => {
                    $("#detail-container").html(template("detail-template",{list:res.res_body}))
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
        }
        new Detail()
    })
})