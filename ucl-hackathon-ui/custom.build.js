var fs = require("fs");
var _ = require("lodash");
var gzipAll = require('gzip-all');

console.log("Building index.html");

fs.readdir("../ucl-hackathon-api/public/app", function(err, files){
  if (err) throw err;

  var filesObj = {
    main: null,
    main_es5: null,
    polyfills: null,
    polyfills_es5: null,
    runtime: null,
    runtime_es5: null,
    styles: null
  };

  _(files).each(function(f) {
    if (f.match(/^main-es2015\..*\.js$/ig)) {
      filesObj.main = f;
    } else if (f.match(/^polyfills-es2015\..*\.js$/ig)) {
      filesObj.polyfills = f;
    } else if (f.match(/^runtime-es2015\..*\.js$/ig)) {
      filesObj.runtime = f;
    } else if (f.match(/^main-es5\..*\.js$/ig)) {
      filesObj.main_es5 = f;
    } else if (f.match(/^runtime-es5\..*\.js$/ig)) {
      filesObj.runtime_es5 = f;
    } else if (f.match(/^polyfills-es5\..*\.js$/ig)) {
      filesObj.polyfills_es5 = f;
    } else if (f.match(/^styles\..*\.css$/ig)) {
      filesObj.styles = f;
    }
  });

  if (_(filesObj).includes(null)) {
    console.log("----- ERROR -----");
    console.log(filesObj);
    console.log("----- ERROR -----");
    //throw new Error("Required File(s) are Missing");
  }

  fs.readFile("../ucl-hackathon-api/src/main/resources/templates/index.template.html", "utf8", function(err, data){
    if (err) throw err;

    _(filesObj).toPairs().each(function(pair){
      data = data.replace("{{" + pair[0] + "}}", pair[1]);
    });

    fs.writeFile("../ucl-hackathon-api/src/main/resources/templates/index.html", data, "utf8", function(err) {
      if (err) throw err;
    });
  })
});

console.log("index.html built successfully");

console.log("Compressing Files");

gzipAll("../ucl-hackathon-api/public/app/*.js");
gzipAll("../ucl-hackathon-api/public/app/*.css");

console.log("Compressed Successfully");
