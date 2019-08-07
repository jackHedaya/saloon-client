import React from "react";

import "./styles/Home.scss";

function Home() {
  return (
    <div className="home">
      <CategoryDisplay title="Based on Your Interests" />
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
    </div>
  );
}

export default Home;
