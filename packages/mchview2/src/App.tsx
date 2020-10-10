import React from "react";
//import DataSourceList from "components/DataSourceList"
import DePlaneView from "components/DePlaneView";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Target from "components/Target";
import { CurrentElementProvider } from "contexts/CurrentElementContext";
import { DePlaneId } from "__generated__/graphql-react";
import CurrentElement from "components/CurrentElement";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          height: "100%",
        },
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    display: "flex",
  },
  div: {
    display: "flex",
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));

function App() {
  const classes = useStyles();
  const des: Array<DePlaneId> = [
    {
      deid: 100,
      bending: false,
    },
    {
      deid: 100,
      bending: true,
    },
    {
      deid: 1025,
      bending: true,
    },
    {
      deid: 1025,
      bending: false,
    },
    {
      deid: 501,
      bending: true,
    },
    {
      deid: 501,
      bending: false,
    },
    {
      deid: 508,
      bending: true,
    },
    {
      deid: 508,
      bending: false,
    },
    {
      deid: 300,
      bending: false,
    },
    {
      deid: 301,
      bending: false,
    },
    {
      deid: 302,
      bending: false,
    },
    {
      deid: 303,
      bending: false,
    },
  ];
  const deplanes = des.map((d) => (
    <Grid key={`${d.deid}-${d.bending}`} item xs={3} className={classes.div}>
      <DePlaneView deid={d.deid} bending={d.bending}>
        <Target x={0} y={0} color="pink" scale={5.0} />
      </DePlaneView>
    </Grid>
  ));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CurrentElementProvider>
      <CurrentElement />
        <Grid container spacing={1} className={classes.root}>
          {deplanes}
        </Grid>
      </CurrentElementProvider>
    </ThemeProvider>
  );
}

export default App;
