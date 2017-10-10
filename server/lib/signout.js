exports.init = function (request, response) {
	console.log("logout-------------------------------------------------")
    request.logout();
    response.status(200).json({
        status: "Bye!"
    });
};
