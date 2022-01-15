import React, { useState, useContext, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faKeyboard } from "@fortawesome/free-solid-svg-icons";
// import shortid from "shortid";
import Page from "../components/UI/Page";
import { Input, InputGroup, InputLeftElement, Button } from "@chakra-ui/react";

import styles from "../styles/Home.module.css";

import { SocketContext } from "../Store";
import io from "socket.io-client";
const socket = io("http://localhost:5000");

import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import profilePic from "/Users/nicolasguascasantamaria/Documents/GitHub/eth-online-hackathon/public/picture.jpg";
import { ExternalLinkIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";
import Spinner from "@chakra-ui/react";

import {
  ChakraNextLinkButton,
  ChakraNextLink
} from "components/UI/ChakraLinks";

const Home = (props: any) => {
  // const history = useHistory();
  const {
    setMe,
    me,
    setAdmin,
    callAccepted,
    setStream,
    myVideo,
    name,
    setName,
    setCall,
    callEnded,
    leaveCall,
    callUser,
    setGuest,
    isAuthenticating,
    isAuthenticated,
    isUnauthenticated,
    logout,
    user
  } = useContext<any>(SocketContext);
  const router = useRouter();

  const [idToCall, setIdToCall] = useState("");

  // const startCall = () => {
  //   const uid = shortid.generate();
  //   history.push(`/${uid}#init`);
  // };
  // const { id } = router.query;
  useEffect(() => {
    if (isUnauthenticated) {
      router.push("/login");
    }
  }, [isUnauthenticated]);

  if (callEnded) {
    router.reload();
    setAdmin(false);
  }

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      });

    socket.on("me", (id) => {
      setMe(id);
      setName(user?.attributes.username);
    });

    // socket.on("callUser", ({ from, name: callerName, signal }) => {
    //   setCall({ isReceivingCall: true, from, name: callerName, signal });
    // });
  }, []);

  return (
    <Page>
      <div className={styles.body}>
        <div className={styles.left_side}>
          <div>
            <h2 className={styles.h2}>Welcome to a Web3 Live experience</h2>
            <p className={styles.p}>
              By using Callties, you are able to convert a meeting into a
              live-video creative factory. By pressing `New meeting`, you accept
              and acknowledge you are not using copyrighted content to make your
              creations.
            </p>
            <div className={styles.action_btn}>
              <ChakraNextLinkButton
                className={styles.btn}
                href={`/call/${me}`}
                loadingText="Loading"
                colorScheme="teal"
                variant="outline"
                spinnerPlacement="start"
                onClick={setAdmin(true)}
              >
                New Meeting
              </ChakraNextLinkButton>

              <span className={styles.p}>or</span>
              <div className={styles.input_block}>
                <div className={styles.input_section}>
                  <InputGroup className={styles.input}>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<ExternalLinkIcon color="gray.300" />}
                    />
                    <Input
                      placeholder="Enter a code or link"
                      onChange={(e) => setIdToCall(e.target.value)}
                    />
                  </InputGroup>
                </div>
                {callAccepted && !callEnded ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    // startIcon={<PhoneDisabled fontSize="large" />}
                    fullWidth
                    onClick={leaveCall}
                    // className={classes.margin}
                  >
                    Hang Up
                  </Button>
                ) : (
                  <ChakraNextLink
                    href="/callpage"
                    className={styles.btn}
                    onClick={() => {
                      callUser(idToCall), setGuest(true);
                    }}
                  >
                    Join
                  </ChakraNextLink>

                  // <button
                  //   className={styles.btn}
                  //   onClick={() => callUser(idToCall)}
                  // >
                  //   Join
                  // </button>
                )}
                {/* <button
                  className={styles.btn}
                >
                  Join
                </button> */}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right_side}>
          <div>
            <Image
              className={styles.img}
              width="1024"
              height="681"
              src={profilePic}
              alt="The bunch of computers that run the world"
            />
          </div>
        </div>
      </div>
    </Page>
  );
};
export default Home;
