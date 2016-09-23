//console.log("Hola Mundo!!!!");
var http = require("http");
var fs = require("fs");

http.createServer(function(req, res){
  if(req.url.indexOf("favicon.ico")>0){
    return ;
  }

 fs.readFile("./index.html", function(err, html){
   var htmlToString = html.toString();
   var variables = htmlToString.match(/[^\{\}]+(?=\})/g);
   var nombre = "Luis";
   var apellido = "Ramirez";
   for(variable of variables){
     var valor = eval(variable)
     htmlToString = htmlToString.replace(`{${variable}}`, valor);
   }
   res.writeHeader(200,{"Content-Type":"text/html"});
   res.write(htmlToString);
   res.end();
 });
}).listen(8080);
