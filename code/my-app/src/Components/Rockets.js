import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/RocketsPage.css'
import falcon9 from '../img/falcon_9.jpg'
import falconHeavy from '../img/falcon_heavy.jpg'
import starship from '../img/starship.jpg'
import { string } from 'prop-types';

const imageList = [falcon9, falcon9, falconHeavy, starship]

export default function Rockets() {
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

    const commaNumber = require('comma-number');

    return (
        <>
            {data.map((item, index) => {
                return (
                    <div className="rocketImg" style={{ backgroundImage: `url(${imageList[index]})` }}>
                        <div className='inner-left-middle'>
                            <h5>{item.rocket_name}</h5>
                            <h1>DETAIL</h1>
                            <table className="detail-table">
                                <tbody>
                                    <tr>
                                        <td className="detail-sub">HEIGHT</td>
                                        <td className="detail-value">{item.height.meters} m / <span>{item.height.feet} ft</span></td>
                                    </tr>
                                    <tr>
                                        <td className="detail-sub">DIAMETER</td>
                                        <td className="detail-value">{item.diameter.meters} m / <span>{item.diameter.feet} ft</span></td>
                                    </tr>
                                    <tr>
                                        <td className="detail-sub">MASS</td>
                                        <td className="detail-value">{commaNumber(item.mass.kg)} kg / <span>{commaNumber(item.mass.lb)} lb</span></td>
                                    </tr>
                                    {item.payload_weights.map((payload) => {
                                        return (
                                            <tr>
                                                <td className="detail-sub">PAY LOAD TO {payload.id.toUpperCase()}</td> 
                                                <td className="detail-value">{commaNumber(payload.kg)} kg / <span>{commaNumber(payload.lb)} lb</span></td>
                                            </tr>
                                        )
                                    })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

