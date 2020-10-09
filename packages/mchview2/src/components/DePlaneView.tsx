import * as React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useGetBoundingBoxDePlaneQuery, BoundingBox } from "../__generated__/graphql-react";
import DePlane from "components/DePlane"
import DualSampas from "components/DualSampas"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));

type DePlaneViewProps = {
  deid: number;
  bending: boolean;
  children?: React.ReactNode;
};

const DePlaneView = ({ deid, bending, children }: DePlaneViewProps) => {
  const { data, loading, error } = useGetBoundingBoxDePlaneQuery({
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
  if (!data) {
    return (
      <Alert variant="outlined" severity="error">
        Something went wrong : no data
      </Alert>
    );
  }
  const bbox: BoundingBox = data.boundingBoxDePlane
  const width = bbox?.xmax - bbox?.xmin;
  const height = bbox?.ymax - bbox?.ymin;
  const viewBox = `${bbox.xmin} ${bbox.ymin} ${width} ${height}`;
  return (
    <>
      <svg viewBox={viewBox} className={classes.root}>
      <DualSampas deid={deid} bending={bending} />
      <DePlane deid={deid} bending={bending} />
      {children}
      </svg>
    </>
  );
};

export default DePlaneView;
