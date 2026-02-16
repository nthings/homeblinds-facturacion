import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    nombre: String,
    apellidos: String,
    username: {type: String, unique: true},
    password: String,
    nuevo: {type: Boolean, default: true},
},
{
  timestamps: true
});

// Encriptar contraseña antes de guardar al usuario
userSchema.pre('save', function(next){
    const user = this;
    if(!user.isModified('password')){
        return next();
    }

    bcrypt.genSalt(10, (err, salt)=>{
        if(err) return next(err);
        bcrypt.hash(user.password, salt, (error, hash)=>{
            if(error) return next(error);
            user.password = hash;
            next();
        });
    });
});

userSchema.pre("findOneAndUpdate", function(next) {
    const update = this.getUpdate() as any;
    const password = update.password;
    if (!password) {
        return next();
    }
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        update.password = hash;
        next();
    } catch (error) {
        return next(error as any);
    }
});


userSchema.methods.comparePassword = function(password: string, callback: any) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
      if (err) { return callback(err); }
      callback(null, isMatch);
    });
};

userSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    }
});

const User = mongoose.model('User', userSchema);

export default User;
