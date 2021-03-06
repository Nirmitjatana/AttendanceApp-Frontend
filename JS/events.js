function clicked(otp){
  localStorage.setItem('OTP',otp);
  console.log(localStorage.getItem("OTP"))
}
document.getElementById("update").addEventListener("click", function(event){
  event.preventDefault()
});
function button(){
  function update(otp){
    let formData = new FormData(form);
    var object = {};
    id="message_"+otp;
    console.log(id)
    formData.forEach(function (value, key) {
        console.log(value)
        object[key] = value;
    });
        object["otp"] = otp;
        console.log(object);
        var email = object.email;
        if(object.email==""){
          document.getElementById(id).innerHTML="Enter email"
        }
        fetch('https://painhost99.herokuapp.com/attendence/update/'+email,{
        
        method: 'POST',
        crossDomain: true,
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('token')
        },
        body: JSON.stringify(object)
    })
    .then(function(response) {
      // console.log(response.status);   // Will show you the status
       if (!response.ok) {
           if(response.status==404){
           document.getElementById("message").innerHTML = 'User does not exist'
           document.getElementById("message").style.color = "red"
          } 
          }
          else{
            document.getElementById("message").innerHTML = 'Attendance marked'
           document.getElementById("message").style.color = "green"
          }
          return response.json();})
          .then(
          success => {
          console.log(success)
          }
          ).catch(
          error => {
          console.log(error)
      });  
      
    }
    let v=localStorage.getItem('OTP');
    console.log(v)
    update(v);
    
}
function gettext() {
    fetch('https://painhost99.herokuapp.com/events/info' ,{
            headers: {
                "Authorization": localStorage.getItem('token')
            },
            })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let output = '';
      let i=0;
      let j=data.length;
      for(i=j-1;i>-1;i=i-2){
          if(i>1){
        output += `        
        <div class="container">
        <div class="row" style="width:87vw; margin: 10px auto;">
          <div class="col-sm" >
            <div class="carder">
              <h2>${data[i].event_name}</h2>
              <h5>OTP:${data[i].otp}</h5>
              <h5>${data[i].creation_date.slice(0,10)}</h5>
              
              <div class="buttons">
              <button data-toggle="modal" data-target="#myModal" style="color:white;background-color: #2F54EB;" onclick="clicked('${data[i].otp}');">Update</button>
              <button onclick="download('${data[i].otp}')";>Download</button></div>
              </div>
              
            </div>
          <div class="col-sm">
            <div class="carder">
              <h2>${data[i-1].event_name}</h2>
              <h5>OTP:${data[i-1].otp}</h5>
              <h5>${data[i-1].creation_date.slice(0,10)}</h5>
              
              <div class="buttons">
              <button data-toggle="modal" data-target="#myModal" style="color:white;background-color: #2F54EB;" onclick="clicked('${data[i-1].otp}');">Update</button>
              <button onclick="download('${data[i-1].otp}')";>Download</button>
              </div>
              </div>
              </div>
            </div>
          </div>
`
        }  };
      document.getElementById("accordionExample").innerHTML = output;
      document.getElementById("loader").style.display = "none"
    //   console.log(data.event_name[2]);
    // console.log(data[0].event_name)
       });
      };
      gettext();


    //   
    //     let formData = new FormData(form);
     
    // formData.forEach(function (value, key) {
    //     object[key] = value;
    // });
 
    function download(otp) {
      // console.log(otp);
    fetch('https://painhost99.herokuapp.com/download/'+otp ,{
            headers: {
                'Content-Type': 'text/csv',
                'Authorization': localStorage.getItem("token")
            },
            })
    .then((res) => res.text())
    .then((data) => {
      
      // function csv2array(data, delimeter) {
      //   // Retrieve the delimeter
      //   if (delimeter == undefined) 
      //     delimeter = ',';
      //   if (delimeter && delimeter.length > 1)
      //     delimeter = ',';
      
      //   // initialize variables
      //   var newline = '\n';
      //   var eof = '';
      //   var i = 0;
      //   var c = data.charAt(i);
      //   var row = 0;
      //   var col = 0;
      //   var array = new Array();
      
      //   while (c != eof) {
      //     // skip whitespaces
      //     while (c == ' ' || c == '\t' || c == '\r') {
      //       c = data.charAt(++i); // read next char
      //     }
          
      //     // get value
      //     var value = "";
      //     if (c == '\"') {
      //       // value enclosed by double-quotes
      //       c = data.charAt(++i);
            
      //       do {
      //         if (c != '\"') {
      //           // read a regular character and go to the next character
      //           value += c;
      //           c = data.charAt(++i);
      //         }
              
      //         if (c == '\"') {
      //           // check for escaped double-quote
      //           var cnext = data.charAt(i+1);
      //           if (cnext == '\"') {
      //             // this is an escaped double-quote. 
      //             // Add a double-quote to the value, and move two characters ahead.
      //             value += '\"';
      //             i += 2;
      //             c = data.charAt(i);
      //           }
      //         }
      //       }
      //       while (c != eof && c != '\"');
            
      //       if (c == eof) {
      //         throw "Unexpected end of data, double-quote expected";
      //       }
      
      //       c = data.charAt(++i);
      //     }
      //     else {
      //       // value without quotes
      //       while (c != eof && c != delimeter && c!= newline && c != ' ' && c != '\t' && c != '\r') {
      //         value += c;
      //         c = data.charAt(++i);
      //       }
      //     }
      
      //     // add the value to the array
      //     if (array.length <= row) 
      //       array.push(new Array());
      //     array[row].push(value);
          
      //     // skip whitespaces
      //     while (c == ' ' || c == '\t' || c == '\r') {
      //       c = data.charAt(++i);
      //     }
      
      //     // go to the next row or column
      //     if (c == delimeter) {
      //       // to the next column
      //       col++;
      //     }
      //     else if (c == newline) {
      //       // to the next row
      //       col = 0;
      //       row++;
      //     }
      //     else if (c != eof) {
      //       // unexpected character
      //       throw "Delimiter expected after character " + i;
      //     }
          
      //     // go to the next character
      //     c = data.charAt(++i);
      //   }  
        
      //   return array;
      // }


      // csv2array(data1);
      // function downloadCsv() {
      //   var blob = new Blob([csvString]);
      //   if (window.navigator.msSaveOrOpenBlob){
      //     window.navigator.msSaveBlob(blob, "filename.csv");
      //   }
      //   else {
      //     var a = window.document.createElement("a");
      
      //     a.href = window.URL.createObjectURL(blob, {
      //       type: "text/plain"
      //     });
      //     a.download = "filename.csv";
      //     document.body.appendChild(a);
      //     a.click();
      //     document.body.removeChild(a);
      //   }
      // }
      
      // downloadCsv(data1);




      // console.log(data)

      var monthArray = data.split("\n");

//split each selected month into [year, month] array
          var monthArray2d = new Array();
          for (var i = 0; i < monthArray.length; i++) {
              monthArray2d[i] = monthArray[i].split(",");}


            // console.log(monthArray2d)


      // var ar = data.split(',');
      // console.log(ar)
      function download_csv() {
      var csv = '';
      monthArray2d.forEach(function(row) {
                csv += row.join(',');
                csv += "\n";
        });
        // console.log(csv);
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'Attendance.csv';
        hiddenElement.click();
    }
    download_csv();
    });
  }