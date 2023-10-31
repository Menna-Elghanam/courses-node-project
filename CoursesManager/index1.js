const http = require('http');
 

 
const server = http.createServer((req, res) => {
  if(req.url==='/'){
            res.write('home page')
        }
    
       else if(req.url==='/about'){
         res.write('<h1>About Page</h1>')
       }
    
        else{
            res.write('<h1>Page Not Found</h1>')
        }
  res.end();
});
 
server.listen(5000);