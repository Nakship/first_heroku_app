  const mongoose = require('mongoose') // saves JavaScript objects as Mongo documents

  if (process.argv.length < 3) {
      console.log('Please provide the password as an argument: node mongo.js <password>')
      process.exit(1)
  }
  const password = process.argv[2]
  
  const url = `mongodb+srv://test:${password}@test.snd72.mongodb.net/noteApp?retryWrites=true&w=majority`
  
  mongoose.connect(url)
  

  //After establishing the connection to the database, we define the schema for a note and the matching model
  //The schema tells Mongoose how the note objects are to be stored in the database
  const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
  })
  
  //In the Note model definition, the first "Note" parameter is the singular name of the model. The name of the collection will be the lowercased plural notes, because the Mongoose convention is to automatically name collections as the plural (e.g. notes) when the schema refers to them in the singular
  const Note = mongoose.model('Note', noteSchema)
  
  //application creates a new note object with the help of the 'Note' model tha was created previously
  const note = new Note({
    content: 'Hello World',
    date: new Date(),
    important: false,
  })
  
/*
  // generating new notes
  //Saving the object to the database happens with the appropriately named save method, that can be provided with an event handler with the then method
  note.save().then(result => {
    console.log("Note addded!")
    mongoose.connection.close() // the event handler closes the database connection with the command mongoose.connection.close()
  })
*/

    // Fetching objects from the database
    //The parameter of the method is an object expressing search conditions. Since the parameter is an empty object{}, we get all of the notes stored in the notes collection
    Note.find({}).then(result => {
        result.forEach(note => {
        console.log(note)
        })
        mongoose.connection.close()
    })
