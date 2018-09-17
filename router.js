//css router
var http = require('http');
var fs = require('fs');

exports.css = function (req, res) {
    if (req.url.indexOf('css') !== -1) {
        const css = fs.createReadStream('/css' + req.url, 'utf8');
        css.pipe(res);
    }

    console.log('bruce test:'+ req.url);
};


exports.fonts = function (req, res) {
    if (req.url.indexOf('documents') !== -1) {
        const fonts = fs.createReadStream('/documents' + req.url, 'utf8');
        fonts.pipe(res);
    }

    console.log('bruce test:'+ req.url);
};

exports.js = function (req, res) {
    if (req.url.indexOf('js') !== -1) {
        const js = fs.createReadStream('/js' + req.url, 'utf8');
        js.pipe(res);
    }

    console.log('bruce test:'+ req.url);
};

exports.images = function (req, res) {
    if (req.url.indexOf('images') !== -1) {
        const images = fs.createReadStream('/images' + req.url, 'utf8');
        images.pipe(res);

        console.log('bruce test images:'+ req.url);
    }

    console.log('bruce test:'+ req.url);
};




//user router
exports.user = function (req, res) {
        let username = req.url.replace('/css', './code/go/css');
        const miscUrls = req.url.indexOf('css') !== -1;
        if (username.length > 0 && !(miscUrls)) {
             // do stuff
        }
};

//app.js
http.createServer((req, res) => {
        router.serveCSS(req, res);
        router.home(req, res);
        router.user(req, res);
});
