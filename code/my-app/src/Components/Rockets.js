import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';

import '../styles/RocketsPage.css';

import falcon9 from '../img/falcon_9.jpg';
import falconHeavy from '../img/falcon_heavy.jpg';
import starship from '../img/starship.jpg';
import test from '../img/falcon_1.png';
// import { string } from 'prop-types';

const imageList = [test, falcon9, falconHeavy, starship]

export default function Rockets() {
    let history = useHistory();
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://api.spacexdata.com/v3/rockets',
            );
            setData(result.data);
            console.log(data)
        };
        fetchData();
    }, []);

    const buttonStyle = {
        fontSize: "1.5vmax",
        fontWeight: "700"
    }

    return (
        <>
            {data.map((item, index) => {
                return (
                    <div className="rocketImg" style={{ backgroundImage: `url(${imageList[index]})` }}>
                        <div className='inner-left-middle'>
                            <h1>{item.rocket_name}</h1>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;{item.description}</p>

                            <Link to={"/Rockets/" + (item.rocket_id)}>
                                <Button outline color="warning" size="lg" style={buttonStyle}>Learn More</Button>
                            </Link>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

