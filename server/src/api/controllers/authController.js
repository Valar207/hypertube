const errorHandler = require("../utils/errorHandler");

const User = require("../models/User");

exports.googleController = async (accessToken, refreshToken, profile, done) => {
    try {
        const google_user = profile._json;
        console.log(google_user);
        const user = await User.findUserByEmail(profile.email);
        if (user)
            return done(null, user);
        done(null, {});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error });
    }
}