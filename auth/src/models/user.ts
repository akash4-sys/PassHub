import mongoose from "mongoose";

// An interface for model
interface UserInf {
    email: String,
    password: String
}

// An interface that describes the properties that a user model has

// An interface that describes the properties that a User document has
interface UserDoc extends mongoose.Document {
    email: String;
    password: String;
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
    }
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