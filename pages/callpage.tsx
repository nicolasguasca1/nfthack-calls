import { useEffect, useReducer, useState, useContext } from "react";
// import { useParams, useHistory } from "react-router-dom"; DONE WITH ROUTER
// import { getRequest, postRequest } from "../utils/apiRequests";  DONE IN SERVER!
// import { BASE_URL, GET_CALL_ID, SAVE_CALL_ID } from "../utils/apiEndpoints";
import io from "socket.io-client";
import styles from "../styles/CallPage.module.css";
import Peer from "simple-peer";
import Messenger from "../components/UI/Messenger";
import MessageListReducer from "../reducers/MessageListReducer";
import Alert from "../components/UI/Alert";
import MeetingInfo from "../components/UI/MeetingInfo";
import CallPageFooter from "../components/UI/CallPageFooter";
import CallPageHeader from "../components/UI/CallPageHeader";
import Notifications from "../components/Notifications";
// import CallPageNotifications from "../components/UI/CallPageNotifications";

import VideoPlayer from "../components/VideoPlayer";

import Page from "../components/UI/Page";
import Link from "next/link";
import Head from "next/head";
import { Moralis } from "moralis";

import { SocketContext } from "../Store";
const socket = io("http://localhost:5000");

// async function getCloud() {
//   // Fetch data from external API
//   const cloud = await Moralis.Cloud.run("cloud");
//   const users = cloud.map((ParseUser: { attributes: { username: any } }) => ({
//     params: {
//       username: ParseUser.attributes.username
//     }
//   }));
//   console.log(users);
//   return users;
//   return cloud;
// }

// let peer = null;
// const socket = io.connect(process.env.REACT_APP_BASE_URL);
const initialState: [] = [];

