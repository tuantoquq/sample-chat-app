import { apiStatus, httpStatus, RoleConstants } from "../constants/index.js";
import Role from "../models/role.model.js";

const RoleService = {};

RoleService.findById = async (roleId) => {
    let role = await Role.findById(roleId);
    if (!role) {
        throw new CustomError(
            httpStatus.NOT_FOUND,
            apiStatus.DATABASE_ERROR,
            `Role not found with id ${roleId}`,
        );
    }

    return role;
};

RoleService.findByName = async (roleName) => {
    let role = await Role.findOne({ name: roleName });
    if (!role) {
        throw new CustomError(
            httpStatus.NOT_FOUND,
            apiStatus.DATABASE_ERROR,
            `Role not found with name ${roleName}`,
        );
    }
    return role;
}

RoleService.addRole = async (roleName) => {
    await Role.create({ name: roleName }, (err, role) => {
        if (err) {
            throw new CustomError(
                httpStatus.NOT_FOUND,
                apiStatus.DATABASE_ERROR,
                err.message,
            );
        }
    });
}

export default RoleService;