import * as React from "react"
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useGetEnvelopDePlaneQuery } from "../__generated__/graphql-react"
import Polygon from "components/Polygon"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    border: `1px solid ${theme.palette.primary.main}`,
    padding: theme.spacing(2)
  },
}));


type DePlaneProps = { deid: number, bending: boolean }

const DePlane = ({deid,bending}:DePlaneProps) => {
  const { data, loading, error } = useGetEnvelopDePlaneQuery(
    { variables: { deid, bending} }
  );
  const classes = useStyles()
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    console.log(error)
    return <Alert variant="outlined" severity="error">Something went wrong</Alert>;
  }
    const envelop = data?.envelopDePlane
    const poly = { id: data?.envelopDePlane?.id!, envelop: envelop!}
    const viewBox = `0 0 ${envelop?.size.sx} ${envelop?.size.sy}`
    return (
    <>
    <svg viewBox={viewBox} className={classes.root}>
    <Polygon poly={poly} fillColor="blue"/>
    </svg>
    </>
    )
}

export default DePlane
