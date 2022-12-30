const BlogPost = require('../models/blogPost');

exports.getBlogfeed = (req,res,next) => {

    console.log(BlogPost)

    res.render('blog',{blogPost : BlogPost});

}