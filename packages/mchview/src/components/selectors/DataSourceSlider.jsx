import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  slider: {
    marginBottom: theme.spacing(1),
  },
  button: {
    minHeight: theme.spacing(5),
  },
  load: {},
  unload: {
    color: theme.palette.text.primary,
    borderColor: theme.palette.text.primary,
  },
  error: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
  },
}));

const LoadButton = ({ onClick, size, kind, loaded, error }) => {
  const classes = useStyles();
  let button = {};
  if (loaded) {
    button = { type: "unload", text: "unload", style: "outlined" };
  } else {
    button = { type: "load", text: "load", style: "contained" };
  }
  if (error) {
    button = { type: "error", text: "error loading", style: "outlined" };
  }
  button.text = `${button.text} ${size} ${kind}`;

  return (
    <Button
      onClick={onClick}
      color="primary"
      className={clsx(classes[button.type], classes.button)}
      variant={button.style}
    >
      {button.text}
    </Button>
  );
};

LoadButton.propTypes = {
  onClick: PropTypes.func,
  size: PropTypes.number,
  kind: PropTypes.string,
  loaded: PropTypes.bool,
  error: PropTypes.bool,
};

const DataSourceSlider = ({
  name,
  items,
  description,
  kind,
  onClick,
  initialValue,
}) => {
  console.log("items=", items);
  const classes = useStyles();
  const [value, setValue] = useState(
    initialValue ? initialValue : Math.floor(items.length / 2)
  );

  const handleSliderChange = (event, newValue) => {
    setValue(newValue === "" ? "" : Number(newValue));
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value <= 0) {
      setValue(0);
    } else if (value >= items.length) {
      setValue(items.length - 1);
    }
  };

  const v = Number(value);
  let loaded = false;
  let error = false;
  let size = -1;
  if (v >= 0 && v < items.length) {
    size = items[v].size;
    if (items[v].isLoaded) {
      loaded = true;
    }
    if (items[v].isError) {
      error = true;
    }
  }

  return (
    <div className={classes.root}>
      <section className={classes.slider}>
        <Typography gutterBottom id="event-slider">
          Event
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Slider
              valueLabelDisplay="on"
              min={0}
              max={items.length - 1}
              value={value === "" ? 0 : value}
              onChange={handleSliderChange}
              aria-labelledby="event-slider"
            />
          </Grid>
          <Grid item>
            <Input
              value={value}
              onChange={handleInputChange}
              onBlur={handleBlur}
              inputProps={{
                min: 0,
                max: items.length - 1,
                type: "number",
                label: "Event",
              }}
              aria-labelledby="event-slider"
            />
          </Grid>
        </Grid>
      </section>
      <Grid container spacing={0}>
        <Grid item xs={8}>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="subtitle1">{name}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2">{description}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <LoadButton
            onClick={() => {
              onClick(value);
            }}
            size={size}
            kind={kind}
            loaded={loaded}
            error={error}
          />
        </Grid>
      </Grid>
    </div>
  );
};

DataSourceSlider.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      isLoaded: PropTypes.bool.isRequired,
      isError: PropTypes.bool.isRequired,
      size: PropTypes.number.isRequired,
    })
  ).isRequired,
  description: PropTypes.string.isRequired,
  kind: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  initialValue: PropTypes.number,
};

export default DataSourceSlider;
