import ProductModel from '../models/product.model.js';
import path from 'path';
import fs from 'fs/promises';
export default class ProductController{
    getProducts(req,res){
       // console.log(path.resolve());
      let products=ProductModel.get(); 
       //console.log(products);
      return res.render("products",{products,userEmail:req.session.userEmail})

    //    return  res.sendFile(path.join(path.resolve(),'src','views','products.html'))
    }
    getAddForm(req,res){
     return res.render("new-product",{errorMessage:null,userEmail:req.session.userEmail});
    }

    addnewproduct(req,res,next){
        //acces data from dorm
      console.log("this is the add product",req.body);
      const{name,desc,price}=req.body;
      const imageUrl="images/"+req.file.filename;
      console.log("add product imageUlr",imageUrl);
        ProductModel.add(name,desc,price,imageUrl);
       let products=ProductModel.get();
         return res.render("products",{products,userEmail:req.session.userEmail})
    }

    getUpdateProductView(req,res,next){
        const  id =req.params.id;
        const productsFound=ProductModel.getById(id);
       
        if(productsFound){
            res.render('update-product',{product:productsFound,errorMessage:null,userEmail:req.session.userEmail});
        }else{
            return res.status(401).send('Product not fount ');
        }
    }

      postUpdateProduct(req,res){
        const{id,name,desc,price}=req.body;
        // let imageUrl;
        //   try{
        //     imageUrl="images/"+req.file.filename;
        //   }catch{
        //        console.log("the image is left the blank")
        //   }
        
        let imageUrl="images/"+req.file.filename;
        console.log("the image url",imageUrl)
        ProductModel.update(id,name,desc,price,imageUrl);
         let products=ProductModel.get();
        //console.log("this is the data whcic we nedd to update",req.body);
       // console.log("this is the updated product",products)
        return res.render("products",{products,userEmail:req.session.userEmail})
    }

  
     deleteProduct(req, res){
      const id = req.params.id;
      const productsFound = ProductModel.getById(id);
       console.log("this is what the project found",productsFound);
      if (!productsFound) {
          return res.status(404).send('Product not found');
      }

      ProductModel.delete(id);
      console.log("this is the products after deleting",ProductModel.get());
     // const product1 = ProductModel.get();
     
      return res.render('products', { products:ProductModel.get(),userEmail:req.session.userEmail});
  }
    
}

