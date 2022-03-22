//mongo db -> need to install npm mongoose to use it
const mongoose = require('mongoose') // saves JavaScript objects as Mongo documents


//connection with the db that I created on https://cloud.mongodb.com/
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url).then( result => {
    console.log('Connected to MongoDB');
}).catch( error => {
    console.log('error connecting to MongoDB:', error.message);
})


//After establishing the connection to the database, we define the schema for a note and the matching model
//The schema tells Mongoose how the note objects are to be stored in the database
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})


//One way to format the objects returned by Mongoose is to modify the toJSON method of the schema, which is used on all instances of the models produced with that schema
//Even though the _id property of Mongoose objects looks like a string, it is in fact an object. The toJSON method we defined transforms it into a string just to be safe
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


//In the Note model definition, the first "Note" parameter is the singular name of the model. The name of the collection will be the lowercased plural notes, because the Mongoose convention is to automatically name collections as the plural (e.g. notes) when the schema refers to them in the singular
//I'm exporting it to use in other files
module.exports = mongoose.model('Note', noteSchema)


