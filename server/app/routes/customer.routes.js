module.exports = function(app) {
 
    var contacts = require('../controllers/contact.controller.js');
 
  // Create a new contact
    app.post('/api/contact', contacts.create);
 
    // Retrieve all contact
    app.get('/api/contacts', contacts.findAll);
 
    // Retrieve a single contact by Id
    app.get('/api/contact/:contactId', contacts.findOne);
 
    // Update a contact with Id
    app.put('/api/contact/:contactId', contacts.update);
  
  // Retrieve contacts Age
    app.get('/api/contacts/age/:age', contacts.findByAge);
 
    // Delete a contact with Id
    app.delete('/api/contact/:contactId', contacts.delete);
}