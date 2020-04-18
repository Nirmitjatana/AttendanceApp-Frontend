function gettext() {
    fetch('https://painhost99.herokuapp.com/events/ongoing' ,{
            headers: {
                'Content-Type': 'application/json'
            },
            })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        localStorage.setItem('data',data);
        let output = '';
        let i;
        let j=Object.entries(data).length
      for(i=0;i<j;i++){
        output += `
          <div class="carder">   
              <h2>${Object.entries(data)[i][0]}</h2>
              <h5>${Object.entries(data)[i][1]}</h5>
              <div class="buttons">
              <button onclick="window.location.href = '../view/otpscreen.html';" style="color:white;background-color: #2F54EB;" class="userbutton">Mark Attendance</button>
              </div>
          </div>
`
      };
      document.getElementById("accordionExample").innerHTML = output;
      document.getElementById("loader").style.display = "none"
    //   console.log(output);
    });
 };
  gettext();