
import express  from "express";
import ProductController  from "./src/controllers/product.controller.js";
import UserController from './src/controllers/user.controller.js';
import path from "path";
import ejsLayouts from 'express-ejs-layouts';
import validateRequestfrom from'./src/middlewares/validation.middleware.js'
import validateRequestupdatef  from'./src/middlewares/validation-middleware-update-form.js'
import { uploadFile } from "./src/middlewares/file-upload.middleware.js";
import session from "express-session";
import {auth} from "./src/middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";
import {setLastVisit} from "./src/middlewares/lastVisit.middleware.js";
const server = express();

//as the data is coming in ecoded form so that's why we need to decode it or parse it to unserstable form .

server.use(express.urlencoded({extended:true}));
server.use(express.static('public'));

server.use(cookieParser());
//server.use(setLastVisit)
server.use(session({
    secret:'SecretKey',
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false},

}));


//setup view engine settings
server.set("view engine","ejs");
server.set("views",path.join(path.resolve(),'src','views'))

server.use(ejsLayouts);

//create an instacnce of product comtroller
const productcontroller=new ProductController();
const userController=new UserController();
server.get("/",
setLastVisit,
auth,
productcontroller.getProducts);
server.get('/register',userController.getRegister);
server.post('/register',userController.postRegister);
server.get('/login',userController.getlogin);
server.post('/login',userController.postLogin);
server.get('/logout',userController.logout);
server.get("/new",auth,productcontroller.getAddForm);
server.post('/',
auth,
uploadFile.single('imageUrl'),
validateRequestfrom,
productcontroller.addnewproduct);

server.get("/update-product/:id",
auth,
productcontroller.getUpdateProductView);

server.post("/update-product",
auth,
uploadFile.single('imageUrl'),
productcontroller.postUpdateProduct)

server.post('/delete-product/:id',
auth,
productcontroller.deleteProduct)

server.use(express.static('src/views'));

server.listen(3400,()=>{
    console.log("server is listining at 3400");
});  