export default class USerModel{
    constructor(id,name,email,password){
        this.id=id;
        this.name=name;
        this.email=email;
        this.password=password;
    }

    static add(name,email,password){
        const newUser=new USerModel(
            users.length+1,
            name,
            email,
            password
            );
            users.push(newUser);
            console.log(users);
    }

    static isValiduser(email,password){
       const result= users.find((users)=> users.email==email && users.password==password);
          return result;
         }
    
}

var users=[];;