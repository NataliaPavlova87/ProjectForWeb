class Cart {
    constructor(source, container = '#product-details'){
        this.source = source;
        this.container = container;
        this.countGoods = 0; 
        this.amount = 0; 
        this.cartItems = []; 
        this._init(this.source);
    }
    _render(){
        let $cartItemsDiv = $('<div/>', {
            class: 'product-details-head'
        });

        let $textHeading = $(`<p class="details-text">Product Details</p>`);

        let $cartItemsDivInside = $('<div/>', {
            class: 'head-right'
        });

        let $textHeadingPrice = $(`<p class="details-text product-details-head__text">unite Price</p>`);
        let $textHeadingQuantity = $(`<p class="details-text product-details-head__text">Quantity</p>`);
        let $textHeadingShipping = $(`<p class="details-text product-details-head__text">shipping</p>`);
        let $textHeadingAction = $(`<p class="details-text">ACTION</p>`);

        let $cartItems = $('<div/>', {
            class: 'cart-items-wrap'
        });

        let $totalAmount = $('<div/>', {
            class: 'cart-summary sum-amount'
        });
        let $totalPrice = $('<div/>', {
            class: 'cart-summary sum-price'
        });
        
        $cartItemsDiv.appendTo($(this.container));
        $textHeading.appendTo($cartItemsDiv);
        $cartItemsDivInside.appendTo($cartItemsDiv);
        $textHeadingPrice.appendTo($cartItemsDivInside);
        $textHeadingQuantity.appendTo($cartItemsDivInside);
        $textHeadingShipping.appendTo($cartItemsDivInside);
        $textHeadingAction.appendTo($cartItemsDivInside);
        $cartItems.appendTo($(this.container));
        $totalAmount.appendTo($(this.container));
        $totalPrice.appendTo($(this.container));

        $(this.container).droppable({
            drop: (event, ui) => {
                this._addProduct(ui.draggable.find('.buyBtn'));
            }
         });

    }
    _renderItem(product){
        let $container = $('<div/>', {
            class: 'product-details-inside',
            'data-product': product.id_product
        });

        let $containerLink = $('<a class="details-left"></a>');

        let $containerImg = $(`<img class="det-lf-img" src="${product.img}">`);

        let $containerInside = $('<div/>', {
            class: 'img-info details-left__info',
        });

        let $heading = $(`<h3 class="info-heading">${product.product_name}</h3>`)

        let $text = $(`<p class="info-text details-left__text">Color: <span class="info-span">${product.color}</span> <br> Size: <span class="info-span">${product.size}</span></p>`);

        let $containerInsideRight = $('<div/>', {
            class: 'details-right',
        });

        let $price = $(`<p class="det-rgh-text det-rgh-text-price details-right__elements">$${product.price}</p>`);

        let $quantity = $(`<p class="det-rgh-form details-right__elements">${product.quantity}</p>`)

        let $free = $('<p class="det-rgh-text details-right__elements">FREE</p>');

        let $btnDel = $('<span class="details-right__elements details-right-span"><i class="fas fa-times-circle det-rgh-i"></i></span>');

        $container.appendTo($('.cart-items-wrap'));
        $containerLink.appendTo($container);
        $containerImg.appendTo($containerLink);
        $containerInside.appendTo($containerLink);
        $heading.appendTo($containerInside);
        $text.appendTo($containerInside);
        $containerInsideRight.appendTo($container);
        $price.appendTo($containerInsideRight);
        $quantity.appendTo($containerInsideRight);
        $free.appendTo($containerInsideRight);
        $btnDel.appendTo($containerInsideRight);

        $btnDel.click(() => {
            this._remove(product.id_product);
        });
    }
    _renderSum(amount, countGoods){
        $('.span-amount').text(`${countGoods}`);
        $('.span-price').text(`$${amount}`);
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
        $container.find('.det-rgh-form').text(product.quantity);
        $container.find('.det-rgh-text-price').text(`$${product.quantity*product.price}`);
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
                color: $(element).data('color'),
                size: $(element).data('size'),
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
    _removeAll(){
        let $removeAll = $('.product-details-inside');
        $removeAll.remove();
        this._renderSum(0, 0);
        this.countGoods = 0;
        this.amount = 0;
        this._renderSum(this.amount, this.countGoods);
    }
}
