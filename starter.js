var http = require('http');
var url = require('url');
var index = require('./index');
var fs = require('fs');
var renderhtml =  require('./renderhtml');

var server = http.createServer();

function control(request, response) {
    var vars = url.parse(request.url);
    
    if(request.method === 'POST'){
        var requestBody = "";
        request.on('data', function(data){
            requestBody += data;
            
        });
        request.on('end', function(data){
             response.writeHead(200, {'content-type': 'text/html'});
        })
    }

    if (vars.pathname.indexOf(".html") != -1 || vars.pathname == "/") {
        console.log(vars.pathname);
        response.writeHead(200, {
            'content-type': 'text/html'
        });
        var path = vars.pathname.split("/");
        var file = path[path.length - 1];
        
        if(file == "index.html" || vars.pathname == "/")
            index.render(request, response);
        else
            renderhtml.render(request, response, file);

    } else if (vars.pathname.indexOf(".") != -1) { /* Images rendering */
        var path = vars.pathname.split(".");
        var extension = path[path.length - 1];
        response.writeHead(200, {
            'content-type': 'image/' + extension
        });
        var img = fs.readFileSync("." + vars.pathname);
        response.end(img, 'binary')
    } else {
        renderhtml.notFound(response);
    }
}

server.on('request', control);
server.listen(8080);