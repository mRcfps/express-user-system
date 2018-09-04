const argon2 = require('argon2');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
  },
  { timestamps: true },
);

userSchema.pre('save', async function() {
  const hash = await argon2.hash(this.password);
  this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
