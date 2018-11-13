var jasonarray=[];

    $('input[type="submit"]').click(function(){
        var jason={};
        // jason=JSON.stringify($('form').serializeObject());
        jason.username=$('#name').val();
        jason.email=$('#email').val();
        jason.phno=$("#phno").val();
        jasonarray.push(jason);
        
        console.log(JSON.stringify(jasonarray));
        return false;
    });

    function uploadcsv(){
        var file=document.getElementById("file").value;
        var type=file.substr(file.lastIndexOf(".")+1);
        var filename=file.substr(file.lastIndexOf("\\")+1);
        alert(filename);
        if(type!="csv"){
            alert("select only csv files");
            return;
        }
        else
        {
            $.ajax({
    type: "GET",
    url: filename,
    dataType: "text",
    success: function(data) {processData(data);},
            error :function(){
                alert("something went wrong");
            }
       });
        }
    }

    function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
        var lines = [];
    for (var i=1; i<allTextLines.length-1; i++) {
    var data = allTextLines[i].split(',');
    if (data.length == headers.length) {

        var tarr = {};
        for (var j=0; j<headers.length; j++) {
        tarr[headers[j]]=data[j];
        }
    lines.push(tarr);
    }
    else{
        alert("not a valid csv file");
        return;
    }
}
    for(i=0;i<lines.length;i++)
        jasonarray.push(lines[i]);
console.log(JSON.stringify(jasonarray));
    }

    function getData(){
        var newHTML=[];
        jasonarray.forEach(function(arrayitem){
            newHTML.push('<br>');
            $.each( arrayitem, function( key, value ) {
               newHTML.push('<span>' + key+":"+value + '</span>');
               
        });
        });
        
        JSONToCSVConvertor(jasonarray,"employee");
        return false;
    }
function JSONToCSVConvertor(JSONData, ReportTitle) {
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    var CSV = '';
     CSV += ReportTitle + '\r\n\n';
        var row = "";
  for (var index in arrData[0]) {
row += index + ',';
}
row = row.slice(0, -1);
CSV += row + '\r\n';
    for (var i = 0; i < arrData.length; i++) {
var row = "";
for (var index in arrData[i]) {
row += '"' + arrData[i][index] + '",';
    }
row.slice(0, row.length - 1);
CSV += row + '\r\n';
    }
    if (CSV == '') { 
    alert("Invalid data");
    return;
    } 
    var fileName = "MyReport_";
    fileName += ReportTitle.replace(/ /g,"_");
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    /*window.open(uri);*/
     var link = document.createElement("a"); 
     link.href = uri;
     link.style = "visibility:hidden";
     link.download = fileName + ".csv";
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
}