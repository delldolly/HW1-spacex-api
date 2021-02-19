import React, { useState, useEffect, useMemo } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

import "../styles/RocketsDetail.css";

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
const commaNumber = require('comma-number');
const RenderPage = (props) => {
    const data = props.listData;
    return (
        <>
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log('slide change')}
            >
                <SwiperSlide>
                    <div className="swiperPage">
                        <h3>ID : {data.id}</h3>
                        <h1>NAME : {data.rocket_name}</h1>
                        <h6>rocket id : {data.rocket_id}</h6>
                        <h3>description : {data.description}</h3>
                        <h6>rocket_type : {data.rocket_type}</h6>
                        <h4>landing_legs</h4>
                        <h6>number : {data.landing_legs.number}</h6>
                        <h6>material : {data.landing_legs.material}</h6>
                        
                            <h6 className="detail-sub">HEIGHT</h6>
                            <h6 className="detail-value">{data.height.meters} m / <span>{data.height.feet} ft</span></h6>
                        
                        
                            <h6 className="detail-sub">DIAMETER</h6>
                            <h6 className="detail-value">{data.diameter.meters} m / <span>{data.diameter.feet} ft</span></h6>
                        
                        
                            <h6 className="detail-sub">MASS</h6>
                            <h6 className="detail-value">{commaNumber(data.mass.kg)} kg / <span>{commaNumber(data.mass.lb)} lb</span></h6>
                        
                        {data.payload_weights.map((payload) => {
                            return (<>
                                
                                    <h6 className="detail-sub">PAY LOAD TO {payload.id.toUpperCase()}</h6>
                                    <h6 className="detail-value">{commaNumber(payload.kg)} kg / <span>{commaNumber(payload.lb)} lb</span></h6>
                                </>
                            )
                        })
                        }
                    </div></SwiperSlide>
                <SwiperSlide>
                    <div className="swiperPage">
                        <h1>{data.rocket_name} Launches</h1>
                        <h6>cost per launch : {data.cost_per_launch}</h6>
                        <h6>first flight : {data.first_flight}</h6>
                        <h6>success rate : {data.success_rate_pct}%</h6>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="swiperPage">
                        <h1>Payload weight</h1>
                        {data.payload_weights.map((payload) => {
                            return (
                                <ul>
                                    <li>id : {payload.id}</li>
                                    <li>name : {payload.name}</li>
                                    <li>kg : {payload.kg}</li>
                                    <li>lb : {payload.lb}</li>
                                </ul>
                            )
                        })}
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="swiperPage">
                        <h1>first_stage</h1>
                        <h6>engines : {data.first_stage.engines}</h6>
                        <h6>fuel_amount_tons : {data.first_stage.fuel_amount_tons}</h6>
                        <h6>burn_time : {data.first_stage.burn_time_sec} sec</h6>
                        <h5>thrust_sea_level</h5>
                        <h6>kN : {data.first_stage.thrust_sea_level.kN}</h6>
                        <h6>lbf : {data.first_stage.thrust_sea_level.lbf}</h6>
                        <h5>thrust_vacuum</h5>
                        <h6>kN : {data.first_stage.thrust_vacuum.kN}</h6>
                        <h6>lbf : {data.first_stage.thrust_vacuum.lbf}</h6>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="swiperPage">
                        <h1>second_stage</h1>
                        <h6>engines : {data.second_stage.engines}</h6>
                        <h6>fuel_amount : {data.second_stage.fuel_amount_tons} tons</h6>
                        <h6>burn_time : {data.second_stage.burn_time_sec} sec</h6>
                        <h5>thrust</h5>
                        <h6>kN : {data.second_stage.thrust.kN}</h6>
                        <h6>lbf : {data.second_stage.thrust.lbf}</h6>
                        <h2>Payloads</h2>
                        <h6>option_1 : {data.second_stage.payloads.option_1}</h6>
                        <h6>option_2 : {data.second_stage.payloads.option_2}</h6>
                        <h3>composite_fairing</h3>
                        <h6>height : {data.second_stage.payloads.composite_fairing.height.meters}m. or {data.second_stage.payloads.composite_fairing.height.feet}f</h6>
                        <h6>diameter : {data.second_stage.payloads.composite_fairing.diameter.meters}m. or {data.second_stage.payloads.composite_fairing.diameter.feet}f</h6>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="swiperPage">
                        <h1>Engines</h1>
                        <h6>number : {data.engines.number}</h6>
                        <h6>type : {data.engines.type}</h6>
                        <h6>version : {data.engines.version}</h6>
                        <h6>layout : {data.engines.layout}</h6>
                        <h6>engine loss max : {data.engines.engine_loss_max}</h6>
                        <h6>propellant_1 : {data.engines.propellant_1}</h6>
                        <h6>propellant_2 : {data.engines.propellant_2}</h6>
                        <h3>thrust_sea_level</h3>
                        <h6>kN : {data.engines.thrust_sea_level.kN}</h6>
                        <h6>lbf : {data.engines.thrust_sea_level.lbf}</h6>
                        <h3>thrust_vacuum</h3>
                        <h6>kN : {data.engines.thrust_vacuum.kN}</h6>
                        <h6>lbf : {data.engines.thrust_vacuum.lbf}</h6>
                        <h6>thrust_to_weight : {data.engines.thrust_to_weight}</h6>
                    </div>
                </SwiperSlide>

            </Swiper>

        </>
    )
}

export default function RocketsDetail() {
    const { id } = useParams();
    const [data, setData] = useState();
    const [LOADSTATUS, SETLOADSTATUS] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://api.spacexdata.com/v3/rockets/' + id,
            );
            setData(result.data);
            SETLOADSTATUS(false)
            console.log(result.data)
            console.log(data)
        };

        fetchData();
    }, []);
    return (
        <>
            {LOADSTATUS ? "loading..." : <RenderPage listData={data} />}
        </>
    )
}

