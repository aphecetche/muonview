import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Header from "../layout/Header";
import DePlaneSelector from "../selectors/DePlaneSelector";
import StorageIcon from "@material-ui/icons/Storage";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";

const DePlaneViewHeader = ({ id, drawer }) => {
  const history = useHistory();
  const [drawerIsOpen, setDrawerIsOpen] = useState(true);
  const toggleDrawer = () => {
    setDrawerIsOpen(!drawerIsOpen);
  };

  return (
    <>
      <Header>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Typography>Detection Element Plane View</Typography>
          </Grid>
          <Grid item>
            <DePlaneSelector
              id={id}
              setId={({ deid, bending }) => {
                history.push({
                  pathname: "/deplane",
                  search: `?deid=${deid}&bending=${bending}`,
                });
              }}
            />
          </Grid>
          <Grid item>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="storage"
              onClick={toggleDrawer}
            >
              <StorageIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Header>
      {drawer && (
        <Drawer anchor="right" open={drawerIsOpen} onClose={toggleDrawer}>
          {React.cloneElement(drawer, { onClose: toggleDrawer })}
        </Drawer>
      )}
    </>
  );
};

DePlaneViewHeader.propTypes = {
  id: PropTypes.shape({
    deid: PropTypes.number,
    bending: PropTypes.bool,
  }).isRequired,
  drawer: PropTypes.node,
};

export default DePlaneViewHeader;
