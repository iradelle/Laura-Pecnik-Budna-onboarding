const http = require("http");
const fs = require("fs");

const PORT = process.env.PORT || 3000;

const server = http.createServer((request, response) => {
    console.log(request.url, request.method);
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    fs.readFile("./index.html", (err, data) => {
        if (err) {
            console.error(err);
            response.end();
        } else {
            response.end(data);
        }
    });
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))

