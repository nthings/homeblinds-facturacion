import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
    rfc: {type: String, unique: true},
    razonsocial: String,
    email: String,
},
{
  timestamps: true
});

const User = mongoose.model('Client', clientSchema);

export default User;
