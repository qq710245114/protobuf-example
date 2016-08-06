var messages = require('./messages_pb');

//no need to do messages.consumerdata.Customer
var customer = new messages.Customer();
customer.setUsername('Tony');
customer.getEmailAddressesList().push('tony@tony.com');
customer.setType(messages.Customer.Type.MEMBER);
var address = new messages.Customer.Address();
address.setAddress("123 Main St");
address.setCity("HK");
address.setState("HK");
address.setZipCode("44444");
customer.setAddress(address);

customer.setEmail2("my email 2")
customer.setEmail("my email 1")


console.log(customer);
console.log(customer.toObject());