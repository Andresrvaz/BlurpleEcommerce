const Cart = require('../models/cart');
const Product = require('../models/products');

exports.getIndex = (req,res,next) => {
    res.render('index', {productos : Product});
}

exports.getProductsCat = (req,res,next) => {

    const targetCat= req.params.cat;

   const productsCat = Product.filter(products => products.pCat === targetCat);

   console.log(productsCat);

    res.render('productosCat',{cat : targetCat, productos: productsCat});
}

exports.getProduct = (req,res,next) => {

    const target = req.params.ID;

    const producto = Product.find(product => product.pId === target);

    res.render('producto', {producto : producto});

}

exports.addProductToCart = (req,res,next) => {

    const target = req.params.ID;

    console.log(target);

    const targetProduct = Product.find(product => product.pId === target);
    const foundProduct = Cart.find(product => product.pId === target);
    let total = 0;
    console.log(foundProduct);

    if(foundProduct === undefined){
        console.log('producto no encontrado en el carrito')

        Cart.push({
            pId: targetProduct.pId,
            pName: targetProduct.pName,
            pDesc: targetProduct.pDesc,
            pPrice: targetProduct.pPrice,
            pImg : targetProduct.pImg,
            pQty: 1,
        });
        
        Cart.slice(1,Cart.length).forEach(product => console.log(total += product.pPrice));

        Cart[0].totalPrice = total;
    } 
    else {
        Cart[Cart.indexOf(foundProduct)].pPrice += targetProduct.pPrice;
        Cart[Cart.indexOf(foundProduct)].pQty += 1;

        Cart.slice(1,Cart.length).forEach(product => console.log(total += product.pPrice));

        Cart[0].totalPrice = total;

    }

}

exports.getCart = (req,res,next) => {

    console.log(Cart);
    console.log(Cart.slice(0,1).length);
    console.log(Cart.slice(1,Cart.length).length);

   res.render('cart',{cartTotalPrice: Cart.slice(0,1), cartProducts: Cart.slice(1,Cart.length)});

}