import React, {useState, useEffect} from 'react';
import '../styles/LaunchDetails.css';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';

export default function LauncheDetail(){
    const {id} = useParams();
    const [data, setData] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://api.spacexdata.com/v3/launches/'+id,
            );
            setData(result.data);
            console.log(result.data)
            console.log(data.flight_number)
        };
        fetchData();
    }, []);
    return(
        <>
            <h1>{data?data.flight_number:"loading"} : {data?data.mission_name:'loading'}</h1>
            {/* {data.mission_id.map((MID) => {return(<p>mission id{MID}</p>)})} */}
            <h4>launch_year : {data?data.launch_year:"loading"}</h4>
            <h6>date : {data?data.launch_date_local:"loading"}</h6>
            <h6>{data?data.launch_site.site_id:"loading"}</h6>
            <h6>{data?data.launch_site.site_name:"loading"}</h6>
            <h6>{data?data.launch_site.site_name_long:"loading"}</h6>
            <h6>launch status : {data?(data.launch_success? "success":"unsuccess"):"loading"}</h6>
            <h5>detail</h5>
            <h6>{data.details}</h6>
            <h6>{data.static_fire_date_utc}</h6>
            <h1>ROCKET </h1>
            <Link to={"/RocketsDetail/"+(data?data.rocket.rocket_id:"1")}><h6>name : {data?data.rocket.rocket_name:"loading name..."}</h6></Link>
            <h6>type : {data?data.rocket.rocket_type:"loading type..."}</h6>
        </>
        
    )
}
