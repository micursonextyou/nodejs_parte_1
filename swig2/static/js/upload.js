$(function() {
    var socket = io();
    socket.on('addImagen', function(imagen) {
        $('#imagenes').append('<img src = "' + imagen + '" class="img-thumbnail" >');

    });
    $('#file').on('change', function(e) {
        const file = e.originalEvent.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            socket.emit('upload', e.target.result);
        }
        reader.readAsDataURL(file);
    });

})