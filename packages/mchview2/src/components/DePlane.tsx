import * as React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import {
  useGetEnvelopDePlaneQuery,
  Vertex,
  Maybe,
} from "../__generated__/graphql-react";
import Polygon from "components/Polygon";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    border: `1px solid ${theme.palette.primary.main}`,
    //padding: theme.spacing(2),
  },
}));

type DePlaneProps = { deid: number; bending: boolean };

const computeViewBox = (
  vertices: Maybe<Array<Maybe<Vertex>>>
): { xmin: number; ymin: number; xmax: number; ymax: number } => {
  let xmin: number = Number.MAX_SAFE_INTEGER;
  let ymin: number = Number.MAX_SAFE_INTEGER;
  let xmax: number = -xmin;
  let ymax: number = -ymin;
  vertices?.map((v) => {
    xmin = Math.min(xmin, v?.x || 0.0);
    ymin = Math.min(ymin, v?.y || 0.0);
    xmax = Math.max(xmax, v?.x || 0.0);
    ymax = Math.max(ymax, v?.y || 0.0);
  });
  return { xmin, ymin, xmax, ymax };
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
  const bbox = computeViewBox(envelop!.vertices!);
  const width = bbox.xmax-bbox.xmin
  const height = bbox.ymax - bbox.ymin 
  const viewBox = `${bbox.xmin} ${bbox.ymin} ${width} ${height}`;
  return (
    <>
      <svg viewBox={viewBox} className={classes.root}>
        <Polygon poly={poly} fillColor="blue" />
      </svg>
    </>
  );
};

export default DePlane;
