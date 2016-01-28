var fs = require('fs');

module.exports = {
    moduleName: "Index",
    render: function (request, response) {
        fs.readFile('html/index.html', function (error, data) {
            var str = "" + data;
            data = str.replace("#{content}", "Dynamic Content");
            response.write(data);
            response.end();
        });

    }
}