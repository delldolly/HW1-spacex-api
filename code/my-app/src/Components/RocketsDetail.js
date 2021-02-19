import React, {useState, useEffect, useMemo} from "react";
import {useParams} from 'react-router-dom';
import axios from 'axios';

const RenderPage = (props) => {
    const data = props.listData;
    return(
        <>
        <h3>ID : {data.id}</h3>
        <h1>NAME : {data.rocket_name}</h1>
        <h6>rocket id : {data.rocket_id}</h6>
        </>
    )
}

export default function RocketsDetail(){
    const {id} = useParams();
    const [data, setData] = useState();
    const [LOADSTATUS, SETLOADSTATUS] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
        const result = await axios(
            'https://api.spacexdata.com/v3/rockets/'+id,
        );
        setData(result.data);
        SETLOADSTATUS(false)
        console.log(result.data)
        console.log(data)
    };
        
        fetchData();
    }, []);
    return(
        <>
            {LOADSTATUS? "loading...": <RenderPage listData={data}/>}
        </>
    )
}

