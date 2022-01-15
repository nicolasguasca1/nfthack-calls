import React, { useEffect, useState, useContext } from "react";
import styles from "../styles/Home.module.css";

import { useRouter } from "next/router";
import { Auth } from "../components/Auth";
import { Container, Heading } from "@chakra-ui/layout";
import Page from "components/UI/Page";
import { SocketContext } from "../Store";

const Login = () => {
  const router = useRouter();
  const { authenticate, isAuthenticating, isAuthenticated, authError } =
    useContext<any>(SocketContext);
  useEffect(() => {
    if (isAuthenticated) router.push("/home");
  }, [isAuthenticated]);

  return (
    <Page>
      <main className={styles.main}>
        <h1 className={styles.title}>Video Calls!</h1>
        <Container align="center">
          <Auth></Auth>
        </Container>
        {/* <PlayerCSS /> */}
      </main>
      <footer className={styles.footer}>
        <a target="_blank" rel="noopener noreferrer">
          Powered by
          <span className={styles.logo}>
            <div>Callties labs</div>
          </span>
        </a>
      </footer>
    </Page>
  );
};

export default Login;
