import React from "react";
import Alert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";

const ErrorMessage = ({ message }) => <Alert severity="error">{message}</Alert>;

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
