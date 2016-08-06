var messages = require('./messages_pb');
var xhr = new XMLHttpRequest();
xhr.open('GET', '/api/message');
xhr.addEventListener('load', function() {
	//deserializeBinary is clever enough to figure out the response is base64 representation of the protobuf binary data
	var customer_pb = messages.Customer.deserializeBinary(xhr.response);
	console.log(customer_pb);
	console.log(customer_pb.toObject());
});
xhr.send();

xhr2 = new XMLHttpRequest();
xhr2.open('GET', '/api/message?type=json');
xhr2.addEventListener('load', function() {
	var customer = JSON.parse(xhr2.response);
	console.log(customer);
});
xhr2.send();
