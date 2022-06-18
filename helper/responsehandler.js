// error message handler
export const errorResponse = (res, message, statusCode = 500, error = {}) => {
    res.status(statusCode).json({
		success: false,
		error: {
			statusCode,
			message
		},
    });
};

// success message handler
export const successResponse = (res, message, statusCode = 200, success = {}) => {
    res.status(statusCode).json({
		success: true,
		result: {
			statusCode,
			message
		},
    });
};
  