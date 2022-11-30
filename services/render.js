const axios=require("axios");

exports.homeRoutes=(req,res)=>{
    res.render('home');
}
exports.addresult=(req,res)=>{
    res.render('addresult');
}

exports.updateresult=(req,res)=>{
    var RollNo=req.query.RollNo
    axios.get(`http://localhost:4800/details/${RollNo}`)
    .then(function(userdata){
     console.log(userdata)
     res.render("updateresult",{studentResult:userdata.data[0]});
    })
    .catch(err=>{
        res.send(err);
    })
    
}
exports.login=(req,res)=>{
    
    res.render('login');
}


exports.displayresult=(req,res)=>{

    axios.get('http://localhost:4800/details')
    .then(function(response){
    console.log(response)
    res.render('displayresult',{studentResult:response.data});
    })
    .catch(err=>{
        res.send(err)
    })
}
exports.checkresult=(req,res)=>{
    res.render('checkresult')
}
exports.yourresult=(req,res)=>{
    var RollNo=req.query.RollNo;
    console.log(RollNo)
    axios.get(`http://localhost:4800/details/${RollNo}`)
    .then(function(userdata){
     console.log(userdata.data[0]==null)
     if(userdata.data[0]==null){
         res.redirect('checkresult')
         alert("RollNo is wrong")
     }
     else{
     res.render('yourresult',{studentResult:userdata.data[0]});}
    })
    .catch(err=>{
        res.send(err);
    })
}