const CallPage = () => {
  // getCloud();
  const {
    isAdmin,
    setStream,
    myVideo,
    setMe,
    setName,
    setCall,
    isAuthenticated,
    isUnauthenticated,
    logout,
    user
  } = useContext<any>(SocketContext);
  if (isUnauthenticated) {
    return (
      <Page>
        <div className={styles.no_match_content}>
          <h2 className={styles.h2_no_match}>
            Please login first to access a call.
          </h2>
          <div className={styles.btn_no_match}>
            <Link passHref href="/login">
              Login
            </Link>
          </div>
        </div>
      </Page>
    );
  }
  // const history = useHistory();
  // let { id } = useParams();
  // const isAdmin = window.location.hash == "#init" ? true : false;
  // const url = `${window.location.origin}${window.location.pathname}`;
  let alertTimeout = null;

  const [messageList, messageListReducer] = useReducer(
    MessageListReducer,
    initialState
  );

  const [streamObj, setStreamObj] = useState();
  const [screenCastStream, setScreenCastStream] = useState();
  const [meetInfoPopup, setMeetInfoPopup] = useState(false);

  const [isPresenting, setIsPresenting] = useState(false);
  const [isMessenger, setIsMessenger] = useState(false);
  const [messageAlert, setMessageAlert] = useState({});
  const [isAudio, setIsAudio] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      setMeetInfoPopup(true);
    }
    // initWebRTC();
    // socket.on("code", (data) => {
    //   if (data.url === url) {
    //     peer.signal(data.code);
    //   }
    // });
  }, []);

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

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  //   const getRecieverCode = async () => {
  //     const response = await getRequest(`${BASE_URL}${GET_CALL_ID}/${id}`);
  //     if (response.code) {
  //       peer.signal(response.code);
  //     }
  //   };

  //   const initWebRTC = () => {
  //     navigator.mediaDevices
  //       .getUserMedia({
  //         video: true,
  //         audio: true
  //       })
  //       .then((stream) => {
  //         setStreamObj(stream);

  //         peer = new Peer({
  //           initiator: isAdmin,
  //           trickle: false,
  //           stream: stream
  //         });

  //         if (!isAdmin) {
  //           getRecieverCode();
  //         }

  //         peer.on("signal", async (data) => {
  //           if (isAdmin) {
  //             let payload = {
  //               id,
  //               signalData: data
  //             };
  //             await postRequest(`${BASE_URL}${SAVE_CALL_ID}`, payload);
  //           } else {
  //             socket.emit("code", { code: data, url }, (cbData) => {
  //               console.log("code sent");
  //             });
  //           }
  //         });

  //         peer.on("connect", () => {
  //           // wait for 'connect' event before using the data channel
  //         });

  //         peer.on("data", (data) => {
  //           clearTimeout(alertTimeout);
  //           messageListReducer({
  //             type: "addMessage",
  //             payload: {
  //               user: "other",
  //               msg: data.toString(),
  //               time: Date.now()
  //             }
  //           });

  //           setMessageAlert({
  //             alert: true,
  //             isPopup: true,
  //             payload: {
  //               user: "other",
  //               msg: data.toString()
  //             }
  //           });

  //           alertTimeout = setTimeout(() => {
  //             setMessageAlert({
  //               ...messageAlert,
  //               isPopup: false,
  //               payload: {}
  //             });
  //           }, 10000);
  //         });

  //         peer.on("stream", (stream) => {
  //           // got remote video stream, now let's show it in a video tag
  //           let video = document.querySelector("video");

  //           if ("srcObject" in video) {
  //             video.srcObject = stream;
  //           } else {
  //             video.src = window.URL.createObjectURL(stream); // for older browsers
  //           }

  //           video.play();
  //         });
  //       })
  //       .catch(() => {});
  //   };

  // const sendMsg = (msg) => {
  //   peer.send(msg);
  //   messageListReducer({
  //     type: "addMessage",
  //     payload: {
  //       user: "you",
  //       msg: msg,
  //       time: Date.now()
  //     }
  //   });
  // };

  // const screenShare = () => {
  //   navigator.mediaDevices
  //     .getDisplayMedia({ cursor: true })
  //     .then((screenStream) => {
  //       peer.replaceTrack(
  //         streamObj.getVideoTracks()[0],
  //         screenStream.getVideoTracks()[0],
  //         streamObj
  //       );
  //       setScreenCastStream(screenStream);
  //       screenStream.getTracks()[0].onended = () => {
  //         peer.replaceTrack(
  //           screenStream.getVideoTracks()[0],
  //           streamObj.getVideoTracks()[0],
  //           streamObj
  //         );
  //       };
  //       setIsPresenting(true);
  //     });
  // };

  // const stopScreenShare = () => {
  //   screenCastStream.getVideoTracks().forEach(function (track) {
  //     track.stop();
  //   });
  //   peer.replaceTrack(
  //     screenCastStream.getVideoTracks()[0],
  //     streamObj.getVideoTracks()[0],
  //     streamObj
  //   );
  //   setIsPresenting(false);
  // };

  // const toggleAudio = (value) => {
  //   streamObj.getAudioTracks()[0].enabled = value;
  //   setIsAudio(value);
  // };

  // const disconnectCall = () => {
  //   peer.destroy();
  //   history.push("/");
  //   window.location.reload();
  // };

  return (
    <div className={styles.page_container}>
      <VideoPlayer className={styles.video_container} />

      <CallPageHeader
        isMessenger={isMessenger}
        setIsMessenger={setIsMessenger}
        messageAlert={messageAlert}
        setMessageAlert={setMessageAlert}
      />
      {/* <CallPageOptions> */}
      {/* <CallPageNotifications /> */}
      {/* </CallPageOptions> */}
      <CallPageFooter
        setMeetInfoPopup={setMeetInfoPopup}
        // isPresenting={isPresenting}
        // stopScreenShare={stopScreenShare}
        // screenShare={screenShare}
        // isAudio={isAudio}
        // toggleAudio={toggleAudio}
        // disconnectCall={disconnectCall}
      />

      {isAuthenticated && meetInfoPopup && (
        <MeetingInfo setMeetInfoPopup={setMeetInfoPopup} />
      )}
      {isMessenger ? (
        <Messenger
          setIsMessenger={setIsMessenger}
          // sendMsg={sendMsg}
          // messageList={messageList}
        />
      ) : (
        messageAlert.isPopup && <Alert messageAlert={messageAlert} />
      )}
    </div>
  );
};
export default CallPage;
