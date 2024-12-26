import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Button, Collapse, Dropdown } from 'react-bootstrap';
import Create from './create_event';
import Update from './update_event';
import Delete from './delete_event';
import EventsList from './fac-home';
import Feedback from './feedback';
import AddPhoto from './addphotos';
import './facultyhome.css'; 
import WinnerList from './winner-details';
import logo from "./vcet.jpg";
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const FacultyHome = () => {
  const [activeComponent, setActiveComponent] = useState('home');
  const [open, setOpen] = useState(true);
  const { faculty_id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state || {};

  const renderComponent = () => {
    switch (activeComponent) {
      case 'home':
        return <EventsList />;
      case 'create':
        return <Create />;
      case 'update':
        return <Update />;
      case 'delete':
        return <Delete />;
      case 'feedback':
        return <Feedback />;
      case 'photo':
        return <AddPhoto />;
      case 'winner':
        return <WinnerList />;
      default:
        return <EventsList />;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login'); 
  };

  return (
    <>
      <div className="header" style={{ display: 'flex', alignItems: 'center', backgroundColor: '#007bff', color: 'white', textAlign: 'center', padding: '1rem', fontSize: '2rem', fontWeight: 'bold', justifyContent: 'space-around' }}>
        <img
          src={logo}
          width="100"
          height="90"
          alt="Logo"
          style={{ marginRight: '1rem', float: 'left' }}
        />
        <span style={{ textAlign: 'center' }}>Velammal College Of Engineering & Technology, Madurai</span>
        <div className="d-inline-flex align-items-baseline border rounded-pill bg-info">
          <span className="fs-5 p-2">{username}</span>
          <Dropdown align="end">
            <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{ background: 'none', border: 'none' }}>
              <FaUserCircle size={30} color="white" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="d-flex">
        <Navbar bg="primary" variant="dark" className="flex-column vh-100 custom-navbar">
          <Button
            variant="primary"
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            className="mb-2 custom-toggle-button"
          >
            &#9776;
          </Button>
          <Collapse in={open}>
            <div id="example-collapse-text">
              <Nav className="flex-column text-white">
                <Nav.Link 
                  className={`nav-link-custom ${activeComponent === 'home' && 'active'}`} 
                  onClick={() => setActiveComponent('home')}
                >
                  Home
                </Nav.Link>
                <Nav.Link 
                  className={`nav-link-custom ${activeComponent === 'create' && 'active'}`} 
                  onClick={() => setActiveComponent('create')}
                >
                  Create
                </Nav.Link>
                <Nav.Link 
                  className={`nav-link-custom ${activeComponent === 'update' && 'active'}`} 
                  onClick={() => setActiveComponent('update')}
                >
                  Update
                </Nav.Link>
                <Nav.Link 
                  className={`nav-link-custom ${activeComponent === 'delete' && 'active'}`} 
                  onClick={() => setActiveComponent('delete')}
                >
                  Delete
                </Nav.Link>
                <Nav.Link 
                  className={`nav-link-custom ${activeComponent === 'feedback' && 'active'}`} 
                  onClick={() => setActiveComponent('feedback')}
                >
                  Add Feedback
                </Nav.Link>
                <Nav.Link 
                  className={`nav-link-custom ${activeComponent === 'photo' && 'active'}`} 
                  onClick={() => setActiveComponent('photo')}
                >
                  Add Photo
                </Nav.Link>
                <Nav.Link 
                  className={`nav-link-custom ${activeComponent === 'winner' && 'active'}`} 
                  onClick={() => setActiveComponent('winner')}
                >
                  Add Winners
                </Nav.Link>
              </Nav>
            </div>
          </Collapse>
        </Navbar>
        <div className="container mt-4 custom-content" style={{ marginLeft: '20px' }}>
          {renderComponent()}
        </div>
      </div>
    </>
  );
};

export default FacultyHome;