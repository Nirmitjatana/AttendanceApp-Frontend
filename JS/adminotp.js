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
        socket_attendence.on('attendence_result', function(json) {
            console.log(json);
            console.log(json[20,25]);
        // $("#messages").append('<li>'+json+'</li>');
        // console.log(latitude,longitude)
		// console.log('Received message on attendence_namespace');
	    });
        socket_admin.on('admin_listen', function(json) {
            console.log(json);
            // console.log(json.email);
            // console.log(json.datetime);
            // console.log(json.Reason);
		$("#messages").append('<li>'+json+'</li>');
        // $("#messages").append('<li>'+'upper one recived for admin_namespace'+'</li>');
        // Check if it's allowed to broadcast to rooms, if not then don't emit below to room socket else do emit
        socket_rooms.emit('join', json);
		// console.log('Received message on admin_namespace');
	});
    socket_rooms.on('join_room', function(msg) {
        console.log(msg);
        $("#messages").append('<li>'+msgn+'</li>');
    });
    socket_rooms.on('leave_room', function(msg) {
        console.log(json);
    });
});