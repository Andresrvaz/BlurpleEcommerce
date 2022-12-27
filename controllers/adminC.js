const {v4: uuidv4} = require('uuid');
const timestamp = require('time-stamp');
const { response } = require('express');

const productArray = [];
const blogArray=[];

    exports.getAdmin = (req,res,next) =>{
    res.render('admin')
   };
   
   exports.getAddProduct = (req,res,next) => {
       res.render('alta');
   };
   
   exports.getStock = (req,res,next) => {
       console.log(productArray);
       res.render('inventario', {inventario: productArray});
   };
   
   exports.postProduct = (req,res,next) => {
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
       pQt: pQ,
       pImg: pImg
     });
   
     console.log(productArray);
   
      res.redirect('/admin/agregar-articulo')
   };

   exports.getProduct = (req,res,next) => {
        console.log(req.params.ID);

        productArray.forEach(product => {
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

      const target = productArray.indexOf(productArray.find(product => product.id === id));

      productArray.splice(target,1);

        productArray.push({
            pId: req.params.ID,
            pName: req.body.nombre,
            pDesc: req.body.descripcion,
            pCat: req.body.categoria,
            pBrand: req.body.marca,
            pPrice: req.body.precio,
            pQt: req.body.cantidad,
            pImg: req.body.imagenP
        })

        console.log(productArray);

   };

   exports.getDelProduct =(req,res,next) =>{

    console.log('eliminando');

    const id = req.params.ID;

    const target = productArray.indexOf(productArray.find(product => product.id === id));

    productArray.splice(target,1);

    res.redirect('/admin/inventario')

   };

   exports.getAddBlogPost = (req,res,next) => {
    res.render('nuevoArticulo');
   };

   exports.postAddBlogPost = (req,res,next) => {
    
    blogArray.push({
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

    const target = blogArray.find(post => post.id === req.params.ID);

        blogArray.splice(blogArray.indexOf(target),1)

        blogArray.push({
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
        
        const target = blogArray.find(post => post.id === req.params.ID);

        blogArray.splice(blogArray.indexOf(target,1));

        res.redirect('/admin/blogfeed');
    }

    exports.getBlogFeed =(req,res,next) => {

    

    res.render('adminblog',{articulos: blogArray});
   };

   exports.getBlogPost = (req, res, next) => {
     console.log(req.params.ID);

    const post = blogArray.find(post => post.id === req.params.ID)

    res.render('adminPost', {post: post});

   };