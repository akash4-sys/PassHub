import mongoose from "mongoose";
import { PasswordHasher } from "../services/password";

// An interface for model
interface UserInf {
    email: string,
    password: string
}

// An interface that describes the properties that a user model has

// An interface that describes the properties that a User document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserInf): UserDoc;
};

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {        
    // to edit the document the mongoose returns with every query, we are editing this so we can get consistent response from every query
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});

userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await PasswordHasher.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

// @ Addng build function to user model
// @ To counter buildUser function
userSchema.statics.build = (attrs: UserInf) => {
    return new User(attrs);
};

// model function will return type UserModel
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

// Function for attribute checking type with typescript
// ! But if we do this we need to import this function whenever
// ! we need to create a new user that just creates more code to write
// @ so instead we can just integrate this to model itself
// const buildUser = (attrs: UserInf) => {
//     return new User(attrs);
// };

export default User;