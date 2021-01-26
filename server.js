const express = require("express")

const app = express();

var PORT = process.env.PORT || 8080;


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(__dirname + '/public'));


require("./routes/apiRoutes")(app)
require("./routes/htmlRoutes")(app)


app.listen(PORT, function(){
    console.log("Listening on http://localhost:" + PORT)
})




