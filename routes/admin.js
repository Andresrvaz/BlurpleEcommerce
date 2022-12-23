const { Router } = require('express');
const express = require('express');
const {v4: uuidv4} = require('uuid');

const router = express.Router();
const productArray = [];

    router.get('/admin', (req,res,next) =>{
    res.render('admin')
   });
   
   router.get('/admin/agregar-articulo',(req,res,next) => {
       res.render('alta');
   });
   
   router.get('/admin/inventario', (req,res,next) => {
       console.log(productArray);
       res.render('inventario', {inventario: productArray});
   });
   
   router.post('/admin/submit', (req,res,next) => {
      const pName = req.body.nombre;
      const pDesc = req.body.descripcion;
      const pCat = req.body.categoria;
      const pBrand = req.body.marca;
      const pPrice = req.body.precio;
      const pQ= req.body.cantidad;
      const pImg= req.body.img;
   
     productArray.push({
       pId: uuidv4(),
       pName: pName,
       pDesc: pDesc,
       pCat: pCat,
       pBrand: pBrand,
       pPrice: pPrice,
       pQ: pQ,
       pImg: pImg
     });
   
     console.log(productArray);
   
      res.redirect('/admin/agregar-articulo')
   });

   router.get('/admin/producto/id=:ID',(req,res,next) => {
        console.log(req.params.ID);

        productArray.forEach(product => {
                console.log(product.pId);
            if(product.pId === req.params.ID){
                console.log("Product Match")
                const foundProduct = product;
                res.render('adminProducto',{producto: foundProduct});
            }else {
                console.log("Product Not Found")
            }
        });

       
   });

   module.exports = router;