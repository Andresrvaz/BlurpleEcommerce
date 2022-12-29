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