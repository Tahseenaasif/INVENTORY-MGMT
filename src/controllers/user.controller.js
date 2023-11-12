import USerModel from "../models/user.model.js";
import ProductModel from '../models/product.model.js';
export default class USerController{
    getRegister(req,res){
        res.render('register')
    }
    getlogin(req,res){
        res.render('login',{errorMessage:null});
    }
    postRegister(req,res){
        const{name,email,password}=req.body;
        USerModel.add(name,email,password);
        res.render('login',{errorMessage:null});
     
    }

    postLogin(req,res){
      const {email,password}=req.body;
     const user= USerModel.isValiduser(email,password);

     if(!user){
         return res.render('login',{errorMessage:'Invalid credenctials'})
     }

     req.session.userEmail=email;
     let products=ProductModel.get(); 
     return res.render("products",{products,userEmail:req.session.userEmail});
     
    }
    logout(req,res){
        //on log out we have to destroy the secssion
        req.session.destroy(err=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/login');
            }
        });
        res.clearCookie('lastVisit');
    }
}