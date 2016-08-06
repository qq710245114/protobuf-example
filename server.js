var http = require('http');
var fs = require('fs');
var url = require('url');
var messages = require('./messages_pb');
var server = http.createServer(function(req, res) {
	var path = url.parse(req.url).pathname;
	if (path.startsWith('/api')) {
		messageHandler(req, res);
	} else {
		staticFileHandler(req, res);
	}
});

function staticFileHandler(req, res) {
	var path = url.parse(req.url).pathname;
	if (path === '/') {
		path = '/index.html';
	}

	var contentType;
	if (path.endsWith('.js')) {
		contentType = 'application/json';
	} else if (path.endsWith('.html')) {
		contentType = 'text/html';
	}

	if (contentType) {
		res.setHeader('Content-Type', contentType);
	}
	fs.readFile('public' + path, null, function(err, data) {
		res.end(data);
	});
}

function messageHandler(req, res) {
	var urlInfo = url.parse(req.url);
	if (urlInfo.query && urlInfo.query === 'type=json') {
		var customer = {
			username: 'Tony',
			emailAddressesList: [ 'tony@tony.com' ],
			type: 1,
			address: {
				address: '123 Main St',
				city: 'HK',
				state: 'HK',
				zipCode: '44444'
			}
		};
		res.end(JSON.stringify(customer));
	} else {
		var customer_pb = new messages.Customer();
		customer_pb.setUsername('Tony');
		customer_pb.getEmailAddressesList().push('tony@tony.com');
		customer_pb.setType(messages.Customer.Type.MEMBER);
		var address_pb = new messages.Customer.Address();
		address_pb.setAddress("123 Main St");
		address_pb.setCity("HK");
		address_pb.setState("HK");
		address_pb.setZipCode("44444");
		customer_pb.setAddress(address_pb);

		var bytes = customer_pb.serializeBinary();
		res.write(new Buffer(bytes).toString('base64'));
		res.end();
	}
}

server.listen(3000);