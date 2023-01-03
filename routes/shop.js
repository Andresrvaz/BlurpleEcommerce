const express = require('express');
const shopControllers = require('../controllers/shopC');

const router = express.Router();

router.get('/', shopControllers.getIndex );

router.get('/productos/categorie=:cat', shopControllers.getProductsCat);

router.get('/producto/id=:ID', shopControllers.getProduct);

router.get('/agregar-carrito/id=:ID', shopControllers.addProductToCart);

router.get('/carrito', shopControllers.getCart);

module.exports = router;