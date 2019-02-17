class Cart {
    constructor(source, container = '#cart'){
        this.source = source;
        this.container = container;
        this.countGoods = 0; 
        this.amount = 0; 
        this.cartItems = []; 
        this._init(this.source);
    }
    _render(){
        let $cartItems = $('<div/>', {
            class: 'cart-items-wrap'
        });

        let $totalAmount = $('<div/>', {
            class: 'total cart__total'
        });

        let $total = $('<p class="total-text">TOTAL</p>');

        let $totalPrice = $('<p class="cart-sum sum-price total-text"></p>');

        let $linkCheckout = $('<a href="checkout.html" class="checkout-link cart__top-link">Checkout</a>');

        let $goTo = $('<a href="shoping.html" class="checkout-link cart__top-link checkout-link__col">Go to cart</a>');

        $cartItems.appendTo($(this.container));
        $totalAmount.appendTo($(this.container));
        $total.appendTo($totalAmount);
        $totalPrice.appendTo($totalAmount);
        $linkCheckout.appendTo($(this.container));
        $goTo.appendTo($(this.container));

        $(this.container).droppable({
            drop: (event, ui) => {
                this._addProduct(ui.draggable.find('.buy'));
            }
         });

    }
    _renderItem(product){
        let $container = $('<div/>', {
            class: 'cart-products',
            'data-product': product.id_product
        });

        let $containerImg = $(`<img class="cart-img-hover" src="${product.img}">`);

        let $containerInside = $('<div/>', {
            class: 'cart-product-inside',
        });

        let $containerLinkInside = $('<a class="cart-text"></a>');

        let $linkText = $(`<p>${product.product_name}</p>`);

        let $imgInside = $(`<img src="images/stars.png" alt="stars" class="stars">`);

        let $quantity = $(`<span class="cart-span cart-q cart-product-inside__span">${product.quantity}</span>`);

        let $price = $(`<span class="cart-span cart-p cart-product-inside__span">$${product.price}</span>`);

        let $btnDel = $('<span class="cross cart-products__cross"><i class="fas fa-times-circle"></i></span>');

        $container.appendTo($('.cart-items-wrap'));
        $containerImg.appendTo($container);
        $containerInside.appendTo($container);
        $containerLinkInside.appendTo($containerInside);
        $linkText.appendTo($containerLinkInside);
        $imgInside.appendTo($containerInside);
        $quantity.appendTo($containerInside);
        $price.appendTo($containerInside);
        $btnDel.appendTo($container);

        $btnDel.click(() => {
            this._remove(product.id_product);
        });
    }
    _renderSum(amount, countGoods){
        $('.sum-amount').text(`${countGoods}`);
        $('.sum-price').text(`$${amount}`);
    }
    _init(source){
        this._render();
        fetch(source)
            .then(result => result.json())
            .then(data => {
                for (let product of data.contents){
                    this.cartItems.push(product);
                    this._renderItem(product);
                }
                this.countGoods = data.countGoods;
                this.amount = data.amount;
                this._renderSum(data.amount, data.countGoods);
            })

    }
    _updateCart(product){
        let $container = $(`div[data-product="${product.id_product}"]`);
        $container.find('.cart-q').text(product.quantity);
        $container.find('.cart-p').text(`$${product.quantity*product.price}`);
    }
    _addProduct(element){
        let productId = +$(element).data('id');
        let find = this.cartItems.find(product => product.id_product === productId);
        if (find) {
            find.quantity++;
            this.countGoods++;
            this.amount += find.price;
            this._updateCart(find);
        } else {
            let product = {
                id_product: productId,
                price: +$(element).data('price'),
                product_name: $(element).data('name'),
                img: $(element).data('img'),
                quantity: 1
            };
            this.cartItems.push(product);
            this.amount += product.price;
            this.countGoods += product.quantity;
            this._renderItem(product);
        }
        this._renderSum(this.amount, this.countGoods);
    }
    _remove(productId){
        let find = this.cartItems.find(product => product.id_product === productId);
        if (find.quantity > 1) {
            find.quantity--;
            this._updateCart(find);
        } else {
            let $container = $(`div[data-product="${productId}"]`);
            this.cartItems.splice(this.cartItems.indexOf(find), 1);
            $container.remove();
        }
        this.countGoods--;
        this.amount -= find.price;
        this._renderSum(this.amount, this.countGoods);
    }
}
