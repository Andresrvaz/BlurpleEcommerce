const { Router } = require('express');
const express = require('express');
const {v4: uuidv4} = require('uuid');

const adminControllers = require('../controllers/adminC');

const router = express.Router();
const productArray = [];
const blogArray=[];

    router.get('/admin', adminControllers.getAdmin);
   
   router.get('/admin/agregar-articulo', adminControllers.getAddProduct);
   
   router.get('/admin/inventario', adminControllers.getStock);
   
   router.post('/admin/submit', adminControllers.postProduct);

   router.get('/admin/producto/id=:ID', adminControllers.getProduct);

   router.post('/admin/actualizar/id=:ID', adminControllers.postUpdateProduct);

   router.get('/admin/eliminar/id=:ID', adminControllers.getDelProduct);

   router.get('/admin/agregar-blogpost', adminControllers.getAddBlogPost);

   router.post('/admin/agregar-blogpost', adminControllers.postAddBlogPost);

   router.post('/admin/actualizar-blog/id=:ID', adminControllers.postUpdateBlogPost)

   router.get('/admin/eliminar-post/id=:ID', adminControllers.deleteBlogPost);

   router.get('/admin/blogfeed', adminControllers.getBlogFeed);

   router.get('/admin/blog/id=:ID', adminControllers.getBlogPost);

   module.exports = router;