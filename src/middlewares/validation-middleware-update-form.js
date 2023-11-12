
import { body,validationResult} from 'express-validator'
export const validateRequestupdatef=async (req,res,next)=>{
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
            console.log(req);
            return res.render('update-product',{errorMessage:validationErrors.array()[0].msg})
        }

        next();
}

export default validateRequestupdatef