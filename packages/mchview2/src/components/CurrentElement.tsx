import React from "react";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useCurrentElement } from "contexts/CurrentElementContext";

const useStyles = makeStyles(() => ({
  noelement: {
    flexGrow: 1,
  },
}));

const isValid = (id: string): boolean => {
  return true;
};

const describeId = (id: string): string => {
  return "should describe " + id;
};

const CurrentElement = () => {
  const classes = useStyles();
  const { currentElement } = useCurrentElement();
  let message = "No current element under the (mouse) cursor";
  if (currentElement) {
    const { envelop, value } = currentElement;
    const { id } = envelop;
    message = isValid(id) ? describeId(id) : "[ Invalid ID ]";
    if (value) {
      message = message + " | Value" + value;
    }
  }
  return (
    <Alert className={classes.noelement} severity="info">
      {message}
    </Alert>
  );
};

export default CurrentElement;
