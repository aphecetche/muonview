import * as React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useGetDualSampasEnvelopQuery } from "../__generated__/graphql-react";
import Polygon from "components/Polygon";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    border: `1px solid ${theme.palette.primary.main}`,
  },
  polygon: {
    strokeWidth: "0.5",
    stroke: theme.palette.secondary.main,
    fill: "none"
  },
}));

type DualSampasProps = {
  deid: number;
  bending: boolean;
  children?: React.ReactNode;
};

const DualSampas = ({ deid, bending, children }: DualSampasProps) => {
  const { data, loading, error } = useGetDualSampasEnvelopQuery({
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
  const envelop = data?.envelopDePlaneDualSampas;
  const dualSampas = envelop?.map((e) => {
    const poly = { id: e?.id!, envelop: e! };
    return <Polygon key={poly.id} poly={poly} className={classes.polygon} />;
  });
  return (
    <>
      {dualSampas}
      {children}
    </>
  );
};

export default DualSampas;
