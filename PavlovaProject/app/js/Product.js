class Product {
    constructor(id, title, price, size, color, img, container = '#item'){
        this.id = id;
        this.title = title;
        this.price = price;
        this.img = img;
        this.size = size;
        this.color = color;
        this.container = container;
        this._render(this.container);
    }
    _render(container){
        let $wrapper = $('<div/>', {
            class: 'product'
        });

        $wrapper.draggable({
            revert: true
        });

        let $img = $('<img/>', {
            src: this.img
        });

        let $desc = $('<div/>', {
            class: 'desc'
        });

        let $name= $('<h2/>', {
            class: 'desc-heading',
            text: this.title
        });

        let $price = $(`<p><span class="desc-price">${this.price}$</span></p>`);

        let $size = $(`<p>Size: <span class="desc-size">${this.size}</span></p>`);

        let $color = $(`<p>Color: <span class="desc-color">${this.color}</span></p>`);

        let $buyBtn = $('<button/>', {
            class: 'buyBtn',
            text: 'Buy',
            'data-id': this.id,
            'data-price': this.price,
            'data-name': this.title,
            'data-color': this.color,
            'data-size': this.size,
            'data-img': this.img
        });

        $img.appendTo($wrapper);
        $name.appendTo($desc);
        $price.appendTo($desc);
        $size.appendTo($desc);
        $color.appendTo($desc);
        $buyBtn.appendTo($desc);
        $desc.appendTo($wrapper);
        $(container).append($wrapper);
    }
}