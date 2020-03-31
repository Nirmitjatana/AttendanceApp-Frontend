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

$(document).ready(function() {
    var socket = io.connect('https://painhost99.herokuapp.com');
    var socket_attendence = io('https://painhost99.herokuapp.com/attendence_namespace')
    var socket_admin = io('https://painhost99.herokuapp.com/admin_namespace')
    var socket_rooms = io('https://painhost99.herokuapp.com/rooms_namespace')
        $('#attendence_button').on('click', function() {
            socket_attendence.emit('attendence_request', {'otp':$('#myMessage').val(), 'token':localStorage.getItem('token'), 'latitude':latitude, 'longitude':longitude});
            $('#myMessage').val('');
        });
        socket_attendence.on('attendence_result', function(res) {
            var obj = JSON.parse(res);
            console.log(obj)
            console.log(obj.Status)
            document.getElementById("messages").innerHTML=(`<div>
            <p>${obj.Reason}</p>
            </div>`)
	    });
        socket_admin.on('admin_listen', function(res) {
            var obj = JSON.parse(res);
            document.getElementById("messages").innerHTML=(`<div>
            <p>${obj.Reason}</p>
            </div>`)
		// $("#messages").append('<li>'+json+'</li>');
        // $("#messages").append('<li>'+'upper one recived for admin_namespace'+'</li>');
        // Check if it's allowed to broadcast to rooms, if not then don't emit below to room socket else do emit
        socket_rooms.emit('join', res);
		// console.log('Received message on admin_namespace');
    });
    
    




    socket_rooms.on('join_room', function(msg) {
        console.log(msg);
        $("#messages").append(
            `<div>
                <p>${msg}</p>
            </div>`
        );
    });
    socket_rooms.on('leave_room', function(msg) {
        console.log(json);
        $("#messages").append(
            `<div>
                <p>${msg}</p>
            </div>`
        );
    });
});