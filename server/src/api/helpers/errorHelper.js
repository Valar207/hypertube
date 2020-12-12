const errorHelper = (res, statusCode, msg) => {
    return res.status(statusCode).json({
        status: statusCode,
        message: msg
    });
};

module.exports = errorHelper