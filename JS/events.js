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
        <div class="row" style="width:87vw; margin: auto auto;">
          <div class="col-sm" >


            
            <div class="carder">
              
              <h2>${data[i].event_name}</h2>
              
              <h5>OTP:${data[i].otp}</h5>
              <h5>${data[i].creation_date}</h5>
              <div class="buttons">
              <button onclick="update('${data[i].otp}')"; style="color:white;background-color: #2F54EB;">Update</button>
              <button onclick="download('000006')";>Download</button></div>
              </div>




          </div>
          <div class="col-sm">


            <div class="carder">
              <h2>${data[i-1].event_name}</h2>
              
              <h5>OTP:${data[i-1].otp}</h5>
              <h5>${data[i-1].creation_date}</h5>
              <div class="buttons">
              <button onclick="update('${data[i-1].otp}')"; style="color:white;background-color: #2F54EB;">Update</button>
              <button onclick="download('000006')";>Download</button>
              </div>
              </div>




          </div>
        </div>
      </div>
`
        }  };
      document.getElementById("accordionExample").innerHTML = output;
    //   console.log(data.event_name[2]);
    console.log(data[0].event_name)
       });
      };
      gettext();


    //   
    //     let formData = new FormData(form);
     
    // formData.forEach(function (value, key) {
    //     object[key] = value;
    // });
    function update(otp){
      let formData = new FormData(form);
    var object = {};
    formData.forEach(function (value, key) {
        console.log(value)
        object[key] = value;
    });

        object["otp"] = otp;
        console.log(object);
        var email = object.email;
        fetch('https://painhost99.herokuapp.com/attendence/update/'+email,{
        method: 'POST',
        crossDomain: true,
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('token')
        },
        body: JSON.stringify(object)
    })
        .then(
            success => {
                console.log(success)    
                }); 
    }

    function download(otp) {
      console.log(otp);
    fetch('https://painhost99.herokuapp.com/download/'+otp ,{
            // headers: {
            //     // "Authorization": localStorage.getItem('token')
            // },
            })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}