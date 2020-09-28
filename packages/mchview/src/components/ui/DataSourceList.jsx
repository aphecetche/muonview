import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import GetAppIcon from "@material-ui/icons/GetApp";
import PropTypes from "prop-types";

const defaultDataSources = [
  {
    id: 1,
    filename: "/Users/laurent/cernbox/o2muon/dpl-digits.bin",
    format: "dplsink",
    kind: "digits",
    sha256: "33106022e64a712ec3b5eb8becb7e81c8c0a3196",
    indexSize: 931,
  },
  {
    id: 2,
    filename: "/Users/laurent/cernbox/o2muon/digits.v2.in",
    format: "mchbin",
    kind: "digits",
    sha256: "9a84440af8532d95784a70394703a85cdbcd19ac",
    indexSize: 931,
  },
];

const DataSourceList = ({ dataList = defaultDataSources }) => {
  const list = dataList.map((x) => {
    const sub = `${x.format} - ${x.indexSize} events`;
    return (
      <ListItem key={x.sha256}>
        <ListItemText primary="digits" />
        <ListItemText primary={x.filename} secondary={sub} />
        <ListItemSecondaryAction>
          <IconButton aria-label="load">
            <GetAppIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  });
  return <List>{list}</List>;
};

DataSourceList.propTypes = {
  dataList: PropTypes.arrayOf(
    PropTypes.shape({
      format: PropTypes.string,
      indexSize: PropTypes.number,
      filename: PropTypes.filename,
    })
  ),
};
export default DataSourceList;
