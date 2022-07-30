import mongoose from "mongoose";
import { RoleConstants } from "../constants/index.js";
import Role from "../models/role.model.js";
import RoleService from "../services/role.service.js";
import mongoDBConnect from "./db.js";
import 'dotenv/config';

async function initData() {

    await mongoDBConnect();

    //delete all before init
    await Role.deleteMany();

    //init data
    await RoleService.addRole(RoleConstants.ADMIN);
    await RoleService.addRole(RoleConstants.USER);
}

initData()
    .catch((err) => {
        console.error(err);
        process.exit(1);
    }).finally(async () => {
        await mongoose.disconnect();
    });