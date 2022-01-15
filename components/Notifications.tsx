import React, { useContext } from "react";
import { Button, Container } from "@material-ui/core";

import { SocketContext } from "../Store";

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext<any>(SocketContext);

  return (
    <Container>
      {call.isReceivingCall && !callAccepted && (
        <div>
          <h1>{call.name} is calling!</h1>
          <Button variant="contained" color="primary" onClick={answerCall}>
            Answer
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Notifications;
