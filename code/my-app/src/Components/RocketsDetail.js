import React, {useState, useEffect} from "react";
import {useParams} from 'react-router-dom';
import axios from 'axios';

const RocketsDetail = () => {
    const {id} = useParams();
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://api.spacexdata.com/v3/rockets/'+id,
            );
            setData(result.data);
            console.log(data)
        };
        fetchData();
    }, []);
    return(
        <>
        <h1>{data.rocket_id}</h1>
        </>
    )
}

export default RocketsDetail;