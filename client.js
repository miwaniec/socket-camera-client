const serverUrl = 'http://localhost:3000';

const socket = io(serverUrl);

socket.on('connect', function() {

    socket.emit('subscribeCameraList');

});

socket.on('cameraList', function(data) {

    if(data.length > 0 ) {
        $('#cameras').text('Cameras: ');
        data.forEach(function(c) {
            $('#cameras').append( $('<button/>').text(c) );
        });
    } else {
        $('#cameras').text('No connected cameras');
    }

});

socket.on('snapshot', function(data) {

    $('#snapshot').html( data.camera + ' at '+ new Date() +'<br /><img src="'+ data.image +'" />');

});

socket.on('disconnect', function() {

    alert('socket disconnected');

});

$(document).ready(function() {

    $('#cameras').on('click', 'button', function() {
        socket.emit('getSnapshot', $(this).text(), function(a) {
            if( !a ) {
                alert('connection error');
            }
        });
    });

});