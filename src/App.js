import React, { useEffect, useRef } from "react";
import { Grid } from "@material-ui/core";

import { SpeechState, useSpeechContext } from "@speechly/react-client";
import { PushToTalkButton } from "@speechly/react-ui";

import { Details, Main } from "./components";
import useStyles from "./styles";
import Graphs from "./components/Graphs/Graphs";

const App = () => {
  const classes = useStyles();
  const { speechState } = useSpeechContext();
  const main = useRef(null);

  const executeScroll = () => main.current.scrollIntoView();

  useEffect(() => {
    if (speechState === SpeechState.Recording) {
      executeScroll();
    }
  }, [speechState]);

  return (
    <div>
      <Grid
        className={classes.grid}
        container
        spacing={0}
        alignItems="center"
        justify="center"
        style={{ height: "100vh" }}
      >
        <Grid ref={main} item xs={12} sm={5} xl={3} className={classes.main}>
          <Main />
        </Grid>
        <Grid
          className={classes.grid}
          spacing={0}
          alignItems="center"
          justify="center"
          style={{ height: "100vh", width: "140vh" }}
        >
          <Grid className={classes.bar}>
            <Graphs title="bar" />
          </Grid>
          <Grid className={classes.desktop}>
            <Graphs title="bar" />
          </Grid>
          <Grid
            className={classes.grid}
            container
            spacing={0}
            alignItems="center"
            justify="center"
            style={{ height: "50vh", margin: "0" }}
          >
            <Grid item xs={12} sm={4} md={3} className={classes.mobile}>
              <Details title="Income" />
            </Grid>
            <Grid item xs={12} sm={4} md={3} className={classes.mobile}>
              <Details title="Expense" />
            </Grid>
            <Grid item xs={12} sm={5} className={classes.last}>
              <Graphs title="line" />
            </Grid>
          </Grid>
        </Grid>
        <div style={{ position: "fixed", bottom: "0px" }}>
          <PushToTalkButton size="4rem" />
        </div>
      </Grid>
    </div>
  );
};

export default App;
