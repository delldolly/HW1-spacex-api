import React, { useEffect, useState } from "react"
import { Container } from 'reactstrap';

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
        padding: 0,
        backgroundColor: "#000"
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
            <div className="info-text">
                <div>
                    <span>{info.name}</span>  is an American aerospace manufacturer and space transportation services company 
                    headquartered in {info.headquarters.city}, {info.headquarters.state}.
                    It was founded in {info.founded} by {info.founder}<br/>
                    CEO and CTO : {info.ceo}<br/>
                    COO : {info.coo}<br/>
                    Number of employees : {info.employees}<br/>
                    
                </div>
            </div>
        </Container>
    )
}
export default Home