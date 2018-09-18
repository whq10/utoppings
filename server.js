var http = require('http'),
    util = require('util'),
    fs = require('fs'),
    url = require('url'),
    qs = require('querystring');
    var os = require("os");
    var nStatic = require('node-static');
     var path = require('path');
     var router = require('./router.js');

//var fileServer = new nStatic.Server('../go');


var server = http.createServer(function (req,res){
/*
  path.join(__dirname, './css');
  path.join(__dirname, './fonts');
  path.join(__dirname, './images');
  path.join(__dirname, './js');
  */

  //router.css(req, res);
//router.fonts(req, res);
//router.js(req, res);
//router.images(req, res);
handler(req, res);


	CreateLog();
	//fileServer.serve(req, res);


    var url_parts = url.parse(req.url,true);
    //console.log(url_parts);

    var body = '';
    if(req.method === 'POST'){
       // res.end('post');
       console.log('Request found with POST method');
        req.on('data', function (data) {
            body += data;
            //console.log('got data:'+data);
        });
        req.on('end', function () {



            var POST = qs.parse(body);

            if(isEmailExist(POST.email)){
            	res.end("The email has already been used today. Please try it tomorrow.");
            	}
            	else{
            // use POST
            var id = makeid(POST.email, url_parts.pathname);
            res.end("Your promotion code is:   " + id);
            try{
            	            sendEmail(POST.email, id);
            	}
            	catch(error){
            		console.error(error);
            		}
          }

        });


    } else {

//console.log("bruce test 777:" + req.url_parts);

    console.log('Request found with GET method');

    //console.log('brue test 444');
    //console.log(url_parts.pathname);
    req.on('data',function(data){ res.end(' data event: '+data);});

//console.log('bruce test 666');
//console.log(url_parts.pathname);

    if((url_parts.pathname == '/')
    ||(url_parts.pathname =='/58/')
    ||(url_parts.pathname =='/chinesewinnipeg/')
  )
    {
      //console.log('bruce test 656565');



      if(url_parts.pathname.indexOf('report.html') !== -1)
      {

        if((url_parts.pathname.indexOf('58') !== -1) || (url_parts.pathname.indexOf('chinesewinnipeg') !== -1))
        {
          //console.log('999');
          fs.readFile('../../report.html',function(error,data){
          console.log('Serving the page report.html');
          res.end(data);
          });

        }
        else {
            //console.log('101010');
          fs.readFile('./report.html',function(error,data){
          console.log('Serving the page report.html');
          res.end(data);
          });

        }


      }
      else {
        fs.readFile('./index.htm',function(error,data){
        console.log('Serving the page form.html');
        res.end(data);
        });

      }

    }
    else if(url_parts.pathname == '/getData'){
      //console.log('bruce test 888');
         console.log('Serving the Got Data.');
        getData(res,url_parts);
    }
    }




});


//server.listen(8081);
//console.log('Server listenning at localhost:8081');
server.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});


function  getData(res,url_parts){

 console.log("Data submitted with email:"+url_parts.query.email);
        res.end("Data submitted with email:"+url_parts.query.email);

}


function CreateLog(){
		var date = new Date().toISOString().substr(0, 10);
	var log = 'log' + date + '.txt';

//check if the log file exists
fs.exists(log, function(exists) {
  if (exists) {
    fs.stat(log, function(err, stats) {
      if (stats.isDirectory()) {
        console.log(log + ": is a directory");
      } else {
        // do something with file
        //console.log(log);
      }
    });
  } else {
    console.log(log + ": no such file");
    var logger = fs.createWriteStream(log, {flags: 'a'});
  }
});
	}

function isEmailExist(email) {




	var emailExist = false;
	var date = new Date().toISOString().substr(0, 10);
	var log = 'log' + date + '.txt';



	require('fs').readFileSync(log).toString().split(/\r?\n/).forEach(function(line){

		if(line.indexOf(email) !== -1){
  	emailExist = true;
  	}
  //console.log(line);
})

	return emailExist;
}


function makeid(email, pathname) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 12; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

    if(pathname.indexOf('58') !== -1)
    {
      text = '58_' + text;

    }
    if(pathname.indexOf('chinesewinnipeg') !== -1)
    {
      text = 'chineswinnipeg_' + text;

    }

    //log the email to text file
    var date = new Date().toISOString().substr(0, 10);
    	var log = 'log' + date + '.txt';
    var logger = fs.createWriteStream(log, {
  flags: 'a' // 'a' means appending (old data will be preserved)
})

logger.write(email) // append string to your file
logger.write(':') // again
logger.write(text) // again
logger.write(os.EOL) // again

  return text;
}


function sendEmail(email,id){
	var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  host: 'smtp.sina.com',
  auth: {
    user: 'whq10@sina.com',
    pass: 'ywfwyfywxwyx_1o'
  }
});

var mailOptions = {
  from: 'whq10@sina.com',
  to: email,
  subject: 'Go Bubble Tea promotion code',
  text: 'Your promotion code is: ' + id
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
     console.log('Email sent: ' + info.response);
  }
});
	}


  function handler (req, res){
  var pathname = url.parse(req.url).pathname;
  var isImage = 0, contentType, fileToLoad;
  var extension = pathname.split('.').pop();
  var file = "." + pathname;
  var dirs = pathname.split('/');
  //console.log('bruce test 888:' + pathname);
  if(pathname == "/" || pathname == '/58/' || pathname == 'chinesewinnipeg'){
      file = "index.htm";
      contentType = 'text/html';
      isImage = 2;
  }
  else if(dirs[1] != "hidden" && pathname != "/server.js"){
      switch(extension){
          case "jpg":
          case "jpeg":
              contentType = 'image/jpg';
              isImage = 1;
              break;
          case "png":
              contentType = 'image/png';
              isImage = 1;
              break;
          case "js":
              contentType = 'text/javascript';
              isImage = 2;
              break;
          case "css":
              contentType = 'text/css';
              isImage = 2;
              break;
          case "html":
              contentType = 'text/html';
              isImage = 2;
              break;
          case "json":
                  contentType = 'text/json';
                  isImage = 2;
                  break;
          case "pdf":
                  contentType = 'application/pdf';
                  isImage = 2;
                  break;
      }
  }
  if(isImage == 1){
      fileToLoad = fs.readFileSync(file);
      res.writeHead(200, {'Content-Type':  contentType });
      res.end(fileToLoad, 'binary');
  }
  else if(isImage == 2){

      if(pathname.indexOf('report.html') !== -1)
      {
        if((pathname.indexOf('58') !== -1)||(pathname.indexOf('chinesewinnipeg') !== -1))
        {
          console.log(pathname);
            var dirs = file.split('/');
            file = dirs[2];
          fileToLoad = fs.readFileSync('../go/' + file, "utf8");
        }
        else {
          fileToLoad = fs.readFileSync(file, "utf8");
        }


      }
      else {
        fileToLoad = fs.readFileSync(file, "utf8");

      }

      //fileToLoad = fs.readFileSync(file, "utf8");
      res.writeHead(200, {'Content-Type':  contentType });
      res.write(fileToLoad);
      res.end();
  }
}
