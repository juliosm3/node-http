// server.js
const http = require("http");
const fs = require("fs");
const path = require("path");
const data = require("./data");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/" || req.url === "/index.html") {
    fs.readFile(path.join(__dirname, "index.html"), "utf-8", (err, html) => {
      if (err) {
        res.statusCode = 500;
        res.end("Error al cargar el archivo HTML");
        return;
      }

      const dynamicHtml = html
        .replace(/{{title}}/g, data.title)
        .replace(/{{subtitle}}/g, data.subtitle)
        .replace(/{{description}}/g, data.description)
        .replace(/{{author}}/g, data.author)
        .replace(/{{year}}/g, data.year);

      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(dynamicHtml);
    });
  } else if (req.url === "/style.css") {
    fs.readFile(path.join(__dirname, "style.css"), (err, css) => {
      if (err) {
        res.statusCode = 500;
        res.end("Error al cargar el archivo CSS");
        return;
      }

      res.statusCode = 200;
      res.setHeader("Content-Type", "text/css");
      res.end(css);
    });
  } else {
    res.statusCode = 404;
    res.end("404 - Recurso no encontrado");
  }
});

server.listen(port, hostname, () => {
  console.log(`Servidor corriendo en http://${hostname}:${port}/`);
});
