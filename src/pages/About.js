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

            <div id="how">How we do it</div>

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
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
