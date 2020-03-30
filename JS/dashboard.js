console.log(localStorage.getItem('token'))
    function gettext() {
                fetch('https://painhost99.herokuapp.com/events/info' ,{
                        headers: {
                            "Authorization": localStorage.getItem('token')
                        },
                        })
                .then((res) => res.json())
                .then((data) => {
                    let output=''
                    output+=`<p>Admin: ${data[0].admin_email}</p>
                            `
                    document.getElementById('adminshow').innerHTML = output;
                    document.getElementById("loader").style.display = "none"
                    document.getElementById("buttons").style.display = "table"
                })
    }
    gettext();
    $(window).load(function() {
		// Animate loader off screen
		$(".se-pre-con").fadeOut("slow");;
	});