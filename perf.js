var messages = require('./messages_pb');

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

 var start, data, duration;
 start = new Date();
 for (var i = 0; i < 1000; i++) {
 	data = JSON.stringify(customer);
 	JSON.parse(data);
 }
 duration = new Date() - start;
 console.log('JSON ' + duration + 'ms / ' + data.length + 'bytes');

 start = new Date();
 for (var i = 0; i < 1000; i++) {
 	data = customer_pb.serializeBinary();
 	messages.Customer.deserializeBinary(data);
 }
 duration = new Date() - start;
 console.log('Protobuf ' + duration + 'ms / ' + data.length + 'bytes');
