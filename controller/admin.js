const User = require('../models/user');
const Cat = require('../models/category');
const Tag = require('../models/tag');
const REG = require("../models/add-user");
const bcrypt =require('bcrypt');
// const Draft = require('../models/draft');

exports.getPost = async(req,res)=>{
    try {
        const perPage = 5;
        const page = parseInt(req.query.page) || 1;
        
        const countRecord = await User.countDocuments({});
        const news = await User.find()
            .sort({ timestamp: -1 })
            .skip(perPage * (page - 1))
            .limit(perPage);

        res.render('all-post', {
            news: news,
            currentPage: page,
            pages: Math.ceil(countRecord / perPage)
        });
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Internal Server Error');
    }
    
};
exports.getCatagory=(req,res)=>{
    Cat.find()
    .then(cat=>{
        res.render('catagory',{cat:cat})
    })
    .catch(err=>{
        console.log(err,"error in fetching catgory")
    })
};
exports.getAddCatagory=(req,res)=>{
    res.render('add-catagory')
};
exports.getEditCatagory = (req,res)=>{
    Cat.findById(req.params.id)
    .then(cat=>{
      res.render('edit-catagory',{cat:cat})
    })
    .catch(err=>{
        console.log(err,"error in updating category")
    })
    
};
exports.postEditCatagory=async(req,res)=>{
    try{
        const category = req.body.category;
        const checkbox = req.body.checkbox === 'true';
        const updated = await Cat.findByIdAndUpdate(req.params.id,{category,checkbox},{new:true})
        if(!updated){
            return res.status(404).send('category not found')
        }
            console.log('category updated successfully')
            res.redirect('/admin/catagory')
        }catch(error){
            console.log(error)
        }
    };

exports.postAddCategory=(req,res)=>{
    const category =req.body.category;
    const checkbox = req.body.checkbox === 'true';
    const cate = new Cat({
        category:category,
        checkbox:checkbox
    });
    cate.save()
    .then(result=>{
        console.log(cate)
        console.log('category add successfully')
        res.redirect('/admin/catagory')
    })
    .catch(err=>{
         console.log('error creating a new product',err)
    })
};
exports.postDeleteC = async (req, res) => {
    try {
        const detecategory = await Cat.findByIdAndDelete(req.params.id);
        if (!detecategory) {
            return res.status(404).send("Category not found"); 
        }
        console.log('Deleted Successfully');
        res.status(200).send("Category deleted successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while deleting the category");
    }
};


//TAGS<-----------TAGS--------------->TAGS
exports.gettag=(req,res)=>{
    Tag.find()
    .then(tag=>{
        res.render('tags',{tag:tag})
    })
    .catch(err=>{
        console.log(err,"error in fetching catgory")
    })
};
exports.getAddtag=(req,res)=>{
    res.render('add-tag')
};
exports.getEdittag = (req,res)=>{
    Tag.findById(req.params.id)
    .then(tag=>{
      res.render('edit-tag',{tag:tag})
    })
    .catch(err=>{
        console.log(err,"error in updating tag")
    })
    
};
exports.postEdittag=async(req,res)=>{
    try{
        const tag = req.body.tag;
        const updated = await Tag.findByIdAndUpdate(req.params.id,{tag},{new:true})
        if(!updated){
            return res.status(404).send('tag not found')
        }
            console.log('tag updated successfully')
            res.redirect('/admin/tag')
        }catch(error){
            console.log(error)
        }
    };

exports.postAddtag=(req,res)=>{
    const tag =req.body.tag;
    const tags = new Tag({
        tag:tag
    });
    tags.save()
    .then(result=>{
        console.log(Tag)
        console.log('tag add successfully')
        res.redirect('/admin/tag')
    })
    .catch(err=>{
         console.log('error creating a new tag',err)
    })
}
exports.postDelte=async(req,res)=>{
    try{
            const deletetag = await Tag.findByIdAndDelete(req.params.id);
            if(!deletetag){
                res.status(404).send("Tag not found")
            } 
            console.log('deleted Successfully')
            res.redirect('/admin/tag')
        }catch(error){ 
            console.log(error)
         };
}



