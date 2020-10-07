import React from "react";
//import DataSourceList from "components/DataSourceList"
import DePlane from "components/DePlane";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          height: "100%"
        },
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    display: "flex",
    width: "100%"
  },
  div: {
    display: "flex",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <div className={classes.div}>
          <DePlane deid={300} bending={true} />
        </div>
        <div className={classes.div}>
          <DePlane deid={500} bending={true} />
        </div>
        <div className={classes.div}>
          <DePlane deid={1025} bending={true} />
        </div>
        <div className={classes.div}>
          <DePlane deid={302} bending={true} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
