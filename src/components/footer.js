import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { FaQuestionCircle, FaEnvelope, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import '../css/footer.css';


class Footer extends Component {  
  render() {    
  	return (
  		<div>
	  		<Navbar fixed="bottom" className="myfooter justify-content-center" >
		  		<Nav className="mr-1">
			  		<Nav.Item className="social">			  						  			
			  			<Link to="/help" className="nav-link"><FaQuestionCircle /></Link>			  						  			
			  		</Nav.Item>
			  		<Nav.Item className="social">
				  		<Nav.Link href="mailto:tcunha_lp@hotmail.com">
				  			<FaEnvelope />
				  		</Nav.Link>
			  		</Nav.Item>
			  		<Nav.Item className="social">
				  		<Nav.Link href="http://www.facebook.com" target="blank">
				  			<FaFacebook />
				  		</Nav.Link>
			  		</Nav.Item>
			  		<Nav.Item className="social">
				  		<Nav.Link href="http://www.twitter.com" target="blank">
				  			<FaTwitter />
				  		</Nav.Link>
			  		</Nav.Item>
			  		<Nav.Item className="social">
				  		<Nav.Link href="http://www.instagram.com" target="blank">
				  			<FaInstagram />
				  		</Nav.Link>
			  		</Nav.Item>
		  		</Nav>
	  		</Navbar>      

  		</div>
  		);
  }
}

export default Footer;
