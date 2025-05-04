export const handleErrors = (errorResponse, errorsRef) => {
    const errorMessages = {};
    if (errorResponse.errors) {
        errorResponse.errors.forEach((error) => {
            errorMessages[error.path] = error.msg;
        });
    }
    Object.assign(errorsRef.value, errorMessages);
};