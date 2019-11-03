import React, { useState } from "react";

import { FiArrowRightCircle } from "react-icons/fi";
import Avatar from "react-avatar";

import { randomColor } from "../_helpers";

import "./styles/Contributors.scss";

export default function Contributors(props) {
  const missingInvite = () => console.warn("Contributors component was not given an `onInvite` prop");
  const missingInvited = () => {
    console.warn("Contributors component was not given an `invited` prop");
    return [];
  };

  return (
    <div className="contributors">
      {!props.noTitle && <div>Contributors</div>}
      <ContributorSection color="gray" invited={props.invited || missingInvited()}>
        Invited
      </ContributorSection>
      <Invite onInvite={props.onInvite || missingInvite} />
      {props.children}
    </div>
  );
}

function ContributorSection(props) {
  const { color, invited, children } = props;

  return (
    <div className="section">
      <div className="title">{children}</div>
      <div className="users">
        {invited.map(invite => (
          <Contributor key={`invite/${invite}`} color={color}>
            {invite}
          </Contributor>
        ))}
      </div>
    </div>
  );
}

function Contributor(props) {
  const { color = undefined } = props;
  return (
    <div className="user">
      <Avatar name={props.children} src={props.image || null} color={randomColor(props.children)} round size={25} />
      <span className="name" style={{ color }}>
        {props.children}
      </span>
    </div>
  );
}

function Invite(props) {
  const [user, setUser] = useState("");

  let inputRef;
  const inviteUser = () => {
    props.onInvite(user);
    setUser("");
    inputRef.focus();
  };

  return (
    <div className="invite">
      <div className="title">Invite Someone</div>
      <div className="field">
        <input
          className="clear-input"
          placeholder="username"
          autoComplete="off"
          value={user}
          onChange={e => setUser(e.currentTarget.value)}
          onKeyDown={e => (e.key === "Enter" ? inviteUser() : null)}
          ref={input => (inputRef = input)}
        />
        <FiArrowRightCircle className="submit" onClick={inviteUser} />
      </div>
    </div>
  );
}
