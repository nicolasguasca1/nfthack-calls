import React, { useContext } from "react";
import { Button } from "@chakra-ui/react";

import styles from "../../styles/CallPageFooter.module.css";

import { SocketContext } from "../../Store";

const CallPageNotifications = () => {
  const { answerCall, call, callAccepted, user } =
    useContext<any>(SocketContext);

  return (
    <div className={styles.icon_block_left_item}>
      {call.isReceivingCall && !callAccepted && (
        <div>
          <h1>{user?.attributes.username} wants to join your room!</h1>
          <Button colorScheme="teal" variant="outline" onClick={answerCall}>
            Accept
          </Button>
        </div>
      )}
    </div>
  );
};

export default CallPageNotifications;
