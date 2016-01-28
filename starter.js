var http = require('http');
var url = require('url');
var index = require('./index');
var fs = require('fs');

var server = http.createServer();

function control(request, response) {
    var vars = url.parse(request.url);
    console.log(vars.pathname);
    
    if(request.method === 'POST'){
        var requestBody = "";
        request.on('data', function(data){
            requestBody += data;
            
        });
        request.on('end', function(data){
             response.writeHead(200, {'Content-Type': 'text/html'});
        })
    }

    if (vars.pathname == "/index.html" || vars.pathname == "/") {

        response.writeHead(200, {
            'content-type': 'text/html'
        });
        index.render(request, response);

    } else if (vars.pathname.indexOf(".png") != -1) {
        response.writeHead(200, {
            'content-type': 'image/png'
        });
        var img = fs.readFileSync("." + vars.pathname);
        response.end(img, 'binary')
    } else {
        response.writeHead(404, {
            'content-type': 'text/html'
        });
        response.write("<html>The specified resource was not found</html>");
        response.end();
    }
}

server.on('request', control);
server.listen(8080);