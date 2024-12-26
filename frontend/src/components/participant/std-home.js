import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './std-home.css';  // Import custom CSS

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="home-section">
        <h1 className="home-heading">Velammal College of Engineering & Technology</h1>
        <pre className="home-pre">Madurai</pre>
        <p className="home-text">
          To uphold the social values while helping the society to develop technologically and morally by providing education of global standards,
          thus bringing about emancipation in the society through knowledge and wisdom.
        </p>
      </div>
    </div>
  );
};

export default Home;
