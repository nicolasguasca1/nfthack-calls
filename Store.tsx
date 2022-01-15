import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

import { useRouter } from "next/router";

import { useMoralis } from "react-moralis";

const SocketContext = createContext({});

const socket = io("http://localhost:5000");
// const socket = io("https://warm-wildwood-81069.herokuapp.com");

const ContextProvider = ({ children }: any) => {
  const router = useRouter();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState<MediaStream>();
  const [name, setName] = useState("");
  const [call, setCall] = useState<any>({});
  const [me, setMe] = useState("");
  const [isAdmin, setAdmin] = useState(false);
  const [isGuest, setGuest] = useState(false);

  const myVideo = useRef<HTMLVideoElement>(null!);
  const userVideo = useRef<HTMLVideoElement>(null!);
  const connectionRef = useRef<Peer.Instance>(null!);

  // EXPERIMENTAL
  const {
    isAuthenticated,
    isUnauthenticated,
    logout,
    user,
    authenticate,
    isAuthenticating,
    authError,
    signup,
    login
  } = useMoralis();

  // useEffect(() => {
  //   navigator.mediaDevices
  //     .getUserMedia({ video: true, audio: true })
  //     .then((currentStream) => {
  //       setStream(currentStream);
  //       if (myVideo.current) {
  //         myVideo.current.srcObject = currentStream;
  //       }
  //     });

  //   socket.on("me", (id) => {
  //     setMe(id);
  //   });

  //   socket.on("callUser", ({ from, name: callerName, signal }) => {
  //     setCall({ isReceivingCall: true, from, name: callerName, signal });
  //   });
  // }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      if (userVideo.current) userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id: String) => {
    // setAdmin(false);
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", async (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name
      });
    });

    peer.on("stream", (currentStream) => {
      if (userVideo.current) userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });
    if (connectionRef.current) connectionRef.current = peer;
  };

  function leaveCall() {
    setCallEnded(true);
    setAdmin(false);
    if (connectionRef.current) connectionRef.current.destroy();
    // if (typeof window !== "undefined") window.location.reload();
    router.push("/home");
  }

  return (
    <SocketContext.Provider
      value={{
        call,
        setCall,
        callAccepted,
        setCallAccepted,
        myVideo,
        userVideo,
        stream,
        setStream,
        name,
        setName,
        callEnded,
        setCallEnded,
        me,
        setMe,
        isAdmin,
        setAdmin,
        callUser,
        leaveCall,
        answerCall,
        router,
        isGuest,
        setGuest,
        user,
        isAuthenticated,
        isUnauthenticated,
        logout,
        authenticate,
        isAuthenticating,
        authError,
        signup,
        login
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
