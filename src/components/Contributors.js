import React, { useState } from 'react'

import { FiArrowRightCircle } from 'react-icons/fi'
import Avatar from 'react-avatar'

import { randomColor } from '../_helpers'

import './styles/Contributors.scss'

const missingPropWarning = (propName, noRet) => {
  console.warn(`Contributors component was not given an '${propName}' prop`)
  return !noRet ? null : []
}

/**
 *
 * @param {{ sections: ["invited" | "active"], ...other }} props
 */
export default function Contributors(props) {
  const SECTION_COMPONENT_LOOKUP = {
    invited: InvitedSection,
    active: ActiveSection,
  }

  const sections = props.sections || []
  return (
    <div className="contributors">
      {!props.noTitle && <div>Contributors</div>}
      {sections.map((section, i) => {
        const Component = SECTION_COMPONENT_LOOKUP[section]
        return <Component key={`Contributors/${section}/${i}`} {...props} />
      })}
      <InviteBar
        onInvite={props.onInvite || (() => missingPropWarning('onInvite'))}
      />
      {props.children}
    </div>
  )
}

function ActiveSection(props) {
  return (
    <ContributorSection
      color="black"
      contributors={props.active || missingPropWarning('active')}
    >
      Active
    </ContributorSection>
  )
}

function InvitedSection(props) {
  return (
    <ContributorSection
      color="gray"
      contributors={props.invited || missingPropWarning('invited')}
    >
      Invited
    </ContributorSection>
  )
}

function ContributorSection(props) {
  const { color, contributors, children } = props

  return (
    <div className="section">
      <div className="title">{children}</div>
      <div className="users">
        {(contributors || []).map(invite => (
          <Contributor key={`invite/${invite}`} color={color}>
            {invite}
          </Contributor>
        ))}
      </div>
    </div>
  )
}

function Contributor(props) {
  const { color = undefined } = props
  return (
    <div className="user">
      <Avatar
        name={props.children}
        src={props.image || null}
        color={randomColor(props.children)}
        round
        size={25}
      />
      <span className="name" style={{ color }}>
        {props.children}
      </span>
    </div>
  )
}

function InviteBar(props) {
  const [user, setUser] = useState('')

  let inputRef
  const inviteUser = () => {
    props.onInvite(user)
    setUser('')
    inputRef.focus()
  }

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
          onKeyDown={e => (e.key === 'Enter' ? inviteUser() : null)}
          ref={input => (inputRef = input)}
        />
        <FiArrowRightCircle className="submit" onClick={inviteUser} />
      </div>
    </div>
  )
}
