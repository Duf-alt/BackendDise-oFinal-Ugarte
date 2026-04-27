// src/config/passport.js
import passport from "passport";
import { Strategy as JwtStrategy } from "passport-jwt";
import UserModel from "../models/user.model.js";
import { PRIVATE_KEY } from "./jwt.js";

// extractor de cookie
const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["jwtCookie"];
    }
    return token;
};

export const initializePassport = () => {
    passport.use(
        "current",
        new JwtStrategy(
            {
                jwtFromRequest: cookieExtractor,
                secretOrKey: PRIVATE_KEY
            },
            async (jwt_payload, done) => {
                try {
                    const user = await UserModel.findById(jwt_payload.user._id);

                    if (!user) {
                        return done(null, false);
                    }

                    return done(null, user);
                } catch (error) {
                    return done(error, false);
                }
            }
        )
    );
};