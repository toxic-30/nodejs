
const con = require("../config");

//insert a result
exports.create=(req,res)=>{

  //validate a request
  if(!req.body){
      res.status(400).send({message:"Content cannot be empty!"});
      return;
  }

  //new user
  else{
    let stud=req.body
    var sql="SET @RollNo=?;SET @Name=?;SET @Date=?;SET @Score=?;\
    CALL StudentResultAddOrEdit(@RollNo,@Name,@Date,@Score);";
    console.log(sql);
    con.query(sql,[stud.RollNo,stud.Name,stud.Date,stud.Score],(err,rows,fields)=>{
      if(err) {
        res.status(500).send({message:"Some error occured in create function"});
        return;
      }
      else{
          //res.send(rows);
          res.redirect('display')
      }
    })
}
}

//Read result of all student
exports.read=(req,res)=>{
  if(req.query.RollNo){
    const RollNo=req.query.RollNo;
    con.query('Select * from studentResult where RollNo=?',RollNo,(err,rows,fields)=>{
      if(err) {
        res.status(404).send({message:"Not found result with rollno "+RollNo})
      }
      else{
          res.send(rows);
      }
    })

  }
  else{
  con.query('Select * from studentResult',(err,rows,fields)=>{
    if(err) {
      res.status(500).send({message:"Error occured while retrieving user information"});
      return;
    }
    else{
        res.send(rows);
    }
  })
}
}


//delete result of a student
exports.delete=(req,res)=>{
  if(!req.body){
    res.status(400).send({message:"Data to delete cannot be empty!"});
    return;
   }
  con.query('DELETE from studentResult where RollNo=?',[req.params.RollNo],(err,rows,fields)=>{
    if(err) {
      res.status(500).send({message:"Some error occured in delete function"});
      return;
    }
    else{
        res.send(rows);
    }
  })
}

//edit result of a student by RollNo 
exports.edit=(req,res)=>{
    //validate a request
  if(!req.body){
    res.status(400).send({message:"Data to update cannot be empty!"});
    return;
   }

    let stud=req.body
    var sql="SET @RollNo=?;SET @Name=?;SET @Date=?;SET @Score=?;\
    CALL StudentResultAddOrEdit(@RollNo,@Name,@Date,@Score);";
    con.query(sql,[stud.RollNo,stud.Name,stud.Date,stud.Score],(err,rows,fields)=>{
      if(err) {
        res.status(404).send({message:"Error occured while updating data maybe user no found."});
        return;
      }
      else{
            res.send('Updated Successfully');
      }
    })
    
}

//Find one result
exports.find=(req,res)=>{
    con.query('Select * from studentResult where RollNo=?',[req.params.RollNo],(err,rows,fields)=>{
      if(err) {
        res.status(404).send({message:"Not found result with rollno "+RollNo})
      }
      else{
          res.send(rows);
      }
    })
}


