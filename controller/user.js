const { Timestamp } = require('mongodb');
const User = require('../models/user');
const Cat = require('../models/category')

exports.getHome = async (req, res) => {
    try {
        const perPage = 6; 
        const page = parseInt(req.query.page) || 1; 
        const countRecord = await User.countDocuments({ status: 'published' }); 
        const data = await User.find({ status: 'published' })
            .sort({ timestamp: -1 }) 
            .skip(perPage * (page - 1)) 
            .limit(perPage); 
        res.render('user', {
            data: data,
            currentPage: page,
            pages: Math.ceil(countRecord / perPage) 
        });
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Internal Server Error');
    }
};
// exports.getHome=(req,res)=>{
//     User.find()
//     .then(data=>{
//         res.render('user',{data:data})
//     })
//     .catch(err=>{
//         console.log(err,"error in fetching news")
//     })
// }
    
    
       

    

exports.getReadMore=(req,res)=>{
    User.findById(req.params.id)
    .then(data=>{
        res.render('read',{data:data})
    })
    .catch(err=>{
        console.log('error fetching product:',err);
    })
};


exports.getPostsByCategory=async(req,res)=>{
    const category = req.params.category;
    const data = await User.find({category:category});
    res.render('navtag',{data:data})
}





// exports.getpolitics=(req,res)=>{
//     User.find()
//     .then(data=>{
//         res.render('politics',{data:data})
//     })
//     .catch(err=>{
//         console.log('error in fetching data',err)
//     })
// };
// exports.getBusiness=(req,res)=>{
//     User.find()
//     .then(data=>{
//         res.render('business',{data:data})
//     })
//     .catch(err=>{
//         console.log('error in fetching data',err)
//     })
// };
// exports.getEntertainment=(req,res)=>{
//     User.find()
//     .then(data=>{
//         res.render('entertainent',{data:data})
//     })
//     .catch(err=>{
//         console.log('error in fetching data',err)
//     })
// };
// exports.getlife=(req,res)=>{
//     User.find()
//     .then(data=>{
//         res.render('life',{data:data})
//     })
//     .catch(err=>{
//         console.log('error in fetching data',err)
//     })
// };
// exports.getworld=(req,res)=>{
//     User.find()
//     .then(data=>{
//         res.render('world',{data:data})
//     })
//     .catch(err=>{
//         console.log('error in fetching data',err)
//     })
// };
// exports.getTech=(req,res)=>{
//     User.find()
//     .then(data=>{
//         res.render('tech',{data:data})
//     })
//     .catch(err=>{
//         console.log('error in fetching data',err)
//     })
// };
// exports.getSports=(req,res)=>{
//     User.find()
//     .then(data=>{
//         res.render('sports',{data:data})
//     })
//     .catch(err=>{
//         console.log('error in fetching data',err)
//     })
// };
