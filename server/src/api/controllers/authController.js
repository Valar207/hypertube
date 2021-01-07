exports.getSession = (req, res) => {
    return res.status(200).json({ status: "success", message: true });
};

exports.getGoogleRedirect = (request, response, next) => {
    response.status(200).json(request.user);
};

exports.get42Redirect = (request, response, next) => {
    response.status(200).json(request.user);
};

exports.getLogout = (request, response) => {
    if (request.isAuthenticated()) {
      request.logout();
      return response.status(200).json({ status: "success", message: "Logged out successfuly" });
    }
    return response.status(200).json({ status: "error", message: "User was not logged in" });
};