const express = require('express')
const app = express()
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');

const session = require('express-session')
var userList =[];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//middleware
app.use(logger('dev')); // log requests in server console
app.use(bodyParser.json()); // parse client request data to json format.     req,res
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts', express.static(`${__dirname}/node_modules/`));




//router setup
const index = require('./routes/index');



app.use('/', index);




// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err =  new Error('Page Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next)=> {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || 3000;
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);



/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`)
});
