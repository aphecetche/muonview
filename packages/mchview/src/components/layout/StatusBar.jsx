import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CurrentElement from "../ui/CurrentElement";
import { selectors } from "../../reducers";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
  },
}));

const StatusBar = () => {
  const currentElement = useSelector((state) =>
    selectors.currentElement(state)
  );
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CurrentElement element={currentElement} />
    </div>
  );
};
export default StatusBar;
