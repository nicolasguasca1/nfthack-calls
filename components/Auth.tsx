import {
  Stack,
  Input,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Text
} from "@chakra-ui/react";
import React, { useState, useContext } from "react";
import { SocketContext } from "../Store";
import Account from "components/Account/Account";

import { useRouter } from "next/router";

export const Auth = () => {
  const {
    authenticate,
    isAuthenticating,
    authError,
    isAuthenticated,
    signup,
    login
  } = useContext<any>(SocketContext);
  const router = useRouter();

  const SignUp = () => {
    const [username, setUsername] = useState<string>(null!);
    const [email, setEmail] = useState<string>(null!);
    const [password, setPassword] = useState<string>(null!);

    return (
      <Stack spacing={3}>
        <Input
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
        <Button onClick={() => signup(username, password, email)}>
          Sign up
        </Button>
      </Stack>
    );
  };

  const Login = () => {
    const [username, setUsername] = useState<string>(null!);
    const [password, setPassword] = useState<string>(null!);

    return (
      <Stack spacing={3}>
        <Input
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
        <Button
          onClick={() => {
            login(username, password);
            router.push("/home");
          }}
        >
          Login
        </Button>
      </Stack>
    );
  };

  return (
    <Stack spacing={6}>
      {authError && (
        <Alert status="error">
          <AlertIcon />
          <Stack spacing={6} flex="1">
            <AlertTitle>Ups! Authentication has failed.</AlertTitle>
            <AlertDescription display="block">
              {authError.message}
            </AlertDescription>
          </Stack>
          {/* <CloseButton position="absolute" right="8px" top="8px" /> */}
        </Alert>
      )}
      <Account />
      <Text>
        <em>or</em>
      </Text>
      <SignUp />
      <Text>
        <em>or</em>
      </Text>
      <Login />
    </Stack>
  );
};
