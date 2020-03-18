var gm = require("gm");
var fs = require("fs");
var path = require("path")
var config=require("./config")
var num = 5;
var imgarr = [];
var imgPath = config.dirName+"/images";

function mkdirs(dirname, callback) {
    fs.exists(dirname, function(exists) {
        if (exists) {
            callback();
        } else {
            mkdirs(path.dirname(dirname), function() {
                fs.mkdir(dirname, callback);
            });
        }
    });
}

function deleteFolder(path) {
    let files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function(file, index) {
            let curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) {
                deleteFolder(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

function generateHTML(title, bgColor,img) {
    fs.readFile("index.html", "utf8", function(err, data) {
        var imgstr = '';
        data = data.replace("{{title}}", title);
        data = data.replace("{{bgColor}}", bgColor);
        img.forEach(function(ele) {
            imgstr += '<img src="' + ele + '" width="100%">'
        })
        data = data.replace("{{img}}", imgstr)
        console.log(data);
        fs.writeFile(config.dirName+"/index.html", data, err => {
            console.log(err)
        })
    })
}

function init() {
    deleteFolder(imgPath);
    mkdirs(imgPath, function() {
        gm("demo.png").size(function(err, size) {
            if (!err) {
                for (var i = 0; i < config.imgNum; i++) {
                    var fileName = imgPath + "/" + (i + 1) + ".jpg";
                    imgarr.push("./images/" + (i + 1) + ".jpg");
                    gm("demo.png").crop(size.width, size.height / config.imgNum, 0, size.height / config.imgNum * i).quality(88).write(fileName, function(err) {
                        console.log(imgarr);
                        generateHTML(config.title,config.bgColor,imgarr)
                    });
                }
            }
        })
    });
}

init()