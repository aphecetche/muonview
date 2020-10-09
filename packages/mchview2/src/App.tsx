import React from "react";
//import DataSourceList from "components/DataSourceList"
import DePlaneView from "components/DePlaneView";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Target from "components/Target";
import {
  useCurrentElement,
  CurrentElementProvider,
} from "contexts/CurrentElementContext";

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
    width: "100%",
  },
}));

const CurrentElementDisplay = () => {
  const ce = useCurrentElement();
  return (
    <div>
      <h2>
        CurrentElement: 
        {ce?.currentElement?.id}
      </h2>
    </div>
  );
};

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CurrentElementProvider>
        <CurrentElementDisplay />
        <div className={classes.root}>
          <div className={classes.div}>
            <DePlaneView deid={300} bending={true}>
              <Target x={0} y={0} color="pink" scale={5.0} />
              <Target x={100} y={100} color="pink" scale={5.0} />
            </DePlaneView>
          </div>
        </div>
      </CurrentElementProvider>
    </ThemeProvider>
  );
}

export default App;
