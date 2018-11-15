function validate(message,name,email,phno){
    if(name=="" || email=="" || phno=="")
    {
        $(message).text("All fields are required");
        return false;
    }
    else if(name.length<6) {
        $(message).text("name should contain atleast 6 characters");
        return false;
    }
    else if(email.indexOf('@')<6||email.lastIndexOf('.')<email.indexOf('@'))
    {
        $(message).text("Enter the correct email");
        return false;
    }
    else if(phno.length!=10) {
        $(message).text("Phone number invalid");
        return false;
    }
    else {
        return true;
    }      
}
function emailIdNotPresent(mail,temp) {
    var flag=0;
        $.each( jasonarray, function( key, value ) {
        if(temp!=key) {
         $.each(value,function(key1,value1){
             
             if(value.email==mail){
               flag=1;
             }
         });
        }
        });

    if(flag==0) {
        return true;
    }
    return false;
}
function createTable(jasonarray1) {
    var text=null;  
    text="<table class='mytable' style='border:1px solid black;'>";
    text=text+"<tr>"
    $.each( jasonarray1, function( key, value ) { 
        $.each(value,function(key1,value1){
      text=text+"<th>"+ key1+"</th>";
        });
        return false;                  
    }); 
    text=text+"</tr>"
    $.each( jasonarray1, function( key, value ) {
        text=text+"<tr id='"+key+"'>";
    $.each(value,function(key1,value1){
        if(key1=="username")
        text=text+"<td>" + value1 + "</td>";
        else if(key1=="email")
        text=text+"<td>" + value1 + "</td>";
        else if(key1=="phno")
        text=text+"<td>" + value1 + "</td>";
    });
    text=text+"<td><button class='searchusr' id='"+key+"' data-reveal-id='myModal' onclick='updateUser(this);'>Update</button></td>";
    text=text+"<td><button class='searchusr' id='"+key+"' onclick='deleteuser(this); viewEmployees();'>Delete</button></td>";
    text=text+"</tr>";
    });
    text=text+"</table>";
    return text;
}
function validate1(data){
    var name=data[0];
    var email=data[1];
    var phno=data[2];
    if(name=='')
                return false;
    else if(email.indexOf('@')<0 || email.indexOf('.')<0 || email.lastIndexOf('.')<email.indexOf('@') || email.lastIndexOf('.') >= (email.length-1))
                return false;
    else if(phno.length !=10 )
        return false;
    else{
        var flag=0;
        $.each( jasonarray, function( key, value ) {
        $.each(value,function(key1,value1){
        if(key1=="email" && value1==email){
        flag=1;
        }
        });
        });
        if(flag==1){
        return false;
        }
        else
        return true;
    }
    }
    function hideElement() {
     $('.val1').hide();
     $('.val2').hide();
     $('.searchTable').hide();
    }
    function insertSearchValues(text) {
        var temp={};
        var flag=0;
        $.each( jasonarray, function( key, value ) {
        flag=0;
        $.each(value,function(key1,value1){  
        if(value1.includes(text)){
          flag=1;
        }
        });
        if(flag==1)
        temp[key]=value;
        });
        return temp;
    }

