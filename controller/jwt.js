const { sign, verify } = require("jsonwebtoken");
const con = require("../config");
const bcrypt=require('bcryptjs');
/*const cookieParser = require("cookie-parser");
cookieParser();*/
const createTokens = (result) => {
console.log(result)
  const accessToken = sign(
    { username: result.username, id: result.id },
    "jwtsecretplschange"
  );

  return accessToken;
};

function validateToken(req, res, next) {
  const accessToken = req.cookies["access-token"];

  if (!accessToken)
    res.redirect('login')
    //return res.status(400).json({ error: "User not Authenticated!" });

  try {
    const validToken = verify(accessToken,"jwtsecretplschange");
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    //return res.status(400).json({ error: err });
    res.redirect('login')
  }
};

 function logins(req, res){

       const username=req.body.username;
       const password=req.body.password;
       console.log(username);
       let qr=`select * from login where username='${username}'`;
       if(username && password){
            con.query(qr,(err,result)=>{
            if(err){
                res.send({"status":"failed","message":"You are not a registered user"})
            }
            else{
              console.log(username);
                if(result[0]!=null){
                    //const isMatch= bcrypt.compare(password,result[0].password)
                    if((result[0].username===username) && result[0].password===password 
                    && result[0].auth_detail=='student'){
                        //generate jwt token// secret key direct likhi
                         //const token = jwt.sign({ID:result[0]._id},"dfgh7685qASDVNJJVH");
                         const accessToken = createTokens(result[0]);
  
                         res.cookie("access-token", accessToken, {
                         maxAge: 60 * 60 *60,
                         httpOnly: true,
                        });
        
                         res.redirect('checkresult')
                         //res.send({"status":"success","message":"login success","token":token})
                    }
                    else if((result[0].username===username) && result[0].password===password 
                    && result[0].auth_detail=='teacher'){
                        const accessToken = createTokens(result[0]);
  
                        res.cookie("access-token", accessToken, {
                        maxAge: 60 * 60 *60,
                        httpOnly: true,
                       });
       
                        res.redirect('display')
                    }
                    else{
                        //console.log("credentials don't match")
                        res.render('login')
                    }
                }
                else{
                    //res.send({"message":"not a registered user"})
                    res.render('login')
                }
            }
         })
       }
       else{
           //res.send({"message":"All fields are required"})
           res.render('login')
       }
  }
module.exports = { createTokens, validateToken,logins };