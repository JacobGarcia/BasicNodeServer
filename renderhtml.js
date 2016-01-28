var fs = require('fs');

/* Function explicit declarations */
var notFound = function (response){
        response.writeHead(404, {
            'content-type': 'text/html'
        });
        response.write("<html>The specified resource was not found</html>");
        response.end();
}

var render = function (request, response, file) {
        fs.readFile('html/' + file, function (error, data) {
            if (error)
                notFound(response);
            else {
                console.log('html/' + file);
                var str = "" + data;
                data = str.replace("#{content}", "Magic Content");
                response.write(data);
                response.end();
            }
        });
    }

/* Function exports */
module.exports = {
    moduleName: "File",
    render: render,
    notFound: notFound
}