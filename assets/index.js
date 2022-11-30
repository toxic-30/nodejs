$("#addresult").submit(function(event){
    alert("data inserted successfully")
    })
    
    $('#updateresult').on('submit',function(event){
        event.preventDefault();
        var unindexed_array=$(this).serializeArray();
        var data={}
        $.map(unindexed_array,function(n,i){
            data[n['name']]=n['value']
        })
        console.log(data.RollNo)
        var request={
            "url":`http://localhost:4800/details/${data.RollNo}`,
            "method":"PUT",
            "data":data
        }
    
        $.ajax(request).done(function(response){
            alert("data updated successfully")
        })
    
        
    })
    if(window.location.pathname=="/display"){
           $ondelete=$('td #unique')
           $ondelete.click(function(){
           var RollNo=$(this).attr("data-id")
           console.log(RollNo)
           var request={
            "url":`http://localhost:4800/details/${RollNo}`,
            "method":"DELETE"
           }
    
            if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("data deleted successfully")
                location.reload();
            })
           }
       })
       
    }
    
    