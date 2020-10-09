import * as React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useGetEnvelopDePlaneQuery } from "../__generated__/graphql-react";
import Polygon from "components/Polygon";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    border: `1px solid ${theme.palette.primary.main}`,
  },
  polygon: {
    strokeWidth: "1.0",
    stroke: theme.palette.primary.main,
    fill: "none",
  },
}));

type DePlaneProps = {
  deid: number;
  bending: boolean;
};

const DePlane = ({ deid, bending }: DePlaneProps) => {
  const { data, loading, error } = useGetEnvelopDePlaneQuery({
    variables: { deid, bending },
  });
  const classes = useStyles();
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return (
      <Alert variant="outlined" severity="error">
        Something went wrong
      </Alert>
    );
  }
  const envelop = data?.envelopDePlane;
  const poly = { id: envelop?.id!, envelop: envelop! };
  return <Polygon poly={poly} className={classes.polygon} />;
};

export default DePlane;
