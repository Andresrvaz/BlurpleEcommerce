const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const {v4: uuidv4} = require('uuid');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views','views');


app.get('/',(req,res,next) => {
    res.render('index');
});

app.get('/admin', (req,res,next) =>{
 res.render('admin')
});

app.get('/admin/agregar-articulo',(req,res,next) => {
    res.render('alta');
});

app.post('/admin/submit', (req,res,next) => {
   const pName = req.body.nombre
   const pDesc = req.body.descripcion
   const pCat = req.body.categoria
   const pBrand = req.body.marca
   const pPrice = req.body.precio
   const pQ= req.body.cantidad
   const pImg= req.body.img

   const productArray = [];

  productArray.push({
    pId: uuidv4(),
    pname: pName,
    pDesc: pDesc,
    pCat: pCat,
    pBrand: pBrand,
    pPrice: pPrice,
    pQ: pQ,
    pImg: pImg
  });

  console.log(productArray)

   res.redirect('/admin/agregar-producto')
});

app.listen(4000, () => {
    console.log('listening on port 4000')
});