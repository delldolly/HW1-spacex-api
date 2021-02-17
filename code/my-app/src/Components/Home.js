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
    return (
        <Container className="themed-container" fluid={true} style={{padding: 0}}>
            <div className="home-header">
                <h1>{info.name}</h1>
                <a class="ca3-scroll-down-link ca3-scroll-down-arrow" data-ca3_iconfont="ETmodules" data-ca3_icon=""></a>
            </div>
            <ul>
                <li>Summary: {info.summary}</li>
            </ul>
        </Container>
    )
}
export default Home