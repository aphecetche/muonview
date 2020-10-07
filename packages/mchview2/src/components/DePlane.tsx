import * as React from "react"
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useGetEnvelopDePlaneQuery } from "../__generated__/graphql-react"
import Polygon from "components/Polygon"

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
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
    const poly = { id: data?.envelopDePlane?.id!, envelop: data?.envelopDePlane! }

    return (
    <>
    <h2>{data?.envelopDePlane?.id}</h2>
    <pre className={classes.root}>{JSON.stringify(data?.envelopDePlane)}</pre>
    <svg viewBox="0 0 800 800">
    <Polygon poly={poly} fillColor="blue"/>
    </svg>
    </>
    )
}

export default DePlane
