var mongoose = require("mongoose");
//const validator = require("validator");
//const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },

  date: {
    type: Date,
    default: Date.now
  },

  stocks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock"
    }
  ],

  balance: {
    type: String,
    default: "100000"
  },

  email: {
    type: String,
    lowercase: true,
    unique: true
  },

  password: {
    type: String
  },

  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

/*
userSchema.pre("save", async function(next) {
  // Hash the password before saving the user model. only hash if modified or new
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});


userSchema.methods.generateAuthToken = async function() {
  // Generate an auth token for the user
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};


// login users to application.  If the email exists, we then compare the received password with the stored hashed password and if they match, we return that user. 
userSchema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password.
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error({ error: "Invalid login credentials" });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error({ error: "Invalid login credentials" });
  }
  return user;
};


// if user is deleted, pre hook to our user schema to remove all messages of this user
userSchema.pre("remove", function(next) {
  this.model("Message").deleteMany({ user: this._id }, next);
});
*/

const User = mongoose.model("user", UserSchema);

module.exports = User;
