/* eslint no-param-reassign: ["error", { "props": false }] */

import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import React, { useState } from "react";
import produce from "immer";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import * as categories from "../../categories";
import SVGHighlighter from "../ui/SVGHighlighter";
import SVGView from "./SVGView";
import useEnvelop from "../../hooks/useEnvelop";
import createLayer from "../elements/LayerCreator";
import VisibilitySelectorBar from "../selectors/VisibilitySelectorBar";
import DePlaneViewHeader from "./DePlaneViewHeader";
import StatusBar from "../layout/StatusBar";
import DataSourceSelectorSheet from "../selectors/DataSourceSelectorSheet";
import ErrorMessage from "../ui/ErrorMessage";

const useStyles = makeStyles({
  root: {},
  deplaneview: {
    display: "flex",
    flexFlow: "column nowrap",
    flexGrow: 1,
  },
  main: {
    display: "flex",
  },
});

const defaultOutlineStyles = (theme) => ({
  [categories.deplane.name]: {
    stroke: theme.palette.primary.main,
    strokeWidth: 0.65,
  },

  [categories.ds.name]: {
    stroke: theme.palette.primary.dark,
    strokeWidth: 0.15,
  },
});

const defaultVisibility = {
  [categories.deplane.name]: true,
  [categories.ds.name]: false,
  [categories.cluster.name]: false,
  [categories.pad.name]: false,
};

const DePlaneView = ({
  id,
  layers = [
    categories.deplane,
    categories.ds,
    categories.cluster,
    categories.pad,
  ],
}) => {
  // base layer is special : we must have its geometry to be able
  // to set the SVG stage
  const { isLoading, isError, geo } = useEnvelop(id);

  const [isVisible, setIsVisible] = useState(defaultVisibility);

  const classes = useStyles();

  const theme = useTheme();

  const layerStack = layers.map((layer) =>
    isVisible[layer.name]
      ? createLayer(layer, id, defaultOutlineStyles(theme)[layer.name])
      : null
  );

  const onVisibilityChange = (name, newValue) =>
    setIsVisible(
      produce((draft) => {
        draft[name] = newValue;
      })
    );

  if (isLoading === true) {
    return <CircularProgress />;
  }
  if (isError === true) {
    return (
      <ErrorMessage message="could not load data. is the mapping api alive?" />
    );
  }
  const xoff = geo ? -(geo.x - geo.sx / 2.0) : 0;
  const yoff = geo ? -(geo.y - geo.sy / 2.0) : 0;

  return (
    <div className={classes.deplaneview}>
      <DePlaneViewHeader id={id} drawer=<DataSourceSelectorSheet /> />
      <VisibilitySelectorBar
        elements={isVisible}
        onChange={onVisibilityChange}
      />
      <StatusBar />
      <section className={classes.main}>
        <SVGView
          geo={geo}
          initialOffset={{ x: xoff, y: yoff }}
          initialZoom={1.0}
        >
          {layerStack}
          <SVGHighlighter id={id} color="red" />
        </SVGView>
        <div>{geo ? null : <h1>something is wrong</h1>}</div>
      </section>
    </div>
  );
};

DePlaneView.propTypes = {
  id: PropTypes.shape({
    deid: PropTypes.number,
    bending: PropTypes.bool,
  }).isRequired,
  layers: PropTypes.array,
};

export default DePlaneView;
