const REG = require('../models/add-user');
const bcrypt = require('bcrypt')

exports.getLogin=(req,res)=>{
    if(req.session.userId){
        return res.redirect('/admin')
    }
    res.render("login")
};
exports.postLogin =async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await REG.findOne({email})
        if(!user){
            return res.redirect('/')
        }
        const vaildPassword = await bcrypt.compare(password,user.password);
        if(!vaildPassword){
          return res.redirect('/')
        }
        req.session.userId=user._id;
        res.redirect('/admin/');
    }catch(error){
        console.log(error);
        res.status(500).send('internal server error')
    }
    }
;
exports.getLogout=(req,res)=>{
    req.session.destroy(err=>{
        if(err){
            console.log('error in destroying session',err)
            return res.status(404).send('error in destroying session')
        }
        res.redirect('/')
    })
}