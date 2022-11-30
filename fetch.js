const { response } = require('express');
const fetch=require('node-fetch');

let myBtn=document.getElementById("myBtn");
let content=document.getElementById("content");



function getData(){
    fetch("http://localhost:4800/details").then(()=>{
        return response.json();
    }).then((data)=>{
        console.log(data)
    })
}
 getData();