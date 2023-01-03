const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const blogRoutes = require('./routes/blog');
const userRoutes = require('./routes/users');

const app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views','views');

app.use(adminRoutes);
app.use(shopRoutes);
app.use(blogRoutes);
app.use(userRoutes);

app.use((req,res,next) => {

res.status(404).render('404');

})

app.listen(4000, () => {
    console.log('listening on port 4000')
});