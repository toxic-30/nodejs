fetch('http://localhost:4800/details').then((data)=>{
    return data.json();
}).then((completedata)=>{
    console.log(completedata);
})
