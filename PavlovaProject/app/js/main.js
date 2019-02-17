$(document).ready(() => {
   let product1 = new Product(3, 'Mango People', 52, 'M', 'red', 'images/Layer%2043.png');
   let product2 = new Product(4, 'Mango People', 48, 'S', 'green', 'images/Layer%2044.png');
   let product3 = new Product(5, 'Mango People', 105, 'L', 'blue', 'images/Layer%204.png ');

   let mycart = new Cart('getCart.json');
   $('.buyBtn').click(e => {
    mycart._addProduct(e.target);
    });

    $('.clear-contin-link').click(e => {
        mycart._removeAll();
    });

});