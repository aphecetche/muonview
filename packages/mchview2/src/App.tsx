import React from "react";
//import DataSourceList from "components/DataSourceList"
import DePlane from "components/DePlane";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Target from "components/Target"

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
          <DePlane deid={300} bending={true} >
          <Target x={0} y={0} color="pink" scale={5.0} />
          <Target x={100} y={100} color="pink" scale={5.0} />
          </DePlane>
        </div>
        <div className={classes.div}>
          <DePlane deid={500} bending={true} >
          <Target x={0} y={0} color="yellow" scale={5.0} />
          </DePlane>
        </div>
        <div className={classes.div}>
          <DePlane deid={1025} bending={true} >
          <Target x={0} y={0} color="green" scale={5.0} />
          </DePlane>
        </div>
        <div className={classes.div}>
          <DePlane deid={302} bending={true}>
          <Target x={0} y={0} color="red" scale={5.0} />
          </DePlane>

        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
