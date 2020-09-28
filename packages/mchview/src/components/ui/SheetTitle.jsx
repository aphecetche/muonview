import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 0),
    margin: theme.spacing(1),
    marginBottom: theme.spacing(4),
  },
  title: {
    marginLeft: theme.spacing(2),
  },
  closeButton: {
    marginRight: theme.spacing(1),
  },
}));

const SheetTitle = ({ title, onClose }) => {
  const classes = useStyles();
  return (
    <Grid
      className={classes.root}
      container
      direction="row"
      justify="space-between"
      alignItems="center"
    >
      <Grid item>
        {title ? (
          <Typography className={classes.title} variant="h4">
            {title}
          </Typography>
        ) : null}
      </Grid>
      <Grid item>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </Grid>
    </Grid>
  );
};

SheetTitle.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
};

export default SheetTitle;
