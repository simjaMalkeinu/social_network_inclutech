const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcryt = require('bcryptjs');

const UserSchema = new Schema({
    name: { type : String, required: true },
    email: { type: String, required: true},
    password: {type: String, required: true},
    date: { type:Date, default: Date.now}
});

UserSchema.methods.encryptPassword = async( password ) => {
    const salt = await bcryt.genSalt(10);
    const hash = bcryt.hash(password, salt);
    return hash;
};

UserSchema.methods.matchPassword = async function ( password ) {
    return await bcryt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);