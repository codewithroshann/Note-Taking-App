const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    fs.readdir("./files", function (err, files) {
        if (err) {
            console.log(err)
        } else {
            res.render("index", { files: files });
        }
    })
})
//      CREATE FILE ROUTE
app.post('/create', (req, res) => {
    fs.writeFile(`./files//${req.body.title}.txt`, `${req.body.discription}`, function (err) {
        if (err) {
            console.log(err)
        } else {
           res.redirect('/');
        }
    })
})
// READ FILES ROUTE
app.get('/file/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, 'utf-8', function (err, fileData) {
        res.render('FilesData', { fileName: req.params.filename, fileData: fileData });

    })
})
// RENAME/UPDATE FILES ROUTE
app.get('/edit/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, 'utf-8', function (err, fileData) {
        res.render('edit', { fileName: req.params.filename, fileData: fileData })
    })
})

app.post('/edit', (req, res) => {
    fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`, function (err) {
        res.redirect("/")
    })
})

//DELETE ROUTE 
app.get('/delete/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, 'utf-8', function (err, fileData) {
        res.render('delete', { fileName: req.params.filename, fileData: fileData })
    })
})
app.post('/delete', (req, res) => {
    fs.unlink(`./files/${req.body.title}`, function (err) {
        res.redirect("/")
      })
})


app.listen(5000);