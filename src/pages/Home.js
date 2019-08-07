import React from "react";
import Avatar from "react-avatar";

import "./styles/Home.scss";

function Home() {
  return (
    <div className="home">
      <CategoryDisplay title="Based on Your Interests" />
      <CategoryDisplay title="Controversial" />
    </div>
  );
}

function CategoryDisplay(props) {
  const { title } = props;

  return (
    <div className="category-display">
      <div className="title">{title}</div>
      <div className="card-row">
        <DiscussionCard name="Should Marijuana be Legalized?" />
        <DiscussionCard name="Should Marijuana be Legalized?" />
        <DiscussionCard name="Should Marijuana be Legalized?" />
      </div>
    </div>
  );
}

function DiscussionCard(props) {
  const { name } = props;

  return (
    <div className="card">
      <div className="title">{name}</div>
      <div className="discussed-by">
        <Avatar name="Jack Hedaya" round size={40} />
        <Avatar name="John Cena" round size={40} />
        <span className="text">
          <div>Discussion by Jack Hedaya, John Cena, and 19 more</div>
        </span>
      </div>
      <div className="description">A well thought out discussion on the pros and cons of legalizing marijuana.</div>
    </div>
  );
}

export default Home;
