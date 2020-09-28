import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import index from "./index.json";
import DataSourceSlider from "../selectors/DataSourceSlider";
import { actions } from "../../ducks/data";
import multidispatch from "../../actionHelper";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import SheetTitle from "../ui/SheetTitle";
import DataSourceList from "../ui/DataSourceList";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80vw",
    height: "100vh",
  },
  current: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },

  list: {
    margin: theme.spacing(1),
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(2),
  },
}));

const getItems = (sample) =>
  sample.index.map((x) => {
    return {
      size: (x.end - x.start) / sample.elemsize,
      data: null,
      isLoaded: false,
      isError: false,
    };
  });

const DataSourceSelectorSheet = ({ title = "Data Sources", onClose }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const dataSource = {
    url: "http://localhost:3000",
    name: "/Users/laurent/cernbox/o2muon/dpl-digits.bin",
    sha256: "33106022e64a712ec3b5eb8becb7e81c8c0a3196",
  };

  const ix0 = 1;

  const [sourceRef, setSourceRef] = useState({
    url: dataSource.url,
    sha256: dataSource.sha256,
    ix: ix0,
  });

  const isError = sourceRef.ix % 2 === 0;
  const isLoading = sourceRef.ix % 4 === 0;

  useEffect(() => {
    multidispatch(
      dispatch,
      actions.fetchDigits(sourceRef.url, sourceRef.sha256, sourceRef.ix)
    );
  }, [sourceRef]);

  let items = getItems(index);
  items[1].isLoaded = true;
  items[2].isError = true;

  return (
    <div className={classes.root}>
      <SheetTitle onClose={onClose} title={title} />
      <Card className={classes.current} elevation={4}>
        <CardHeader title="Currently selected data source" />
        <CardContent>
          <DataSourceSlider
            name={dataSource.name}
            items={items}
            description="dplsink"
            kind="digits"
            initialValue={ix0}
            isLoading={isLoading}
            isError={isError}
            onClick={(ix) =>
              setSourceRef({
                url: dataSource.url,
                sha256: dataSource.sha256,
                ix: ix,
              })
            }
          />
        </CardContent>
      </Card>
      <Card className={classes.list}>
        <CardHeader title="Available data sources" />
        <CardContent>
          <DataSourceList />
        </CardContent>
        <CardActions className={classes.actions}>
          <Fab variant="extended" color="primary" aria-label="add">
            <AddIcon />
            Search new sources
          </Fab>
        </CardActions>
      </Card>
    </div>
  );
};

DataSourceSelectorSheet.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
};
export default DataSourceSelectorSheet;
