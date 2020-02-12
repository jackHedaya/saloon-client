import React from 'react'

import './styles/About.scss'

function About() {
  return (
    <div className="about">
      <div id="title">About Saloon</div>
      <div className="editor">
        <div className="quill">
          <div className="ql-toolbar ql-snow"></div>
          <div className="ql-container ql-snow">
            <div>
              Saloon provides a space for HEALTHY and NUANCED conversations by
              making sure your conversations go uninterrupted AND by making sure
              your voices are heard.
            </div>

            <div className="bold-y-margin">How we do it</div>

            <div>We keep conversations CLEAR:</div>
            <div>
              When you start a conversation on Saloon, only you can decide who
              joins.
            </div>

            <div className="pad-top">Our conversations are always LIVE:</div>
            <div>
              Saloon conversations never end, so they can be added to whenever
              inspiration strikes!
            </div>

            <div className="pad-top">Comments mean MORE on Saloon:</div>
            <div>Since all of our conversations are live, so are comments!</div>
            <div>
              That means posters on Saloon can engage with reader feedback
              during conversations!
            </div>

            <div className="bold-y-margin">
              Here are some tips to get the most out of your Saloon
              Conversations
            </div>
            <div className="tip">Be Respectful</div>
            <div className="tip">Be Disagreeable</div>
            <div className="tip">Be Honest</div>
            <div className="tip">Be Clear and Consice</div>
            <div className="last">and last but not least...</div>
            <div className="bold-y-margin fun">Have Fun!!</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
