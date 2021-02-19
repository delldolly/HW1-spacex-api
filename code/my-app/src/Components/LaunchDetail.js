import React, {useState, useEffect} from 'react';
import '../styles/LaunchDetails.css';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';

function RenderPage(props){
    const data = props.listData;
    console.log(props)
    return(
        <>
            <h1>{data.flight_number} : {data.mission_name}</h1>
            {/* {data.mission_id.map((MID) => {return(<p>mission id{MID}</p>)})} */}
            <h4>launch_year : {data.launch_year}</h4>
            <h6>date : {data.launch_date_local}</h6>
            <h6>{data.launch_site.site_id}</h6>
            <h6>{data.launch_site.site_name}</h6>
            <h6>{data.launch_site.site_name_long}</h6>
            <h6>launch status : {(data.launch_success? "success":"unsuccess")}</h6>
            <h5>detail</h5>
            <h6>{data.details}</h6>
            <h6>{data.static_fire_date_utc}</h6>
            <h1>ROCKET </h1>
            <Link to={"/RocketsDetail/"+(data.rocket.rocket_id)}><h6>name : {data.rocket.rocket_name}</h6></Link>
            <h6>type : {data.rocket.rocket_type}</h6>
        </>
    )
}

export default function LauncheDetail(){
    const {id} = useParams();
    const [data, setData] = useState(false);
    const [LOADSTATUS, SETLOADSTATUS] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://api.spacexdata.com/v3/launches/'+id,
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
        {LOADSTATUS? "Loading...": <RenderPage listData={data}/>}
        </>
        )
}
