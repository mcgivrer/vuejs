const mongoose = require("mongoose");
const assert = require("assert");

const ContactSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  avatar: { type: String },
  relationType: { type: String, required: true },
  joinedAt: { type: Number, min: 0, max: 3000, required: true },
  description: { type: String },
  active: {
    type: Boolean,
    default: false,
  },
  createdAt: { type: Date, default: Date.now },
});
var Contact = mongoose.model("Contact", ContactSchema);
if (Contact.count == 0) {
  var contactdata = [
    {
      id: 1,
      firstname: "Frédéric",
      lastname: "Delorme",
      avatar: "images/contact/1.JPG",
      relationType: "Familly",
      joinedAt: "1973",
      friendsCount: 3,
      description: "Fred is a man enjoying life and a curious people",
      friends: [2, 3, 4],
      preferred: {
        game: "game:1",
        movie: "movie:1",
      },
    },
    {
      id: 2,
      firstname: "Nathalie",
      lastname: "Delorme",
      avatar: "images/contact/2.JPG",
      relationType: "Familly",
      joinedAt: "1980",
      friendsCount: 3,
      description:
        "Nath is a super wife with a lot a love to distribute to his familly and love every thing about craft",
      friends: [1, 3, 4],
    },
    {
      id: 3,
      firstname: "Mathys",
      lastname: "Delorme",
      avatar: "images/contact/3.JPG",
      relationType: "Familly",
      joinedAt: "2007",
      friendsCount: 3,
      description:
        "Mathys is a calm boy with a very curious mind about everything.",
      friends: [1, 2, 4],
    },
    {
      id: 4,
      firstname: "Solène",
      lastname: "Delorme",
      avatar: "images/contact/4.JPG",
      relationType: "Familly",
      joinedAt: "2010",
      friendsCount: 3,
      description: "Solène is a funny little girl with lot of energy",
      friends: [1, 2, 3],
    },
  ];

  Contact.collection.insertMany(contactdata, function (err, r) {
    assert.isNull(err);
    assert.strictEqual(4, r.insertedCount);
  });
}
module.exports = mongoose.model("Contact", ContactSchema);
