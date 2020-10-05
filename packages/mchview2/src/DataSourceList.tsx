import React from "react";
import { gql, useQuery } from "@apollo/client";
import * as DataSourcesTypes from "./__generated__/DataSources";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import GetAppIcon from "@material-ui/icons/GetApp";

const GET_DATASOURCES = gql`
  query DataSources {
    datasources {
      id
      kind
      name
    }
  }
`;

const DataSourceList = () => {
  const { data, loading, error } = useQuery<DataSourcesTypes.DataSources>(
    GET_DATASOURCES
  );
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <Alert severity="error">Something went wrong</Alert>;
  }
  const list = data?.datasources?.map((x) => {
    if (!x) return null;
    const sub = "subheadline"; //`${x.format} - ${x.indexSize} events`;
    return (
      <ListItem key={x.id}>
        <ListItemText primary="digits" />
        <ListItemText primary={x.name} secondary={sub} />
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

export default DataSourceList;
