const express = require('express') // importing express(library), which this time is a function that is used to create an express application stored in the app variable
/*const http = require('http') //  application imports Node's built-in web server module*/
const app = express()

const cors = require('cors') // We can allow requests from other 'origins' by using Node's cors middleware.
app.use(cors())

//In order to access the data easily, we need the help of the express json-parser that is taken to use with command app.use(express.json()).
app.use(express.json())


//To make express show static content, the page index.html and the JavaScript, etc., it fetches, we need a built-in middleware from express called static.
app.use(express.static('build'))



let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2022-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2022-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2022-05-30T19:20:14.298Z",
      important: true
    }
]

/*
// 'createServer' method of the http module to create a new web server.
const app = http.createServer((request, response) => {

  //The application/json value in the Content-Type header informs the receiver that the data is in the JSON format
  response.writeHead(200, { 'Content-Type': 'application/json' })

  //The notes array gets transformed into JSON with the JSON.stringify(notes) method
  response.end(JSON.stringify(notes))
})
*/



//This first one defines an event handler that is used to handle HTTP GET requests made to the application's / root
//The event handler function accepts two parameters. The first request parameter contains all of the information of the HTTP request, and the second response parameter is used to define how the request is responded to.
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

//This second route defines an event handler that handles HTTP GET requests made to the notes path of the application
//The request is responded to with the json method of the response object. 
//Calling the method will send the notes array that was passed to it as a JSON formatted string.
//Express automatically sets the Content-Type header with the appropriate value of application/json.
app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find( note => note.id === id)
  
  //the note variable is set to undefined if no matching note is found. The situation needs to be handled on the server in a better way. If no note is found, the server should respond with the status code 404 not found instead of 200
  if(note){
    response.json(note)
  }else{
    //Since no data is attached to the response, we use the status method for setting the status, and the end method for responding to the request without sending any data.
    response.status(404).end()
  }

})

// generates the id number for the new note added through the post method
const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0 //What exactly is happening in that line of code? notes.map(n => n.id) creates a new array that contains all the ids of the notes. Math.max returns the maximum value of the numbers that are passed to it. However, notes.map(n => n.id) is an array so it can't directly be given as a parameter to Math.max. The array can be transformed into individual numbers by using the "three dot" spread syntax '...'
  return maxId + 1
}

app.post('/api/notes', (request,response)=> {

  //Without the json-parser, the body property would be undefined. The json-parser functions so that it takes the JSON data of a request, transforms it into a JavaScript object and then attaches it to the body property of the request object before the route handler is called.
  const body = request.body
 
  // if the content is empty return an error
  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

   
  const note = {
    content: body.content,
    important: body.important || false, //If the data saved in the body variable has the important property, the expression will evaluate to its value. If the property does not exist, then the expression will evaluate to false which is defined on the right-hand side of the vertical lines.
    date: new Date(),
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
}) 

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  //If deleting the resource is successful, meaning that the note exists and it is removed, we respond to the request with the status code 204 no content and return no data with the response.
  response.status(204).end()
})

//These last rows bind the http server assigned to the app variable, to listen to HTTP requests sent to the port defined in environment variable or the port 3001 in case we run locally
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})