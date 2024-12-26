import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar} from "react-bootstrap";
import Home from './std-home';
import PresentEvents from "./present-event";
import PastEvents from "./past-event";
import ComingEvents from "./coming-event";
import About from "./about";
import logo from "./vcet.jpg";
import './participant.css';
import { useNavigate } from "react-router-dom";

const Participanthome = () => {
    const [activeComponent, setActiveComponent] = useState('Home');
    const navigate = useNavigate();

    const renderComponent = () => {
        switch (activeComponent) {
            case 'Home':
                return <Home />;
            case 'PresentEvents':
                return <PresentEvents />;
            case 'ComingEvents':
                return <ComingEvents />;
            case 'PastEvents':
                return <PastEvents />;
            case 'About':
                return <About />;
            default:
                return <Home />;
        }
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
                <div>
                    <button className="btn btn-secondary" onClick={() => { navigate('/login') }}>Faculty Login</button>
                </div>
            </div>
            <Navbar variant="dark" style={{ backgroundColor: 'rgb(16, 110, 187)', padding: '1rem' }}>
                <Nav className="mr-auto">
                    <Nav.Link className="nav-link-custom" onClick={() => setActiveComponent('Home')}>Home</Nav.Link>
                    <Nav.Link className="nav-link-custom" onClick={() => setActiveComponent('PresentEvents')}>Present Events</Nav.Link>
                    <Nav.Link className="nav-link-custom" onClick={() => setActiveComponent('ComingEvents')}>Upcoming Events</Nav.Link>
                    <Nav.Link className="nav-link-custom" onClick={() => setActiveComponent('PastEvents')}>Past Events</Nav.Link>
                    <Nav.Link className="nav-link-custom" onClick={() => setActiveComponent('About')}>About</Nav.Link>
                </Nav>
            </Navbar>
            <div className="container-fluid" style={{ padding: '2rem' }}>
                {renderComponent()}
            </div>
        </>
    );
};

export default Participanthome;
