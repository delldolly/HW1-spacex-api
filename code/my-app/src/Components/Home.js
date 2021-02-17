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
    // const rowStyle = {
    //     margin: 0,
    //     width: "100vw",
    //     height: "calc(100vh - 55px)"
    // };
    // const colStyle = {
    //     padding: 0
    // }
    const contStyle = {
        padding: 0
    }
    const buttonStyle = {
        color: "#fff",
        borderColor: "#fff",
        fontSize: "2vmin"
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
                <span className="quote">" {info.summary} "</span>
            </div>

            {/* Info */}
            <div className="rocket-info">
                <div className="go-to-rocket">
                    <h1>Rocket</h1>
                    <Link to="/Rockets">
                        <Button outline size="lg" style={buttonStyle}>View Rocket</Button>
                    </Link>
                </div>
            </div>

            <div className="launches-info">
                <div className="go-to-launches">
                    <h1>Launches</h1>
                    <Link to="/Launches">
                        <Button outline size="lg" style={buttonStyle}>View Launches</Button>
                    </Link>
                </div>
            </div>
            
        </Container>
    )
}
export default Home