import React, {useState, useEffect} from 'react';
import axios from 'axios';

import { Table } from 'reactstrap';

import Select from 'react-select';

import '../styles/LaunchPage.css';

import { Container, Row, Col } from 'reactstrap';

import {Link,  useHistory } from 'react-router-dom';
import '../styles/LaunchDetails.css';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
 
 

export default function Launches(){
    let history = useHistory();
    const [data, setData] = useState([]);
    const [launchYearList, setLaunchYearList] = useState([{ value:  "", label:  "none" }]);
    const [rocketNameList, setRocketNameList] = useState([{ value:  "", label:  "none" }]);
    const [launchSuccessList, setLaunchSuccessList] = useState([{ value: "", label:  "none" }]);

    //false page load finished
    const [LOADCHECKER, SETLOADCHECKER] = useState(true)

    const [filterYear, setFilterYear] = useState("");
    const [filterName, setFilterName] = useState("");
    const [filterSuccess, setFilterSuccess] = useState("");
    useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://api.spacexdata.com/v3/Launches',
      );
        console.log(result.data)
        setData(result.data);
        result.data.forEach((item) => {
            setLaunchYearList((pre) => [...pre.filter((obj)=>obj.value!=item.launch_year),{ value: item.launch_year, label:  item.launch_year }])
        })
        result.data.forEach((item) => {
            setRocketNameList((pre) => [...pre.filter((obj)=>obj.value!=item.rocket.rocket_name),{ value: item.rocket.rocket_name, label:  item.rocket.rocket_name }])
        })
        result.data.forEach((item) => {
            setLaunchSuccessList((pre) => [...pre.filter((obj)=>obj.value!=(item.launch_success? 'yes': 'no')),{ value:  item.launch_success? 'yes': 'no', label:  item.launch_success ? 'success': 'unsuccess'}])
        })
        SETLOADCHECKER(false)
        console.log(launchSuccessList)
        console.log(data)
    };
    fetchData();
  }, []);

  const handleChangeYear = (e) => {
    setFilterYear(e.value);
  }
  const handleChangeName = (e) => {
    setFilterName(e.value);
  }
  const handleChangeSuccess = (e) => {
    setFilterSuccess(e.value);
  }
  const toLaunchDetail = (e) => {
    history.push('/LaunchDetails');
  }

  const customStyles = {
    option: (provided, state) => ({
        ...provided,
        borderBottom: "1px dotted gray",
        background: "#000",
        color: "white",
        opacity: 1,
        padding: 10,
        borderColor: state.isFocused ? "white" : "black",
      }),
    singleValue: (provided, state) => ({
        ...provided,
        color: "white",
      }),
    control: (base, state) => ({
      ...base,
      background: '#222',
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "white" : "black",
      // Removes weird border around container
      boxShadow: state.isFocused ? 5 : null,
      color: "white",
      // "&:hover": {
      //   // Overwrittes the different states of border
      //   borderColor: state.isFocused ? "light" : "white"
      // }
    })
  };

  return (
    <> 
     <Container className="Container">
        <Row>
            <Col xl='4'>
                <Select styles={customStyles} isDisabled={LOADCHECKER} placeholder={LOADCHECKER?'Loading...':'Select year'} isLoading={LOADCHECKER} options={launchYearList} onChange={handleChangeYear}></Select>
           
                <Select styles={customStyles} isDisabled={LOADCHECKER} placeholder={LOADCHECKER?'Loading...':'Select rocket name'} isLoading={LOADCHECKER} options={rocketNameList} onChange={handleChangeName}/>
    
                <Select styles={customStyles} isDisabled={LOADCHECKER} placeholder={LOADCHECKER?'Loading...':'success?'} isLoading={LOADCHECKER} options={launchSuccessList}  onChange={handleChangeSuccess}/>
            </Col>
            
        <Col xl='8'>
     <Table>
      <thead>
        <tr>
          <th>flight_number</th>
          <th>mission_name</th>
          <th>launch year</th>
          <th>rocket name</th>
          <th>launch success</th>
        </tr>
      </thead>
      <tbody>
      {console.log(filterSuccess)}
      {data.filter(item => item.launch_year.includes(filterYear))
      .filter(yItem => yItem.rocket.rocket_name.includes(filterName))
      .filter(nItem => (nItem.launch_success?'yes':'no').includes(filterSuccess))
      .map((launche) => {
          return(
            <tr className="listTable" onClick={toLaunchDetail}>
                <th scope="row">{launche.flight_number}</th>
                <td>{launche.mission_name}</td>
                <td>{launche.launch_year}</td>
                <td>{launche.rocket.rocket_name}</td>
                <td>{launche.launch_success ? 'success': 'unsuccess'}</td>
                {console.log(launche.launch_success?'yes':'no'.includes(filterSuccess))}
                {console.log(filterSuccess)}
            </tr>
          )
     })}
      </tbody>
      {console.log("success load")}
    </Table>
    </Col>
    </Row>
    </Container>
     </>
  )
} 