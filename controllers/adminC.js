const {v4: uuidv4} = require('uuid');
const timestamp = require('time-stamp');
const { response } = require('express');

const Product = require('../models/products');
const BlogPost = require('../models/blogPost');


    exports.getAdmin = (req,res,next) =>{
    res.render('admin')
   };
   
   exports.getAddProduct = (req,res,next) => {
       res.render('alta');
   };
   
   exports.getStock = (req,res,next) => {
       console.log(Product);
       res.render('inventario', {inventario: Product});
   };
   
   exports.postProduct = (req,res,next) => {
      const pName = req.body.nombre;
      const pDesc = req.body.descripcion;
      const pCat = req.body.categoria;
      const pBrand = req.body.marca;
      const pPrice = req.body.precio;
      const pQty= req.body.cantidad;
      const pImg= req.body.img;
   
     Product.push({
       pId: uuidv4(),
       pName: pName,
       pDesc: pDesc,
       pCat: pCat,
       pBrand: pBrand,
       pPrice: parseInt(pPrice),
       pQty: parseInt(pQty),
       pImg: pImg
     });
   
     console.log(Product);
   
      res.redirect('/admin/inventario')
   };

   exports.getProduct = (req,res,next) => {
        console.log(req.params.ID);

        Product.forEach(product => {
                console.log(product.pId);
            if(product.pId === req.params.ID){
                console.log("Product Match")
                const foundProduct = product;
                res.render('adminproducto',{producto: foundProduct});
            }else {
                console.log("Product Not Found")
            }
        });    
   };

   exports.postUpdateProduct = (req,res,next) =>{
        const id = req.params.ID;

      const target = Product.indexOf(Product.find(product => product.id === id));

      Product.splice(target,1);

        Product.push({
            pId: req.params.ID,
            pName: req.body.nombre,
            pDesc: req.body.descripcion,
            pCat: req.body.categoria,
            pBrand: req.body.marca,
            pPrice: parseInt(req.body.precio),
            pQty: parseInt(req.body.cantidad),
            pImg: req.body.imagenP
        })

        console.log(Product);

        res.redirect('/admin/inventario');

   };

   exports.getDelProduct =(req,res,next) =>{

    console.log('eliminando');

    const id = req.params.ID;

    const target = Product.indexOf(Product.find(product => product.id === id));

    Product.splice(target,1);

    res.redirect('/admin/inventario')

   };

   exports.getAddBlogPost = (req,res,next) => {
    res.render('nuevoArticulo');
   };

   exports.postAddBlogPost = (req,res,next) => {
    
    BlogPost.push({
        id: uuidv4(),
        titulo: req.body.titulo,
        autor:  req.body.autor,
        fecha: timestamp('YYYY/MM/DD'),
        hora: timestamp('HH:mm'),
        imagen:  req.body.imagen,
        cuerpo:  req.body.cuerpo,
        editado: false
      });

      res.redirect('/admin/blogfeed');

   };

   exports.postUpdateBlogPost = (req,res,next) => {

    const target = BlogPost.find(post => post.id === req.params.ID);

        BlogPost.splice(BlogPost.indexOf(target),1)

        BlogPost.push({
            id: req.params.ID,
            titulo: req.body.titulo,
            autor: req.body.autor,
            fecha: timestamp('YYYY/MM/DD'),
            hora: timestamp('HH:mm'),
            imagen: req.body.imagen,
            cuerpo: req.body.cuerpo,
            editado: true
        });

        res.redirect('/admin/blogfeed');

   }

    exports.deleteBlogPost = (req,res,next) => {
        
        const target = BlogPost.find(post => post.id === req.params.ID);

        BlogPost.splice(BlogPost.indexOf(target,1));

        res.redirect('/admin/blogfeed');
    }

    exports.getBlogFeed =(req,res,next) => {

    

    res.render('adminblog',{articulos: blogArray});
   };

   exports.getBlogPost = (req, res, next) => {
     console.log(req.params.ID);

    const post = BlogPost.find(post => post.id === req.params.ID)

    res.render('adminPost', {post: post});

   };