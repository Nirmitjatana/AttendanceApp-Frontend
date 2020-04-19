$(document).ready(function () {
    console.log(localStorage.getItem('token'))
        ca=false;
        ce=true;
        link=''
        $('.login').click(function (e) {
            console.log('nirmit');
            e.preventDefault();
            if (form.password.value == "" ||
                form.email.value == ""||
                form.name.value =="") {
                message.innerHTML = 'All fields are required'
                ca = false;
            } else {
                ca = true;
                console.log('nirmit');
            }
            var errcheck=0;
            let formData = new FormData(form);
            var object = {};
            formData.forEach(function (value, key) {
                console.log(value)
                object[key] = value;
            });
            object["g-recaptcha-response"]=localStorage.getItem("captcha");
            // console.log(JSON.stringify(object))
            // console.log(ca,ce);
            if (ca & ce) {

                
                fetch('https://painhost99.herokuapp.com/admin/signup', {
                    
                    method: 'POST',
                    crossDomain: true,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(object)
                })
                .then(function(response) {
                    // console.log("nirmit");
                    // console.log(response.status);
                     // Will show you the status
                         if(response.status==208){
                             errcheck=1;
                         throw new Error("HTTP status " + response.status);
                         
                        }
                        else if(response.status==500){
                            errcheck=2;
                         throw new Error("HTTP status " + response.status);
                        }
                        return response.json();
                        })
                        .then(
                    success => {
                        document.getElementById('message').innerHTML = 'Admin account Created'
                        document.getElementById('message').style.color = "green"
                        console.log(success)
                        console.log(localStorage.getItem('token'))
                        for (let elem of $("#form")) {
                        elem.reset()
                        }
                        location.href="../Admin/adminotp.html"
                    }
                ).catch(
                    error => {
                        if(errcheck==1){
                        document.getElementById('message').innerHTML = 'User already exist'
                        document.getElementById('message').style.color = "red"
                        for (let elem of $("#form")) {
                            elem.reset()
            }
                        }
                        else if(errcheck==2){
                        document.getElementById('message').innerHTML = 'Server Error'
                        document.getElementById('message').style.color = "red"
                        }
                        for (let elem of $("#form")) {
                            elem.reset()
            }
                        console.log(error)
                    }
                );
            }
        })
    })