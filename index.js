var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var path    = require("path");
/*
app.engine('html', require('ejs').renderFile);*/

app.get('/scrape', function(req, res){

url = 'http://npmjs.com/search?q=npm';

request(url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);
        var package, description,url, value;	
        var json = {package : {description: "", url: ""  }, value: "" };
    

    $('.package-details h3').each(function(){

        var data = $(this);
        value = data.children().first().text(); 
        url = data.children().attr("href");
        json.value = value;
        json.package.url = url;
      
       $('.description').filter(function(){      
       	var data = $(this);     
        description = data.text();
        json.package.description = description;
    })
 })
}

// To write to the system we will use the built in 'fs' library.
// In this example we will pass 3 parameters to the writeFile function
// Parameter 1 :  output.json - this is what the created filename will be called
// Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
// Parameter 3 :  callback function - a callback function to let us know the status of our function

/*fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})*/

// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
res.send(JSON.stringify(json, null, 4))

    }) ;

})/*
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});*/
app.listen(8081)