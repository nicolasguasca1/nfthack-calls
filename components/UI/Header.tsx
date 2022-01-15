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
import ChakraNextLinkButton from "./ChakraNextLinkButton";

const Header = () => {
  const { isAuthenticated, logout, user } = useContext<any>(SocketContext);
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <ChakraNextLinkButton className={styles.action_btn} href="/">
          <Image
            className={styles.image}
            alt="logo"
            width="60"
            height="60"
            src="/squared.png"
          />
        </ChakraNextLinkButton>

        <Link passHref href="/">
          <Image
            className={styles.image}
            alt="logo"
            width="60"
            height="60"
            src="/squared.png"
          />
        </Link>
        <Link passHref href="/">
          <button className={styles.title}>Callties</button>
        </Link>
      </div>
      {isAuthenticated && (
        <div className={styles.action_btn}>
          <div className={styles.help_text}>
            <Link passHref href="/">
              <Button
                colorScheme="red"
                variant="solid"
                onClick={() => logout()}
              >
                Logout {user !== null && user.attributes.username}
              </Button>
            </Link>
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

          {/* <Link
            passHref
            href={{
              pathname: "/dashboard/[username]",
              query: { username: user.attributes.username }
            }}
          >
            <button className={styles.help_text}>Dashboard</button>
          </Link> */}

          <ChakraNextLinkButton
            className={styles.action_btn}
            href={{
              pathname: "/settings/[username]",
              query: { username: user.attributes.username }
            }}
          >
            Settings
          </ChakraNextLinkButton>
          {/* <Link passHref href="/settings/[username]">
            <button className={styles.help_text}>Settings</button>
          </Link> */}
        </div>
      )}
    </div>
  );
};
export default Header;
