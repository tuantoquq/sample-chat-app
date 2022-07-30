import { httpStatus, apiStatus } from "../constants/index.js";
import CustomError from "../error/CustomError.js";
import User from "../models/user.model.js";

const UserService = {};

UserService.findUserById = async (userId) => {
    let user = await User.findById(userId);
    if (!userId) {
        throw new CustomError(
            httpStatus.NOT_FOUND,
            apiStatus.DATABASE_ERROR,
            `User not found with id ${userId}`,
        );
    }
    return user;
}
UserService.findUserByPhoneNumber = async (phoneNumber) => {
    let user = await User.findOne({ phoneNumber: phoneNumber });
    if (!user) {
        throw new CustomError(
            httpStatus.NOT_FOUND,
            apiStatus.DATABASE_ERROR,
            `User not found with phoneNumber ${phoneNumber}`,
        );
    }
    return user;
}
UserService.addUser = async (user) => {
    await User.create(user, (err, u) => {
        if (err) {
            throw new CustomError(
                httpStatus.NOT_FOUND,
                apiStatus.DATABASE_ERROR,
                err.message,
            );
        }
    });
}

UserService.updateRefreshToken = async (userId, refreshToken) => {
    let user = await User.findByIdAndUpdate(userId, { refreshToken: refreshToken });
    if (!user) {
        throw new CustomError(
            httpStatus.NOT_FOUND,
            apiStatus.DATABASE_ERROR,
            `User not found with id ${userId}`,
        );
    }
}
export default UserService;