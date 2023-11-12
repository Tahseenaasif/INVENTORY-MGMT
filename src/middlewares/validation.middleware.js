import { body,validationResult} from 'express-validator'
export const validateRequest=async (req,res,next)=>{
    //instead of this we will use the express valdator
   // const{name,price,imageUrl}=req.body;
    //    let errors=[];
    //    if(!name||name.trim()==''){
    //       errors.push("Name is reqiured");
    //    }
    //    if(!price || parseFloat(price)<1){
    //     errors.push("Price must be possetive value");
    //    }
    //     try{
    //       const validurl=new URL(imageUrl);
    //     }catch(err){
    //         errors.push("URL is invalid");
    //     } 
    // if(errors.length>0){
    //     return res.render('new-product',{errorMessage:errors[0]})
    // }

    
    //here's the code for the exress validator
     
     //1.setup the rules for the error's
     const rules=[
       body('name').notEmpty().withMessage("Name is required"),

       body('price').isFloat({gt:0}).withMessage("price should be a possetive value"),

        body('imageUrl')
        .custom((value,{req})=>{
          if(!req.file){
            throw new Error("Image is requires");
          }
            return true;
        }),
        

        
    ]
     //2.run rules
     await Promise.all(
        rules.map((rule) => rule.run(req))
     );

     //3.chechk if there is any error after runing the rules
  var validationErrors=validationResult(req);

   //4.if errors,return the error message

        if(!validationErrors.isEmpty()){
            return res.render('new-product',{errorMessage:validationErrors.array()[0].msg})
        }

        next();
}

export default validateRequest