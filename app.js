var http = require('http');
var fs = require('fs');
var url = require('url');
var express = require('express');
var favicon = require('serve-favicon');
var path = require('path')

const bodyParser = require("body-parser");
const router = express.Router();

function readText(filename)
{
	const buffer = fs.readFileSync(filename);
	return buffer;
}

// Run express
app = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// add router in the Express app.
app.use("/", router);

app.get('/', (req, res) => {
	res.set('Cache-Control', 'no-store')
	pathname = 'public/index.html';
	fs.readFile(pathname, (err, data) => {
	
		if (err) {		
			console.error(err);
			
			res.writeHead(404, { 'Content-Type': 'text/plain' });
			res.write('404 - file not found');		
		} else {
			console.log("Serving '/':" + pathname);
			
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.write(data.toString());
		}		
		res.end();
	});
});

app.get('/css/style.css', (req, res) => {
	res.set('Cache-Control', 'no-store')
	pathname = 'css/style.css';
	fs.readFile(pathname, (err, data) => {
	
		if (err) {		
			console.error(err);
			
			res.writeHead(404, { 'Content-Type': 'text/plain' });
			res.write('404 - file not found');		
		} else {
			console.log("Serving:" + pathname);
			
			res.writeHead(200, { 'Content-Type': 'text/css' });
			res.write(data.toString());
		}		
		res.end();
	});
});

app.get('/restart', (req, res) => {
	// Write old style
	var fDate = dateFormat (new Date (), "%Y-%m-%d %H:%M:%S", true);
	res.writeHead(200, { 'Content-Type': 'text/css' });
	res.write("Restarted at: " + fDate);
	res.end();

});

var server = http.createServer(app);

// 80
const port = 80;//process.env.PORT || 8080;

server.listen(port, () => {
  console.log("server starting on port : " + port)
});
