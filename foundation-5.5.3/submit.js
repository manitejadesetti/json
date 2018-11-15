var jasonarray={};
var id;
window.onload=getStoredData();

function getStoredData() {
    var storedData = localStorage.getItem("storedData");
    id= localStorage.getItem("id");
    if(storedData != null) 
        jasonarray=JSON.parse(storedData);
    if(id==null)
         id=0;
    

}
$('.addEmp').click(function(){
    getStoredData();
    var jason={};
    var myForm = document.getElementById('addEmployeeForm');
    formData = new FormData(myForm);
    jason.username=formData.get('name');
    jason.email=formData.get('email');
    jason.phno=formData.get('phno');
    var name=formData.get('name');
    var email=formData.get('email');
    var phno=formData.get('phno');
    var message='.val1';
    $('.val1').show();
    //console.log(storedData);
    
    
    if(validate(message,name,email,phno)) { 
     if(emailIdNotPresent(email,"t")){
        $('.val1').text("Successfull");
        jasonarray[id]=jason;
        id++;
        localStorage.setItem("id",id);
        localStorage.setItem("storedData",JSON.stringify(jasonarray));
        console.log(JSON.stringify(jasonarray));
        
        }
        else     {
            $('.val1').text("user already exists");  
        }
        myForm.reset();
    }
    
    return false;
});

function viewEmployees() {
    getStoredData();
    if(Object.keys(jasonarray).length>0) {
        $(".viewTable").show();
        text=createTable(jasonarray);
        $(".viewTable").html(text); 
        $('.val3').hide();
    }
    else {
        $('.val3').show();
        $('.val3').text("no records found");
        $(".viewTable").hide();
    }
}

function deleteuser($this) {
    getStoredData();
    var tempid=$this.id;
    delete jasonarray[tempid];
    localStorage.setItem("storedData",JSON.stringify(jasonarray));
    console.log(JSON.stringify(jasonarray));

}
function updateUser($this) {
    getStoredData();
    var tempid=$this.id;
    var count1;
    $('#name1').val($(".mytable tr#"+tempid+" td:eq(0)").text());
    $('#email1').val($(".mytable tr#"+tempid+" td:eq(1)").text());
    $('#phno1').val($(".mytable tr#"+tempid+" td:eq(2)").text());
    $('#tempid').val(tempid);
    $('.mytable1').show();
    $('.val2').hide();
}

$('.clear').click(function(){
    var count=0;
    var tempid=$('#tempid').val();
    var myForm = document.getElementById('updateEmployeeForm');
    formData = new FormData(myForm);
    var name=formData.get('name1');
    var email=formData.get('email1');
    var phno=formData.get('phno1');
    var message='.val2';
    $('.val2').show(); 
   
   if(validate(message,name,email,phno)) {
       if(emailIdNotPresent(email,tempid)) {
            jasonarray[tempid].username=name;
            jasonarray[tempid].email=email;
            jasonarray[tempid].phno=phno;
            localStorage.setItem("storedData",JSON.stringify(jasonarray));
            console.log(JSON.stringify(jasonarray));
            myForm.reset();
            viewEmployees();
            $('.val2').text("Successfull");
            $('.mytable1').hide(); 
    }
    else     {
        $('.val2').text("user already exists");  
    }
    }
    return false;
});

function search(){
    getStoredData();
    var text=$('#searchtext').val().trim();
    if(text=='')
    {
    alert("Enter text to search");
    return;
    }
    temp=insertSearchValues(text);
    if(Object.keys(temp).length<=0)
    alert("nothing found");
    else{
        $(".searchTable").show();
        var text1=null;
        text1=createTable(temp);
        $(".searchTable").html(text1);
        $('.searchusr').click(function(){
           temp=insertSearchValues(text);
            if(Object.keys(temp).length<=0) {  
             $(".searchTable").hide();
            }
            else{
            $(".searchTable").html(createTable(temp));
            search();
            }
        });
         
    }
    }
    
   
