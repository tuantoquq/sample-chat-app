import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        phoneNumber: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true
        },
        avartarUrl: {
            type: String,
            required: true,
            default: "default_avt.png"
        },
        refreshToken: {
            type: String
        },
        email: {
            type: String,
            required: true
        },
        roleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role'
        }
    }, {
    versionKey: false,
    timestamps: true
}
);

const User = mongoose.model('User', UserSchema, 'users');

export default User;
