function gettext() {
    fetch('https://painhost99.herokuapp.com/random/otp' ,{
            headers: {
                "Authorization": localStorage.getItem('token')
            },
            })
    .then((res) => res.json())
    .then((data) => {
        // console.log(data)
    });
}
function myFunction() {
    
  }
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
                    }
                getLocation();


                $(document).ready(function () {
                    ca = true;
                    let locationflag=1;
                    $('.submit').click(function (e) {
                        e.preventDefault();
                        if (
                            form.event_name.value == "" ||
                            form.ending_time_delta.value == "" ||
                            form.location_range.value == "" ||
                            form.otp.value == "") {
                            message.innerHTML = 'All fields are required'
                            ca = false;
                        }
                        if(form.startevent==0) {
                            locationflag=0;
                        }
                        var errcheck = 0;
                        let formData = new FormData(form);
                        var object = {};
                        formData.forEach(function (value, key) {
                            object[key] = value;
                        });
                        object["latitude"] = latitude;
                        object["longitude"] = longitude;
                        // console.log(object)
                        var checkBox1 = document.getElementById("checkbox1");
                        var checkBox2 = document.getElementById("checkbox2")
                        if (checkBox1.checked == true){
                            object["start_event"] = 1;
                        } 
                        else{
                            object["start_event"] = 0;
                        }
                        if (checkBox2.checked == true){
                            object["broadcast_choice"] = 1;
                        }
                        else{
                            object["broadcast_choice"] = 0;
                        }
                        if (ca) {
                            fetch('https://painhost99.herokuapp.com/event/set', {
                                method: 'POST',
                                crossDomain: true,
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": localStorage.getItem('token')
                                },
                                body: JSON.stringify(object)
                            })
                                .then(function (response) {
                                    // console.log(response.status);   // Will show you the status
                                    if (!response.ok) {
                                        if (response.status == 500) {
                                            errcheck = 1;
                                            throw new Error("HTTP status " + response.status);
                                        }
                                        else if (response.status == 401) {
                                            errcheck = 2;
                                            throw new Error("HTTP status " + response.status);
                                        }
                                        else if (response.status == 406) {
                                            errcheck = 3;
                                            throw new Error("HTTP status " + response.status);
                                        }
                                        else if (response.status == 400) {
                                            errcheck = 4;
                                            throw new Error("HTTP status " + response.status);
                                        }
                                    } return response.json();
                                })
                                .then(
                                    success => {
                                        // console.log(success)
                                        document.getElementById('message').innerHTML = 'Event created'
                                        document.getElementById('message').style.color = "green"
                                        if(locationflag==0){
                                        // location.href="../Admin/Createdevents.html"
                                        }
                                        else{
                                            location.href="../Admin/admindashboard.html"
                                        }
                                    }
                                )
                                .catch(
                                    error => {
                                        if (errcheck == 1) {
                                            document.getElementById('message').innerHTML = 'Server Error'
                                            document.getElementById('message').style.color = "red"
                                        }
                                        else if (errcheck == 2) {
                                            document.getElementById('message').innerHTML = 'YOU ARE UNAUTHORIZED'
                                            document.getElementById('message').style.color = "red"
                                        }
                                        else if (errcheck == 3) {
                                            document.getElementById('message').innerHTML = 'OTP size constraint '
                                            document.getElementById('message').style.color = "red"
                                        }
                                        else if (errcheck == 4) {
                                            document.getElementById('message').innerHTML = 'OTP already used'
                                            document.getElementById('message').style.color = "red"
                                        }
                                    }
                                );
                        }
                    })
                })