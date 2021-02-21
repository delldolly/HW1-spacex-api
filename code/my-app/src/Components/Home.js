import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Container, Button } from 'reactstrap';

import '../styles/Homepage.css';

const Home = (props) => {
    const [info, setInfo] = useState([])
    useEffect(
        () => {
            const fetchInfo = async () => {
                const response = await fetch('https://api.spacexdata.com/v3/info')
                const data = await response.json()
                console.log(data)
                setInfo(data)
            }
            fetchInfo()
        },
        [],
    )
    const contStyle = {
        padding: 0
    }
    const buttonStyle = {
        fontSize: "1.5vmax",
        fontWeight: 500
    }
    
    return (
        <Container className="themed-container" fluid={true} style={contStyle}>
            {/* Header */}
            <div className="home-header">
                <div className="header-name">
                    <span>{info.name}</span>
                </div>
                <div className="scroll-arrow">
                    <a class="ca3-scroll-down-link ca3-scroll-down-arrow" data-ca3_iconfont="ETmodules" data-ca3_icon=""></a>
                </div>
            </div>

            {/* Quote */}
            <div className="quote-text">
                <span className="quote">
                    "<br/><br/> {info.summary} <br/><br/>"
                </span>
            </div>

            {/* Info */}
            <div className="info-text">
                <div className="info">
                    <h1>What is SpaceX</h1>
                    <p className="info">
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="bold">Space Exploration Technologies Corp. (SpaceX)</span> is an American aerospace manufacturer 
                        and space transportation services company headquartered in Hawthorne, California. It was founded in 2002 by Elon Musk 
                        with the goal of reducing space transportation costs to enable the colonization of Mars. SpaceX has developed several 
                        launch vehicles and rocket engines, as well as the Dragon cargo spacecraft and the Starlink satellite constellation 
                        (providing internet access), and has flown humans and cargo to the International Space Station on the SpaceX Dragon 2.
                    </p>
                </div>
            </div>

            {/* Next page */}
            <div className="rocket-info">
                <div className="go-to-rocket">
                    <h1>Rocket</h1>
                    <Link to="/Rockets">
                        <Button outline color="light" size="lg" style={buttonStyle}>View Rocket</Button>
                    </Link>
                </div>
            </div>

            <div className="launches-info">
                <div className="go-to-launches">
                    <h1>Launches</h1>
                    <Link to="/Launches">
                        <Button outline color="light" size="lg" style={buttonStyle}>View Launches</Button>
                    </Link>
                </div>
            </div>
            
        </Container>
    )
}
export default Home