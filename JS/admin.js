if ('serviceWorker' in  navigator){
    window.addEventListener('load',()=>{
        navigator.serviceWorker
        .register('../sw.js')
        .then(reg => console.log('registered'))
        .catch(err => console.log(err))
    })
}
     let checkflag=1;
$(document).ready(function () {
    
            ca=false;
            $('.login').click(function (e) {
                
                e.preventDefault();
                if (form.password.value == "" ||
                    form.email.value == "") {
                    message.innerHTML = 'All fields are required'
                    ca = false;
                } 
                else {
                    ca = true;
                }
                var errcheck=0;
                let formData = new FormData(form);
                var object = {};
                formData.forEach(function (value, key) {
                    // console.log(value)
                    object[key] = value;
                });
                object["g-recaptcha-response"]=localStorage.getItem("captcha");
                // console.log(JSON.stringify(object))
                if (ca) {
                    fetch('https://painhost99.herokuapp.com/admin/login', {
                        method: 'POST',
                        crossDomain: true,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(object)
                        
                    })
                    .then(function(response) {
                        console.log(response.status);   // Will show you the status
                         if (!response.ok) {
                             checkflag=1;
                             if(response.status==404){
                                 errcheck=1;
                                 document.getElementById("container").style.display="table"
                            document.getElementById("loader").style.display="none"
                             throw new Error("HTTP status " + response.status);
                            
                            }
                            else if(response.status==401){
                                errcheck=2;
                            document.getElementById("container").style.display="table"
                            document.getElementById("loader").style.display="none"
                             throw new Error("HTTP status " + response.status);
                            
                            }
                            else if(response.status==403){
                                errcheck=3;
                            document.getElementById("container").style.display="table"
                            document.getElementById("loader").style.display="none"
                             throw new Error("HTTP status " + response.status);
                            
                            }
                            
                            }return response.json();})
                            .then(
                            success => {
                            console.log(success)
                            // console.log(success.auth_token)
                            localStorage.setItem('token',success.auth_token);
                            // console.log(localStorage.getItem('token'))
                            if(success.admin_status == true){
                                location.href="./Admin/admindashboard.html"
                            }
                            }
                            ).catch(
                            error => {
                            if(errcheck==1){
                            document.getElementById('message').innerHTML = 'User does not exist'
                            document.getElementById('message').style.color = "red"
                            for (let elem of $("#form")) {
                                elem.reset()
                }
                            }
                            else if(errcheck==2){
                            document.getElementById('message').innerHTML = 'Incorrect Email/Password'
                            document.getElementById('message').style.color = "red"
                            
                            for (let elem of $("#form")) {
                                elem.reset()
                }}
                            else if(errcheck==2){
                                document.getElementById('message').innerHTML = 'Forbidden'
                                document.getElementById('message').style.color = "red"
                                
                                for (let elem of $("#form")) {
                                    elem.reset()
                    }}
                            console.log(error)
                        }
                    );
                }
            })
        })
        function loader(){
            document.getElementById("container").style.display="none"
            document.getElementById("loader").style.display="table"
        }