import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const Role = mongoose.model('Role', RoleSchema, 'roles');

export default Role;