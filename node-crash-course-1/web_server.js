const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.end("<h1>Hello World</h1>");
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))

