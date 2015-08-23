/**
 * Created by Christianson on 12/08/2015.
 */
var router = require('express').Router(),
    fs = require('fs'),
    path = require('path'),
    photoModel = require('../models/models');

/*    router.get('/', function (req, res, next) {
        res.render("index");
    });*/

exports.myFunction = function(){
    return router;
};

exports.testFunction = function(formidable){
    router.get('/', function (req, res, next) {
        res.render("index", {title: "Craigs Photography Site"});
    });

    router.post('/', function(req, res, next){
        console.log("handling photo upload");

        var form = new formidable.IncomingForm();

        uploadFolder = __dirname + "/../public/photos/";
        form.uploadDir = uploadFolder;


        form.parse(req, function(err, fields, files){

            console.log(files.theImage.name);
            console.log(files.theImage.path);

            var newPath = uploadFolder + files.theImage.name;

            fs.stat(newPath, function(err, stats){
                if (err) {
                    fs.rename(files.theImage.path, newPath, function (err) {
                        if (err) throw err;
                        console.log(fields.name + ": saved");

                        var newPhoto = new photoModel({
                            description: fields.name,
                            filePath: newPath,
                            fileName : files.theImage.name
                        });

                        console.log(fields.name);
                        console.log(newPath);
                        console.log(files.theImage.name);

                        newPhoto.save(function(err){
                           if (err) throw err;
                           console.log('saved to database');
                        });

                        fs.unlink(files.theImage.path, function (err) {
                            console.log("deleted the original");
                        })
                    });
                } else {
                    fs.unlink(files.theImage.path, function (err) {
                        console.log("deleted the original");
                    });
                    console.log("File name already used");
                }
            });
        });

        res.redirect('/');
    });

    router.get('/photos', function(req, res, next){
        photoModel.find({}, function(err, photos){
           res.render("photos", {photos: photos});
        });
    });

    router.get('/slider', function(req,res,next){
        res.render("slider");
    });

    return router;
};