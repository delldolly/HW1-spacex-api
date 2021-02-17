import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../styles/RocketsPage.css'
import falcon9 from '../img/falcon_9.jpg'
import falconHeavy from '../img/falcon_heavy.jpg'
import { string } from 'prop-types';

const imageList = [falcon9, falconHeavy, falcon9, falconHeavy]

export default function Rockets(){
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

  return (<>
    {data.map((item, index) => {
        return(
            <div className="rocketImg" style={{ backgroundImage: `url(${imageList[index]})` }}>
                <div className='inner-left-middle'>
                    <h1>{item.rocket_name}</h1>
                    <h2>DETAIL</h2>
                    <p>HEIGHT {item.height.meters} m / {item.height.feet} ft</p>
                    <p>DIAMETER {item.diameter.meters} m / {item.diameter.feet} ft</p>
                    <p>MASS {item.mass.kg} kg / {item.mass.lb} lb</p>
                    {item.payload_weights.map((payload) => {
                        return (<p>PAY LOAD TO {payload.id.toUpperCase()} {payload.kg} kg / {payload.lb} lb</p>)
                    })}
                </div>
            </div>
        )    
    })}
    </>
  )
} 

