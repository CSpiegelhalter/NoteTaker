
const fs = require("fs")

let usedIds = []

module.exports = function(app) {

    app.get('/api/notes', function(req, res) {
        fs.readFile("./db/db.json", function(err, data) {
            if (err) {
                console.error(err)
                return
            }
            else {
                read = JSON.parse(data)
                res.json(read)
                return 
            }
        })
    });

    app.post('/api/notes', function(req, res) {
        let newId = () => {
            let s4 = () => {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
    
            return s4() + '-' + s4()
        }
        
        noteObj = req.body
        noteObj.id = newId()


        fs.readFile('./db/db.json', 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {
            obj = JSON.parse(data); //now it an object
            obj.push(noteObj)
            console.log(obj)
            json = JSON.stringify(obj); //convert it back to json
            fs.writeFile('./db/db.json', json, 'utf8', function(err) {
                if (err) {
                    console.log(err)
                    return
                }
            });
        }});
        res.json(true)
        return obj
    });

    app.delete('/api/notes/:id', function(req, res) {
        fs.readFile("./db/db.json", function(err, data) {
            if (err) {
                console.error(err)
                return
            }
            else {
                objArray = JSON.parse(data)
                objArray = objArray.filter(({ id }) => id !== req.params.id);
                res.json(objArray)
                json = JSON.stringify(objArray); //convert it back to json
                fs.writeFile('./db/db.json', json, 'utf8', function(err) {
                    if (err) {
                        console.log(err)
                        return
                    }
            });
            }
        })
    })
}
