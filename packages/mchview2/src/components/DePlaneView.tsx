import * as React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useGetBoundingBoxDePlaneQuery, BoundingBox } from "../__generated__/graphql-react";
import DePlane from "components/DePlane"
import DualSampas from "components/DualSampas"
import SVGView from "components/SVGView"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
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
  return (
    <>
      <SVGView boundingBox={bbox} className={classes.root}>
      <DualSampas deid={deid} bending={bending} />
      <DePlane deid={deid} bending={bending} />
      {children}
      </SVGView>
    </>
  );
};

export default DePlaneView;
