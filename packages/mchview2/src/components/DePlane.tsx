import * as React from "react"
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { gql, useQuery } from "@apollo/client";
import * as QueryTypes from "./__generated__/GetEnvelopDePlane"
import { makeStyles } from "@material-ui/core/styles";
import { useGetEnvelopDePlaneQuery } from "../__generated__/graphql-react"

//  * const { data, loading, error } = useGetEnvelopDePlaneQuery({
//  *   variables: {
//  *      deid: // value for 'deid'
//  *   },

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
}));


type DePlaneProps = { deid: number, bending: boolean }

const DePlane = ({deid,bending}:DePlaneProps) => {
  const { data, loading, error } = useGetEnvelopDePlaneQuery(
    { variables: { deid } }
  );
  const classes = useStyles()
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    console.log(error)
    return <Alert variant="outlined" severity="error">Something went wrong</Alert>;
  }
    return (
    <>
    <h2>{data?.envelopDePlane?.id}</h2>
    <pre className={classes.root}>{JSON.stringify(data?.envelopDePlane)}</pre>
    </>
    )
}

export default DePlane