//POSTS<-----------POSTS--------------->POSTS
exports.getAddNews=(req,res)=>{
    Promise.all([Cat.find(), Tag.find()])
    .then(([categories, tags]) => {
         res.render('add-news',{categories:categories,tags:tags})
    })
    .catch(err => {
        console.error('Error fetching categories and tags:', err);
        res.status(500).send('Error fetching categories and tags');
    }); 
   
}
exports.postAddnews= async (req, res) => {
    const action = req.body.action;
    try {
        if (action === 'publish' || action === 'draft') {
            const { title, description, category, tags } = req.body;
            const image = req.file ? req.file.filename : ''; 
            const timestamp = new Date();
            const status = action === 'publish' ? 'published' : 'draft';

            const news = new User({
                title,
                image,
                description,
                category,
                tags,
                timestamp,
                status 
            });

            await news.save(); 

            console.log('News added successfully');
            res.redirect('/admin/');
        } else {
            res.status(400).send('Invalid action');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};
exports.postPublish = async (req, res) => {
  try {
    const updatedArticle = await User.findByIdAndUpdate(req.params.id,{ status: 'published'}, { new: true });
    if (!updatedArticle) {
      return res.status(404).send('news not found');
    }

    res.redirect('/admin/');
  } catch (error) {
    console.error(error);
    res.status(500).send('internal error');
  }
  };
// exports.getDraft=(req,res)=>{
//     Draft.find()
//     .then(news=>{
//         res.render('draft',{news:news})
//     })
//     .catch(err=>{
//         console.log(err,"error in fetching draft")
//     })
// };
//  exports.getEditPage=(re,res)=>{
//         User.find()  
//         .then(data=>{
//             res.render('edit-news',{data:data})
//         })
//         .catch(err=>{
//             console.log('error fetching products',err)
//         })
       
//     };
 exports.getUpdateInfoPage=(req,res)=>{
    User.findById(req.params.id)
    .then(data=>{
        res.render('UpdateInfopage',{data:data})
    })
    .catch(err=>{
        console.log('error fetching products',err)
    })
 };

 exports.postUpdate=async(req,res)=>{
    try{
        const{title,description,category}=req.body;
        const updatenews = {title,description,category};
        if(req.file){
         updatenews.image=req.file.filename;
        }
        const updated = await User.findByIdAndUpdate(req.params.id,updatenews,{new:true});
        if(!updated){
            return res.status(404).send('news not found')
        }
        console.log('news updated successfully')
        res.redirect('/admin/')
    }catch(error){
        console.log(error)
    }
 };

 exports.postDelete=async(req,res)=>{
    try{
    const deletenews = await User.findByIdAndDelete(req.params.id);
    if(!deletenews){
        res.status(404).send("news not found")
    } 
    console.log('deleted Successfully')
    res.redirect('/admin/')
}catch(error){ 
    console.log(error)
 };
};

exports.getPostDetails=(req,res)=>{
    User.findById(req.params.id)
    .then(data=>{
        res.render('postdeatils',{data:data})
    })
    .catch(err=>{
        console.log(err,"error in fetching details")
    })
}

exports.getCategories = (req, res) => {
    Cat.find({checkbox:true}, 'category')
    .then(categories => {
        res.json(categories);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    });
};
//REGISTER<-----------REGISTER--------------->REGISTER
exports.getAddUser=(req,res)=>{
    REG.find()
    .then(cat=>{
        res.render('registeruser',{cat:cat})
    })
    .catch(err=>{
        console.log(err,"error in fetching catgory")
    })
};
exports.getRegs=(req,res)=>{
    res.render('add-user')
}
exports.postREgister = async(req, res) => {
    const {username,email,password} = req.body;
    const checkbox = req.body.checkbox === 'true';
    try{
        const existingUser = await REG.findOne({email})
        if(existingUser){
            return res.status(404).send('Username and Email already exists')
        }
        const hashPassword = await bcrypt.hash(password,10);
        const data = new REG({
            username:username,
            email:email,
            password:hashPassword,
            checkbox:checkbox
        });
        await data.save();
   res.redirect('/admin/add-user') 
    }catch(error)  {
            console.log('Error creating a new user:', error);
        }
    };
    exports.postDeletereg=async(req,res)=>{
        try{
                const deter = await REG.findByIdAndDelete(req.params.id);
                if(!deter){
                    res.status(404).send("user not found")
                } 
                console.log('deleted Successfully')
                res.redirect('/admin/add-user')
            }catch(error){ 
                console.log(error)
             };
    }
   


//DRAFTS<-----------DRAFTS--------------->DRAFTS
// exports.postDeleteDraft=async(req,res)=>{
//     try{
//         const deletenews = await Draft.findByIdAndDelete(req.params.id);
//         if(!deletenews){
//             res.status(404).send("news not found")
//         } 
//         console.log('deleted Successfully')
//         res.redirect('/admin/draft')
//     }catch(error){ 
//         console.log(error)
//      };
// };
// exports.getDraft=(req,res)=>{
//     Draft.find()
//     .then(news=>{
//         res.render('draft',{news:news})
//     })
//     .catch(err=>{
//         console.log(err,"error in fetching draft")
//     })
// };

// exports.getDraftinfo=(req,res)=>{
//     Draft.findById(req.params.id)
//     .then(data=>{
//         res.render('draftinfoupdate',{data:data})
//     })
//     .catch(err=>{
//         console.log('error fetching products',err)
//     })
//  };
//  exports.postUpdatedraft=async(req,res)=>{
//     try{
//         const{title,description,category}=req.body;
//         const updatenews = {title,description,category};
//         if(req.file){
//          updatenews.image=req.file.filename;
//         }
//         const updated = await Draft.findByIdAndUpdate(req.params.id,updatenews,{new:true});
//         if(!updated){
//             return res.status(404).send('news not found')
//         }
//         console.log('news updated successfully')
//         res.redirect('/admin/draft')
//     }catch(error){
//         console.log(error)
//     }
//  };