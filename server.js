//console.log("Hola Mundo!!!!");
var http = require("http");
var fs = require("fs");

http.createServer(function(req, res){
  if(req.url.indexOf("favicon.ico")>0){
    return ;
  }

  var parametros = {};
  var parametroArreglo = [];

  if(req.url.indexOf("?") >0){
    var urlData = req.url.split("?");
    parametroArreglo = urlData[1].split("&");

  var parametro = {};
    for(parametro of parametroArreglo){
      var paramData = parametro.split("=");
      parametros[paramData[0]] = paramData[1];
    }
  }

 fs.readFile("./index.html", function(err, html){
   var htmlToString = html.toString();
   var variables = htmlToString.match(/[^\{\}]+(?=\})/g);

   for(variable of variables){
     //var valor = eval(variable)
     htmlToString = htmlToString
       .replace(`{${variable}}`, parametros[variable]);
   }
   res.writeHeader(200,{"Content-Type":"text/html"});
   res.write(htmlToString);
   res.end();
 });
}).listen(8080);
