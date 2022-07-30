import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import UserService from '../services/user.service.js';
import { apiStatus, httpStatus } from '../constants/index.js';
import CustomError from '../error/CustomError.js';
import User from '../models/user.model.js';

const { hashSync, compareSync } = bcrypt;
const { sign } = jwt;

export const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(httpStatus.BAD_REQUEST).send({
                status: apiStatus.INVALID_PARAM,
                message: 'Invalid params',
                error: errors.array(),
            });
        }
        //check email is used?
        await UserService.findUserByPhoneNumber(req.body.phoneNumber);

        return res.status(httpStatus.BAD_REQUEST).send({
            status: apiStatus.INVALID_PARAM,
            message: 'Phone number is already used! Try another',
        });
    } catch (err) {
        if (err instanceof CustomError) {
            //create new user
            const newUser = new User({
                email: req.body.email,
                password: hashSync(req.body.password),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phoneNumber: req.body.phoneNumber,
            });
            await UserService.addUser(newUser);
            return res.status(httpStatus.CREATED).send({
                status: apiStatus.SUCCESS,
                message: 'User was registered successfully',
            });
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: apiStatus.DATABASE_ERROR,
            message: 'Error when save user: ' + err,
        });
    }
}
export const loginUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(httpStatus.BAD_REQUEST).send({
                status: apiStatus.INVALID_PARAM,
                message: 'Invalid params',
                error: errors.array(),
            });
        }

        //get user by PhoneNumber
        let user = await UserService.findUserByPhoneNumber(req.body.phoneNumber);
        const isRemember = req.query.r;
        console.log(isRemember);

        const passwordIsValid = compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(httpStatus.UNAUTHORIZED).send({
                status: apiStatus.AUTH_ERROR,
                message: 'Incorrect password!',
            });
        }

        //sign token 
        const userInfo = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            email: user.email,
        };

        let token = sign(userInfo, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
        });
        let refreshToken;
        if (isRemember === true) {
            refreshToken = sign(userInfo, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
            });
            await UserService.updateRefreshToken(user._id, refreshToken);
        }
        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'Login successfully',
            data: isRemember === true ? {
                token: token,
                tokenExpire: parseInt(process.env.ACCESS_TOKEN_EXPIRATION),
                refreshToken: refreshToken,
                refreshTokenExpire: parseInt(process.env.REFRESH_TOKEN_EXPIRATION),
            } : {
                token: token,
                tokenExpire: parseInt(process.env.ACCESS_TOKEN_EXPIRATION),
            },
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

export const refreshToken = async (req, res) => {
    try {
        const user = await UserService.findUserById(req.userId);
        const userInfo = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            email: user.email,
        };
        var token = sign(userInfo, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
        });

        let refreshToken = sign(userInfo, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
        });
        await UserService.updateRefreshToken(user._id, refreshToken);

        return res.status(httpStatus.OK).send({
            status: apiStatus.SUCCESS,
            message: 'refresh token successfully',
            data: {
                token,
                tokenExpire: parseInt(process.env.ACCESS_TOKEN_EXPIRATION),
                refreshToken: refreshToken,
                refreshTokenExpire: parseInt(process.env.REFRESH_TOKEN_EXPIRATION),
            },
        });
    } catch (err) {
        if (err instanceof CustomError) {
            return res.status(err.httpStatus).send({
                status: err.apiStatus,
                message: err.message,
            });
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            status: apiStatus.OTHER_ERROR,
            message: err.message,
        });
    }
}