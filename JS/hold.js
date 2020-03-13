function gettext() {
    fetch('https://painhost99.herokuapp.com/event/holded' ,{
            headers: {
                "Authorization": localStorage.getItem('token')
            },
            })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        localStorage.setItem('data',data);
      let output = '';
      let i;
      let j=data.length;
      for(i=0;i<j;i++){
        output += `
<div class="carder">
              
              <h2>${data[i].event_name}</h2>
              <h5>${data[i].event_description}</h5>
              <h5>OTP:${data[i].otp}</h5>
              
              <h5>${data[i].creation_date}</h5>
              <div class="buttons">
              <button onclick="update('${data[i].otp}')"; style="color:white;background-color: #2F54EB;">Start event</button>
              
              </div>




          </div>
`
      };
      document.getElementById("accordionExample").innerHTML = output;
    //   console.log(output);
    });
 };
  gettext();

  var latitude;
                var longitude;
                function getLocation() {
                    if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(showPosition);
                                } 
                            }
                function showPosition(position) {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                console.log(latitude);
                createobject();
                    }
                    getLocation();
                    var object = {};
                   function createobject(){
            object["latitude"] = latitude;
            object["longitude"] = longitude;
            object["start_event"] = 1;
             console.log(object);
            }
    var position;
    function startevent(object,otp){
    console.log(object); 
    fetch('https://painhost99.herokuapp.com/event/start/'+otp,{
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