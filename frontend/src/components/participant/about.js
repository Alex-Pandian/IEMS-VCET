import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import './about.css';  // Import custom CSS

export default function About() {
  return (
    <div className="container mt-5">
      <div className="about-section">
        <h1 className="text-center mb-4 text-primary-custom">Tech Innovators Institute</h1>
        
        <div className="mb-4">
          <p className="lead">
            <strong>Welcome to Tech Innovators Institute!</strong> Our institute is at the forefront of technological education and research. We aim to nurture the next generation of innovators and leaders in the tech industry. Join us to embark on a journey of discovery and innovation.
          </p>
        </div>
        
        <div className="mb-4">
          <p className="lead">
            <strong>Our Mission</strong> To provide top-tier education and foster a research-driven environment that promotes intellectual growth and technological advancement. We are dedicated to preparing our students to thrive in a dynamic, ever-evolving global landscape.
          </p>
        </div>
        
        <div className="mb-4">
          <p className="lead">
            <strong>Our Vision</strong> To be a world-renowned institution recognized for excellence in education, innovation, and research. We aspire to shape the future by empowering our students and faculty to push the boundaries of technology and its applications.
          </p>
        </div>
        
        <div className="card card-custom p-4">
          <h4 className="card-title"><strong>Contact Us</strong></h4>
          <p className="card-text">
            Tech Innovators Institute, <br />
            123 Tech Road, Innovation City, <br />
            Technoland, 456789 <br />
            Phone: +1-234-567-890 <br />
            Email: <a href="mailto:info@techinnovators.edu">info@techinnovators.edu</a>
          </p>
        </div>
      </div>
    </div>
  );
}
