import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../styles/LaunchDetails.css';

import null_patch from '../img/launches_logo.jpg';

import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';

function RenderPage(props) {
    const data = props.listData;


    const buttonStyle = {
        fontSize: "1.5vmax",
        fontWeight: 700,
        fontSize: "1.5vmax"
    }

    // convert date
    const launches_date_utc = new Date(data.launch_date_utc);
    const hr = launches_date_utc.getUTCHours();
    const min = launches_date_utc.getUTCMinutes();
    const sec = launches_date_utc.getUTCMilliseconds();
    const mm = launches_date_utc.getMonth() + 1;
    const dd = launches_date_utc.getDate();
    const launches_date = launches_date_utc.getFullYear() + '-' + (mm < 10 ? '0' + mm : mm) + '-' + (dd < 10 ? '0' + dd : dd)
        + ' ' + (hr < 10 ? '0' + hr : hr) + ':' + (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec);

    console.log(props)
    return (
        <Container className="themed-container launches-detail" fluid={true}>
            <Row>

                <Col sm="12" md="6" lg={{ size: 6 }}>
                    <div className="mission-img">
                        <img className="mission-patch" src={data.links.mission_patch == null ? null_patch : data.links.mission_patch} />
                    </div>
                </Col>

                <Col sm="12" md="6" lg={{ size: 6 }} className="mission-detail-side">
                    <div className="mission-detail">
                        {data.mission_id.map((MID) => { return (<p>mission id {MID}</p>) })}
                        <h1>{data.flight_number} : {data.mission_name} ({data.launch_year})</h1>
                        <h5>&nbsp;&nbsp;&nbsp;&nbsp;{data.details}</h5>
                        <h5>Launch UTC date : {launches_date}</h5>
                        <h5>Launch window : {data.launch_window}</h5>
                    </div>
                </Col>

            </Row>

            <Row>

                <Col xs={{ size: 12, order: 2 }} md={{ size: 6, order: 1 }} className="mision-rocket-panel">
                    <div className="inner-mision-rocket">
                        <h1>ROCKET : {data.rocket.rocket_name}</h1>
                        <p>type : {data.rocket.rocket_type}</p>
                        <Link to={"/Rockets/" + (data.rocket.rocket_id)}>
                            <Button outline color="warning" size="lg" style={buttonStyle}>View Rocket detail</Button>
                        </Link>
                    </div>
                </Col>

                <Col xs={{ size: 12, order: 1 }} md={{ size: 6, order: 2 }} className="mission-detail-panal">
                    <div className="under-mission-detail">
                        <table className="detail-table">
                            <tbody>
                                <tr>
                                    <td className="detail-sub">launch status</td>
                                    <td className="detail-value">{(data.launch_success ? "success" : "unsuccess")}</td>
                                </tr>
                                <tr>
                                    <td className="detail-sub">site id</td>
                                    <td className="detail-value">{data.launch_site.site_id}</td>
                                </tr>
                                <tr>
                                    <td className="detail-sub">site name</td>
                                    <td className="detail-value">{data.launch_site.site_name_long} ({data.launch_site.site_name})</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Col>
            </Row>

        </Container>
    )
}

export default function LauncheDetail() {
    const { id } = useParams();
    const [data, setData] = useState(false);
    const [LOADSTATUS, SETLOADSTATUS] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://api.spacexdata.com/v3/launches/' + id,
            );
            setData(result.data);
            console.log(result.data)
            console.log(data.flight_number)
            SETLOADSTATUS(false)
        };
        fetchData();
    }, []);
    return (
        <>
            {LOADSTATUS ? "Loading..." : <RenderPage listData={data} />}
        </>
    )
}
