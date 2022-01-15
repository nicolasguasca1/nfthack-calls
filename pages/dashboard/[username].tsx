import React, { useState, useContext } from "react";
// import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faKeyboard } from "@fortawesome/free-solid-svg-icons";
// import shortid from "shortid";
// import "./HomePage.scss";
import Page from "components/UI/Page";

import Header from "../../components/UI/Header";

import { SocketContext } from "../../Store";

import { useRouter } from "next/router";
import Link from "next/link";

const UserCall = () => {
  // const history = useHistory();
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } =
    useContext<any>(SocketContext);
  // const startCall = () => {
  //   const uid = shortid.generate();
  //   history.push(`/${uid}#init`);
  // };
  const router = useRouter();
  const { id } = router.query;

  return (
    <Page>
      <div className="home-page">
        {/* <Header /> */}
        <div className="body">
          <div className="left-side">
            <div className="content">
              <h2>BUILD THE USER PROFILE HERE</h2>
              <p>W...</p>
              <div className="action-btn">
                <Link
                  className="btn green"
                  href="/dashboard/[userId]"
                  as={`/dashboard/${me}/`}
                >
                  {/* <FontAwesomeIcon className="icon-block" icon={faVideo} /> */}
                  New Meeting
                </Link>
                <div className="input-block">
                  <div className="input-section">
                    <FontAwesomeIcon className="icon-block" icon={faKeyboard} />
                    <input placeholder="Enter a code or link" />
                  </div>
                  <button className="btn no-bg">Join</button>
                </div>
              </div>
            </div>
            <div className="help-text">
              <a href="">Learn more</a> about Google Meet
            </div>
          </div>
          <div className="right-side">
            <div className="content">
              {/* <img src="https://www.gstatic.com/meet/google_meet_marketing_ongoing_meeting_grid_427cbb32d746b1d0133b898b50115e96.jpg" /> */}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};
export default UserCall;
