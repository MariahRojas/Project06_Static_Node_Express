/* Setup server, routes and middleware */

/* express */
var express = require('express'); //The first two lines require() (import) the express module and create an Express application.
var app = express();    //This object has methods for routing HTTP requests, configuring middleware, rendering HTML views, registering a template engine, and modifying application settings that control how the application behaves

/* parsers */
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

/* data.json file */
const {projects} = require('./data.json');

/* middleware */
app.set('view engine', 'pug')
app.use(express.static('public'))

/* set your routes */
app.get('/', function (req, res) {
    res.render('index', {projects})
  })

app.get('/about', function (req, res) {
res.render('about')
})

/* start your server. app is listening on port 3000 */
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});


/* Handle errors */

app.use((req, res, next) => {
    const err = new Error('Something went wrong!');
    err.status = 404;
    next(err);
  });
  
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});
  