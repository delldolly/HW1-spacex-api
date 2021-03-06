import React, { useState, useEffect, useMemo } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

import "../styles/RocketsDetail.css";

// Import Reactstrap
import {
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';


import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, EffectFade, Mousewheel } from 'swiper';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/components/effect-fade/effect-fade.scss';

import falcon_1 from '../img/falcon_1.png';
import fc1_launch from '../img/fc1_launch.jpg';
import fc1_s1 from '../img/fc1_s1.png';
import fc1_s2 from '../img/fc1_s2.jpg';
import fc1_engines from '../img/fc1_engines.png';

import falcon_9 from '../img/falcon_9.jpg';
import fc9_launch from '../img/fc9_launch.jpg';
import fc9_s1 from '../img/fc9_s1.jpg';
import fc9_s2 from '../img/fc9_s2.jpg';
import fc9_engines from '../img/fc9_engines.png';

import falcon_heavy from '../img/falcon_heavy.jpg';
import fh_launch from '../img/fh_launch.jpg';
import fh_s1 from '../img/fh_s1.jpg';
import fh_s2 from '../img/fh_s2.jpg';
import fh_engines from '../img/fh_engines.jpg';

import starship from '../img/starship.jpg';
import sh_launch from '../img/sh_launch.jpg';
import sh_s1 from '../img/sh_s1.png';
import sh_s2 from '../img/sh_s2.png';
import sh_engines from '../img/sh_engines.png';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade]);
const imgBG = [[],
    [falcon_1, fc1_launch, fc1_s1, fc1_s2, fc1_engines],
    [falcon_9, fc9_launch, fc9_s1, fc9_s2, fc9_engines],
    [falcon_heavy, fh_launch, fh_s1, fh_s2, fh_engines],
    [starship, sh_launch, sh_s1, sh_s2, sh_engines]
]
const commaNumber = require('comma-number');
const RenderPage = (props) => {
    const data = props.listData;
    const [activeTab, setActiveTab] = useState('1');
    
    return (
        <>
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                effect="fade"
                mousewheel={true}
            // scrollbar={{ draggable: true }}
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log('slide change')}
            >

                {/* 1: Overview */}
                <SwiperSlide>
                    <div className="swiperPage"  style={{ backgroundImage: `url(${imgBG[data.id][0]})` }}>

                        <div className="detail-overview">
                            <h4>{data.rocket_name}</h4>
                            <h1>Overview</h1>

                            <table className="detail-table">
                                <tbody>
                                    <tr>
                                        <td className="detail-sub">height</td>
                                        <td className="detail-value">{data.height.meters} m / <span>{data.height.feet} ft</span></td>
                                    </tr>
                                    <tr>
                                        <td className="detail-sub">diameter</td>
                                        <td className="detail-value">{data.diameter.meters} m / <span>{data.diameter.feet} ft</span></td>
                                    </tr>
                                    <tr>
                                        <td className="detail-sub">mass</td>
                                        <td className="detail-value">{commaNumber(data.mass.kg)} kg / <span>{commaNumber(data.mass.lb)} lb</span></td>
                                    </tr>
                                    {data.payload_weights.map((payload) => {
                                        return (
                                            <tr>
                                                <td className="detail-sub">pay load to {payload.id}</td>
                                                <td className="detail-value">{commaNumber(payload.kg)} kg / <span>{commaNumber(payload.lb)} lb</span></td>
                                            </tr>
                                        )
                                    })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </SwiperSlide>

                {/* 2: Launches */}
                <SwiperSlide>
                    <div className="swiperPage" style={{ backgroundImage: `url(${imgBG[data.id][1]})` }}>
                        <div className="detail-overview launches">
                            <h4>{data.rocket_name}</h4>
                            <h1>Launches</h1>

                            <table className="detail-table">
                                <tbody>
                                    <tr>
                                        <td className="detail-sub">cost per launch</td>
                                        <td className="detail-value">$ {commaNumber(data.cost_per_launch)}</td>
                                    </tr>
                                    <tr>
                                        <td className="detail-sub">first flight</td>
                                        <td className="detail-value">{data.first_flight}</td>
                                    </tr>
                                    <tr>
                                        <td className="detail-sub">success rate</td>
                                        <td className="detail-value">{data.success_rate_pct} %</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </SwiperSlide>

                {/* 3: First stage */}
                <SwiperSlide>
                    <div className="swiperPage" style={{ backgroundImage: `url(${imgBG[data.id][2]})` }}>
                        <div className="detail-overview">
                            <h4>{data.rocket_name}</h4>
                            <h1>First stage</h1>

                            <Nav tabs>
                                <NavItem className="tab-nav">
                                    <NavLink
                                        className={activeTab == '1' ? 'active' : ''}
                                        onClick={() => setActiveTab('1')}
                                    >
                                        engines
                                    </NavLink>
                                </NavItem>

                                <NavItem className="tab-nav">
                                    <NavLink
                                        className={activeTab == '2' ? 'active' : ''}
                                        onClick={() => setActiveTab('2')}
                                    >
                                        landing legs
                                    </NavLink>
                                </NavItem>

                            </Nav>

                            <TabContent activeTab={activeTab} className="content-tab">

                                <TabPane tabId="1">
                                    <div className="inner-content-tab">
                                        <table className="detail-table">
                                            <tbody>
                                                <tr>
                                                    <td className="detail-sub">number of engines</td>
                                                    <td className="detail-value">{data.first_stage.engines}</td>
                                                </tr>
                                                <tr>
                                                    <td className="detail-sub">fuel amount</td>
                                                    <td className="detail-value">{commaNumber(data.first_stage.fuel_amount_tons)} tons</td>
                                                </tr>
                                                <tr>
                                                    <td className="detail-sub">burn time</td>
                                                    <td className="detail-value">{data.first_stage.burn_time_sec!=null?data.first_stage.burn_time_sec:"-"} sec</td>
                                                </tr>
                                                <tr>
                                                    <td className="detail-sub">thrust at sea level</td>
                                                    <td className="detail-value">
                                                        {commaNumber(data.first_stage.thrust_sea_level.kN)} kN / <span>{commaNumber(data.first_stage.thrust_sea_level.lbf)} lbf</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="detail-sub">thrust in vacuum</td>
                                                    <td className="detail-value">
                                                        {commaNumber(data.first_stage.thrust_vacuum.kN)} kN / <span>{commaNumber(data.first_stage.thrust_vacuum.lbf)} lbf</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </TabPane>

                                <TabPane tabId="2">
                                    <div className="inner-content-tab">
                                        <table className="detail-table">
                                            <tbody>
                                                <tr>
                                                    <td className="detail-sub">number of landing legs</td>
                                                    <td className="detail-value">{data.landing_legs.number}</td>
                                                </tr>
                                                <tr>
                                                    <td className="detail-sub">material</td>
                                                    <td className="detail-value">{data.landing_legs.material!=null?data.landing_legs.material:"-"}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </TabPane>

                            </TabContent>

                        </div>
                    </div>
                </SwiperSlide>

                {/* 4: Second stage */}
                <SwiperSlide>
                    <div className="swiperPage" style={{ backgroundImage: `url(${imgBG[data.id][3]})` }}>
                        <div className="detail-overview">
                            <h4>{data.rocket_name}</h4>
                            <h1>Second stage</h1>

                            <Nav tabs>
                                <NavItem className="tab-nav">
                                    <NavLink
                                        className={activeTab == '1' ? 'active' : ''}
                                        onClick={() => setActiveTab('1')}
                                    >
                                        Engines
                                    </NavLink>
                                </NavItem>
                                <NavItem className="tab-nav">
                                    <NavLink
                                        className={activeTab == '2' ? 'active' : ''}
                                        onClick={() => setActiveTab('2')}
                                    >
                                        Payload
                                    </NavLink>
                                </NavItem>
                            </Nav>

                            <TabContent activeTab={activeTab} className="content-tab">
                                <TabPane tabId="1">
                                    <div className="inner-content-tab">
                                        <table className="detail-table">
                                            <tbody>
                                                {/* <tr>
                                                <td className="detail-sub"></td>
                                                <td className="detail-value"></td>
                                            </tr> */}
                                                <tr>
                                                    <td className="detail-sub">number of engines</td>
                                                    <td className="detail-value">{data.second_stage.engines}</td>
                                                </tr>
                                                <tr>
                                                    <td className="detail-sub">fuel amount</td>
                                                    <td className="detail-value">{data.second_stage.fuel_amount_tons} tons</td>
                                                </tr>
                                                <tr>
                                                    <td className="detail-sub">burn time</td>
                                                    <td className="detail-value">{data.second_stage.burn_time_sec!=null?data.second_stage.burn_time_sec:"-"} sec</td>
                                                </tr>
                                                <tr>
                                                    <td className="detail-sub">thrust</td>
                                                    <td className="detail-value">
                                                        {commaNumber(data.second_stage.thrust.kN)} kN / <span>{commaNumber(data.second_stage.thrust.lbf)} lbf</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </TabPane>
                                <TabPane tabId="2">
                                    <div className="inner-content-tab">
                                        <p>Option</p>
                                        <ul className="detail-list">
                                            <li>{data.second_stage.payloads.option_1!=null?data.second_stage.payloads.option_1:"-"}</li>
                                            <li>{data.second_stage.payloads.option_2!=null?data.second_stage.payloads.option_2:"-"}</li>
                                        </ul>

                                        <p>Payload fairing</p>
                                        <table className="detail-table">
                                            <tbody>
                                                <tr>
                                                    <td className="detail-sub">height</td>
                                                    <td className="detail-value">
                                                        {data.second_stage.payloads.composite_fairing.height.meters!=null?commaNumber(data.second_stage.payloads.composite_fairing.height.meters):"-"} m / <span>{data.second_stage.payloads.composite_fairing.height.feet!=null?commaNumber(data.second_stage.payloads.composite_fairing.height.feet):"-"} f</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="detail-sub">diameter</td>
                                                    <td className="detail-value">
                                                        {data.second_stage.payloads.composite_fairing.diameter.meters!=null?commaNumber(data.second_stage.payloads.composite_fairing.diameter.meters):"-"} m / <span>{data.second_stage.payloads.composite_fairing.diameter.feet!=null?commaNumber(data.second_stage.payloads.composite_fairing.diameter.feet):"-"} f</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </TabPane>
                            </TabContent>

                        </div>
                    </div>
                </SwiperSlide>

                {/* 5: Engines */}
                <SwiperSlide>
                    <div className="swiperPage" style={{ backgroundImage: `url(${imgBG[data.id][4]})` }}>
                        <div className="detail-overview" style={{textTransform: "capitalize"}}>
                            <h4>{data.rocket_name} Engines</h4>
                            <h1>{data.engines.type}</h1>

                            <Nav tabs>
                                <NavItem className="tab-nav">
                                    <NavLink
                                        className={activeTab == '1' ? 'active' : ''}
                                        onClick={() => setActiveTab('1')}
                                    >
                                        overview
                                    </NavLink>
                                </NavItem>

                                <NavItem className="tab-nav">
                                    <NavLink
                                        className={activeTab == '2' ? 'active' : ''}
                                        onClick={() => setActiveTab('2')}
                                    >
                                        sea Level
                                    </NavLink>
                                </NavItem>

                                <NavItem className="tab-nav">
                                    <NavLink
                                        className={activeTab == '3' ? 'active' : ''}
                                        onClick={() => setActiveTab('3')}
                                    >
                                        vacuum
                                    </NavLink>
                                </NavItem>
                            </Nav>

                            <TabContent activeTab={activeTab} className="content-tab">

                                <TabPane tabId="1">
                                    <div className="inner-content-tab">
                                        <table className="detail-table">
                                            <tbody>
                                                <tr>
                                                    <td className="detail-sub">number of engines</td>
                                                    <td className="detail-value">{data.engines.number}</td>
                                                </tr>
                                                <tr>
                                                    <td className="detail-sub">version</td>
                                                    <td className="detail-value">{data.engines.version?data.engines.version:"-"}</td>
                                                </tr>
                                                <tr>
                                                    <td className="detail-sub">layout</td>
                                                    <td className="detail-value">{data.engines.layout?data.engines.layout:"-"}</td>
                                                </tr>
                                                <tr>
                                                    <td className="detail-sub">engine loss max</td>
                                                    <td className="detail-value">{data.engines.engine_loss_max?data.engines.engine_loss_max:"-"}</td>
                                                </tr>
                                                <tr>
                                                    <td className="detail-sub">thrust to weight</td>
                                                    <td className="detail-value">
                                                        {commaNumber(data.engines.thrust_to_weight)} N
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </TabPane>

                                <TabPane tabId="2">
                                    <div className="inner-content-tab">
                                        <p>Propellant</p>
                                        <ul className="detail-list">
                                            <li>{data.engines.propellant_1}</li>
                                            <li>{data.engines.propellant_2}</li>
                                        </ul>

                                        <table className="detail-table">
                                            <tbody>
                                                <tr>
                                                    <td className="detail-sub">thrust</td>
                                                    <td className="detail-value">
                                                        {commaNumber(data.engines.thrust_sea_level.kN)} kN / <span>{commaNumber(data.engines.thrust_sea_level.lbf)} lbf</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </TabPane>

                                <TabPane tabId="3">
                                    <div className="inner-content-tab">
                                        <table className="detail-table">
                                            <tbody>
                                                <tr>
                                                    <td className="detail-sub">thrust</td>
                                                    <td className="detail-value">
                                                        {commaNumber(data.engines.thrust_vacuum.kN)} kN / <span>{commaNumber(data.engines.thrust_vacuum.lbf)} lbf</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </TabPane>

                            </TabContent>

                        </div>

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

