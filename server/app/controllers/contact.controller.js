const Contact = require("../models/contact.model.js");

// POST a Contact
exports.create = (req, res) => {
  // Create a Contact
  const contact = new Contact({
    firstname: req.body.firstname,
    lastname: req.body.firstname,
    avatar: req.body.avatar,
    relationType: req.body.relationType,
    joinedAt: req.body.joinedAt,
    description: req.body.description,
  });

  // Save a Contact in the MongoDB
  contact
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// FETCH all Contacts
exports.findAll = (req, res) => {
  Contact.find()
    .then((Contacts) => {
      res.send(Contacts);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// FIND a Contact
exports.findOne = (req, res) => {
  Contact.findById(req.params.contactId)
    .then((contact) => {
      if (!contact) {
        return res.status(404).send({
          message: "Contact not found with id " + req.params.contactId,
        });
      }
      res.send(contact);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Contact not found with id " + req.params.contactId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving Contact with id " + req.params.contactId,
      });
    });
};

exports.findByLastname = (req, res) => {
  Contact.find()
    .where('lastname').equals(req.params.lastname)
    .limit(10)
    .then((contacts) => {
      res.send(contacts);
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
    });
};

// UPDATE a Contact
exports.update = (req, res) => {
  // Find Contact and update it
  Contact.findOneAndUpdate(
    { _id: req.params.contactId },
    {
      firstname: req.body.firstname,
      lastname: req.body.firstname,
      avatar: req.body.avatar,
      relationType: req.body.relationType,
      joinedAt: req.body.joinedAt,
      description: req.body.description,
    },
    { new: true }
  )
    .then((contact) => {
      if (!contact) {
        return res.status(404).send({
          message: "Contact not found with id " + req.params.contactId,
        });
      }
      res.send(contact);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Contact not found with id " + req.params.contactId,
        });
      }
      return res.status(500).send({
        message: "Error updating Contact with id " + req.params.contactId,
      });
    });
};

// DELETE a Contact
exports.delete = (req, res) => {
  Contact.findByIdAndRemove(req.params.ContactId)
    .then((contact) => {
      if (!contact) {
        return res.status(404).send({
          message: "Contact not found with id " + req.params.contactId,
        });
      }
      res.send({ message: "Contact deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Contact not found with id " + req.params.contactId,
        });
      }
      return res.status(500).send({
        message: "Could not delete Contact with id " + req.params.contactId,
      });
    });
};
