import { apiStatus, httpStatus } from "../constants/index.js";
import UserService from "../services/user.service.js";

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await UserService.findUserById(userId);

        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: "get profile successfully",
            data: user
        });
    } catch (err) {
        if (err instanceof CustomError) {
            return res.status(err.httpStatus).send({
                status: err.apiStatus,
                message: 'Phone number is not existed. Try again...',
            });
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
}