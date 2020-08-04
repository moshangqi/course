const http = require('http');
const server = http.createServer(function (req, res) {
    //console.log(req.url);
    if (req.url === '/login') {
        res.end('{ll: 22}');
    }
    if (req.url === '/api/login') {
        res.end('{ll: 333}');
    }
});
server.listen(8080, function () {
    //console.log('listen to 8080');
});