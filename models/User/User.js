const mongoose = require("../../database/mongodb");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true
  },
  password: {
    type: String,
    require: true,
  },
  roles: {
      type: [String],
      require: true,
      default: []
  },
  summonerId: {
    type: String,
    require: true
  },
  rank: {
    type: Number,
    require: true
  },
  tier: {
    type: String,
    require: true
  },
}, {
  timestamps: true
})

UserSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    try {
      const hashed = await bcrypt.hash(this.password, 10);
      this.password = hashed;
      return next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
});

UserSchema.methods.checkPassword = async function (password) {
  try {
    const auth = await bcrypt.compare(password, this.password);
    return auth;
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model('User', UserSchema)

module.exports = User
