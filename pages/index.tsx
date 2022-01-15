import { AppBar } from "@material-ui/core";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

// import Image from "next/image";
import React, { useEffect, useContext } from "react";
import styles from "../styles/Home.module.css";

import VideoPlayer from "../components/VideoPlayer";
import Notifications from "../components/Notifications";
import Options from "../components/Options";

import { Button } from "@chakra-ui/react";
import { Container, Heading } from "@chakra-ui/layout";
import Login from "./login";
import Home from "./home";
import Page from "components/UI/Page";

import { SocketContext } from "../Store";

const Landing: NextPage = () => {
  const router = useRouter();
  const { isUnauthenticated } = useContext<any>(SocketContext);

  useEffect(() => {
    if (isUnauthenticated) {
      router.push("/login");
    } else {
      <Home />;
    }
  }, [isUnauthenticated]);

  return (
    <Page>
      <main className={styles.main}>
        <h1 className={styles.title}>Video Calls!</h1>
        <Container align="center">
          <Login></Login>
        </Container>
        {/* <PlayerCSS /> */}
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          <span className={styles.logo}>
            <div>Callties labs</div>
          </span>
        </a>
      </footer>
    </Page>
  );
};

export default Landing;
