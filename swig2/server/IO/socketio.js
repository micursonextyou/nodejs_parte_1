module.exports = io => {
    io.on('connection', (socket) => {
        console.log("Nuevo Usuario Conectado");
        var line_history = [];
        socket.on('draw_lines', data => {

            line_history.push(data.line);
            io.emit('re_draw_lines', { line: data.line });

        });
    });
}