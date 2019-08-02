/* Server, routes and middleware */
/* express */
const express = require('express'); //The first two lines require() (import) the express module and create an Express application.
const app = express();    //This object has methods for routing HTTP requests, configuring middleware, rendering HTML views, registering a template engine, and modifying application settings that control how the application behaves
/* data.json file */
const { projects } = require('./data.json');

/* middleware */
app.set('view engine', 'pug')
app.use('/static', express.static('public'))

/* routes */
app.get('/', function (req, res) {
  res.render('index', { projects })
})

// render the about page
app.get('/about', function (req, res) {
  res.render('about')
})


app.get("/project/:id", function(req, res, next){
  const id = parseInt(req.params.id);
  const project = projects[id];
    if(Number.isInteger(id) && id < projects.length && id >= 0){
      return res.render('project', { project }); 
    }
})

/* Handle errors */
// sets error status when site is not found 
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    console.log("We can't find the page you are looking for!")
    next(err);
});
  
// renders error page
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
    console.log(err.status);
}); 
 
/* starts server. app is listening on port 3000 */
app.listen(3000, () => {
  console.log('The application is running on localhost:3000!')
});