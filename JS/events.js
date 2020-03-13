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
      for(i=j-1;i>-1;i--){
        output += `<div style="background-color: rgb(221, 221, 221);">
<p>
Event-name:${data[i].event_name}<br>
Event-description:${data[i].event_description}<br>
OTP:${data[i].otp}<br>
Date and Time:${data[i].creation_date}<br>

</p>
<button onclick="update('${data[i].otp}')";>Update</button>
<button onclick="download('000006')";>Download</button><br>
</div>
`
      };
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