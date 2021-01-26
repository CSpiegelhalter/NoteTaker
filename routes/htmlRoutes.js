
const path = require("path")

module.exports = function(app) {

    // Notes page
    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"))
    });

    // Home page
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"))
    })
        

}

