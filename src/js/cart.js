
require(['config'],() => {
    require(['header','template','footer'], (header,template) => {
        class Cart{
            constructor() {
                this.shop = null;
                this.n = 0;
                this.getData();
            }


            // 获取数据
            getData() {
                var data = localStorage.getItem('cart');
                if(data&&data !== "[]"){
                    $(".noshop").hide().siblings(".haveshop").show();
                    data = JSON.parse(data);
                    this.render(data);
                    this.listen();
                    $("#allCheck").prop("checked",true);
                    this.allCheck();
                }else{
                    $(".haveshop").hide().siblings(".noshop").show();
                }
            }


            // 渲染购物车
            render(data) {
                $("#cart-container").html(template("cart-template",{data}))
            }


            // 监听事件
            listen() {
                $(".haveshop").on('click','.editBtn',e => this.edit(e));
                $(".haveshop").on('click',".delBtn",e => this.delete(e));
                $(".modal #update").on('click',() => this.update(this.shop));
                $(".less").on('click',e => this.less(e));
                $(".more").on('click',e => this.more(e));
                $("#allCheck").on('change',() => this.allCheck());
                $(".check").on('change',e => this.check(e));
                $("#checkAll").on('change', () => this.checkAll());
            }


            // 编辑键事件
            edit(e) {
                $(".modal").show();
                $("#remove").on('click',() => $(".modal").hide());
                this.shop = $(e.target).parents(".shop-cart-content-list");
                let shopSize = $(e.target).parents(".choose").siblings(".content").find(".shopSize").html();
                let shopNum = $(e.target).parents(".choose").siblings(".content").find(".shopNum").val();
                $(".modal #size option").each((index,option)=>{
                    if($(option).html() == shopSize) option.selected = "selected";
                })
                $(".modal #num option").each((index,option)=>{
                    if($(option).html() == shopNum) option.selected = "selected";
                })                
            }


            // 删除事件
            delete(e) {
                this.shop = $(e.target).parents(".shop-cart-content-list");
                if(confirm("确认删除么？")){
                    this.shop.remove();
                    this.change(this.shop,true)
                }
            }


            // 更改事件
            update(shop) {
                console.log(shop);
                shop.find(".shopSize").html($(".modal #size option:selected").text());
                shop.find(".shopNum").val($(".modal #num option:selected").text());
                $(".modal").hide();
                this.change(shop);
            }


            // 数量减少
            less(e) {
                this.shop = $(e.target).parents(".shop-cart-content-list");
                let num = $(e.target).siblings(".shopNum").val() * 1;
                if(--num <= 0) return;
                $(e.target).siblings(".shopNum").val(num);
                this.change(this.shop);
            }


            // 数量增加
            more(e) {
                this.shop = $(e.target).parents(".shop-cart-content-list");
                let num = $(e.target).siblings(".shopNum").val() * 1;
                $(e.target).siblings(".shopNum").val(++num);
                this.change(this.shop);
            }


            // 单选事件
            check(e) {
                this.n += $(e.target).prop("checked")?1:-1;
                console.log(this.n);
                $("#allCheck").prop("checked",this.n === $(".check").length?true:false);
                $("#checkAll").prop("checked",$("#allCheck").prop("checked"));
                this.total();
            }


            // 全选事件
            allCheck() {
                $('.check').prop("checked",$("#allCheck").prop("checked"));
                $('#checkAll').prop("checked",$("#allCheck").prop("checked"));
                this.n = $("#allCheck").prop("checked")?$(".check").length:0;
                this.total();
            }
            checkAll() {
                $("#allCheck").prop("checked",$("#checkAll").prop("checked"));
                this.allCheck();
            }


            // cart更改事件
            change(shop,del) {
                let cart = JSON.parse(localStorage.getItem("cart"));
                let index = -1;
                cart.some((item,i) => {
                    index = i;
                    return shop.attr("data-id") == item.id;
                })
                if(del){
                    cart.splice(index,1)
                    localStorage.setItem('cart',JSON.stringify(cart));
                    console.log(cart);
                    if(cart.length === 0) this.getData();
                    this.n = $(".check").length;
                }else{
                    cart[index].num = shop.find(".shopNum").val()*1;
                    cart[index].size = shop.find(".shopSize").html()*1;
                    // 小计变化
                    let price = cart[index].num * cart[index].price
                    shop.find(".shopPrice").html(price.toFixed(2));
                    localStorage.setItem('cart',JSON.stringify(cart));
                }
                this.total();
            }
            

            // 总价,总数变化事件
            total() {
                let price = 0;
                let num = 0;
                let allNum = header.cartNum();
                $(".shopPrice").each((i,shop) => {
                    let checked = $(shop).parents(".shop-cart-content-list").find(".check").prop("checked");
                    if(checked){
                        price += $(shop).html() * 1;
                        num += $(shop).parents(".price").find(".shopNum").val() * 1;
                    }
                })
                $("#totalPrice").html(price.toFixed(2));
                $(".checkNum").html(num);
                $("#totalNum").html(allNum);
                let shopPrice = price - $("#discount").html();
                $("#shopPrice").html(shopPrice.toFixed(2))
            }     
        }
        new Cart();
    })
})