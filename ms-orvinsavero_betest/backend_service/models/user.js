const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  userName: {
    type: String,
    required: [ true, 'Username is required' ],
  },
  accountNumber: {
    type: String,
    required: [ true, 'Account number is required' ],
  },
  emailAddress: {
    type: String,
    required: [ true, 'Email address is required' ],
    validate: [{
      validator: function(input) {
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return input.match(mailformat)
      },
      message: props => `${props.value} invalid emailAddress format!`
    }, {
      validator: function(value) {
        return User.find({
              _id: { $ne: this._id },
              emailAddress: value
          })
          .then((data) => {
              if (data.length !== 0) {
                  throw ''
              }
          })
          .catch((err) => {
              throw err
          });
      },
      message: props => `This email ${props.value} already used!`
    }], 
  },
  identityNumber: {
    type: String,
    required: [ true, 'Identity number is required' ],
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;