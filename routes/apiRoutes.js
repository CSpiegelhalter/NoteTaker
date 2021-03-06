
const fs = require("fs")

module.exports = function(app) {

    // Reads json file and returns saved notes data
    app.get('/api/notes', function(req, res) {
        fs.readFile("./db/db.json", function(err, data) {
            if (err) {
                console.error(err)
                return
            }
            else {
                read = JSON.parse(data)
                
                return res.json(read)
            }
        })
    });


    app.post('/api/notes', function(req, res) {

        // Creates a random sequence of letters and numbers to assign as an ID
        let newId = () => {
            let s4 = () => {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
    
            return s4() + '-' + s4()
        }
        
        // Adds ID to note 
        noteObj = req.body
        noteObj.id = newId()

        // Gets data in json file to manipulate
        fs.readFile('./db/db.json', 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {
            obj = JSON.parse(data); //now it an object
            obj.push(noteObj); // Adds to array
            json = JSON.stringify(obj); //convert it back to json

            // Update json file with new notes object 
            fs.writeFile('./db/db.json', json, 'utf8', function(err) {
                if (err) {
                    console.log(err)
                    return
                }
            });
        }});
        res.json(true)
        return 
    });

    // Deletes note based on ID, updates array 
    app.delete('/api/notes/:id', function(req, res) {
        fs.readFile("./db/db.json", function(err, data) {
            if (err) {
                console.error(err)
                return
            }
            else {
                objArray = JSON.parse(data)
                const id = req.params.id;

                // Filters out note to be deleted and stores it as a variable 
                const projectIndex = objArray.findIndex(p => p.id == id);

                objArray.splice(projectIndex, 1);
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

