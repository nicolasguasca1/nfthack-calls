import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle,
  faExclamationCircle,
  faCog
} from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@chakra-ui/react";
import { SocketContext } from "../../Store";
import React, { useState, useContext, ReactChildren, ReactChild } from "react";
import { ChakraNextLinkButton, ChakraNextLink } from "./ChakraLinks";

const Header = () => {
  const { isAuthenticated, logout, user } = useContext<any>(SocketContext);
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <ChakraNextLink className={styles.action_btn} href="/">
          <Image
            className={styles.image}
            alt="logo"
            width="60"
            height="60"
            src="/squared.png"
          />
          <a className={styles.title}>Callties</a>
        </ChakraNextLink>
      </div>
      {isAuthenticated && (
        <div className={styles.action_btn}>
          <div className={styles.help_text}>
            <ChakraNextLinkButton
              colorScheme="red"
              variant="solid"
              className={styles.action_btn}
              onClick={() => logout()}
              href="/"
            >
              Logout {user !== null && user.attributes.username}
            </ChakraNextLinkButton>
          </div>

          <ChakraNextLinkButton
            className={styles.action_btn}
            href={{
              pathname: "/dashboard/[username]",
              query: { username: user.attributes.username }
            }}
          >
            Dashboard
          </ChakraNextLinkButton>

          <ChakraNextLinkButton
            className={styles.action_btn}
            href={{
              pathname: "/settings/[username]",
              query: { username: user.attributes.username }
            }}
          >
            Settings
          </ChakraNextLinkButton>
        </div>
      )}
    </div>
  );
};
export default Header;
