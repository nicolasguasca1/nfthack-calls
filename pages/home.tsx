import React, { useState, useContext, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faKeyboard } from "@fortawesome/free-solid-svg-icons";
// import shortid from "shortid";
import Page from "../components/UI/Page";
import { Input, InputGroup, InputLeftElement, Button } from "@chakra-ui/react";

import styles from "../styles/Home.module.css";

import { SocketContext } from "../Store";

import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import profilePic from "/Users/nicolasguascasantamaria/Documents/GitHub/eth-online-hackathon/public/picture.jpg";
import { ExternalLinkIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";
import Spinner from "@chakra-ui/react";

const Home = (props: any) => {
  // const history = useHistory();
  const {
    me,
    setAdmin,
    callAccepted,
    name,
    setName,
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
  const [idToCall, setIdToCall] = useState("");

  // const startCall = () => {
  //   const uid = shortid.generate();
  //   history.push(`/${uid}#init`);
  // };
  const router = useRouter();
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
              <Link
                passHref
                // href="/call/[username]"
                // as={`/call/${user?.attributes.username}`}
                href="/callpage"
              >
                <Button
                  loadingText="Loading"
                  colorScheme="teal"
                  variant="outline"
                  spinnerPlacement="start"
                  className={styles.btn}
                  onClick={setAdmin(true)}
                >
                  New Meeting
                </Button>
              </Link>
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
                {/* {callAccepted && !callEnded ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<PhoneDisabled fontSize="large" />}
                    fullWidth
                    onClick={leaveCall}
                    // className={classes.margin}
                  >
                    Hang Up
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Phone fontSize="large" />}
                    fullWidth
                    onClick={() => callUser(idToCall)}
                    // className={classes.margin}
                  >
                    Call
                  </Button>
                )} */}
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
                  <Link
                    passHref
                    // href="/call/[username]"
                    // as={`/call/${user?.attributes.username}`}
                    href="/callpage"
                  >
                    <button
                      className={styles.btn}
                      onClick={() => {
                        callUser(idToCall), setGuest(true);
                      }}
                    >
                      Join
                    </button>
                  </Link>
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
