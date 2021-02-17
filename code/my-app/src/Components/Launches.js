import React, {useState, useEffect} from 'react';
import axios from 'axios';

import { Table } from 'reactstrap';

import Select from 'react-select';

import '../styles/LaunchPage.css';

import { Container, Row, Col } from 'reactstrap';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  

export default function Launches(){
    const [data, setData] = useState([]);
    const [launchYearList, setLaunchYearList] = useState([]);
    const [rocketNameList, setRocketNameList] = useState([]);
    const [launchSuccessList, setLaunchSuccessList] = useState([]);

    const [filterYear, setFilterYear] = useState();
    const [filterName, setFilterName] = useState();
    const [filterSuccess, setFilterSuccess] = useState();
    useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://api.spacexdata.com/v3/Launches',
      );
        console.log(result.data)
        setData(result.data);
        result.data.forEach((item) => {
            setLaunchYearList((pre) => [...pre,{ value:  item.launch_year, label:  item.launch_year }])
        })
        result.data.forEach((item) => {
            setRocketNameList((pre) => [...pre,{ value:  item.rocket.rocket_name, label:  item.rocket.rocket_name }])
        })
        result.data.forEach((item) => {
            setLaunchSuccessList((pre) => [...pre,{ value:  item.launch_success, label:  item.launch_success ? 'success': 'unsuccess'}])
        })
        
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
  const customStyles = {
    option: (provided, state) => ({
        ...provided,
        borderBottom: "1px dotted gray",
        background: "#000",
        color: "white",
        opacity: 1,
        padding: 20,
      }),
    singleValue: (provided, state) => ({
        ...provided,
        color: "white",
      }),
    control: (base, state) => ({
      ...base,
      background: '#222',
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "white" : "light",
      // Removes weird border around container
      boxShadow: state.isFocused ? 5 : null,
      color: "white",
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? "light" : "white"
      }
    })
  };

  return (
    <> 
     <Container>
        <Row>
            <Col xl='4'>
                <Select styles={customStyles} placeholder={'Select year'} isLoading={true} options={launchYearList} onChange={handleChangeYear}></Select>
           
                <Select styles={customStyles} placeholder={'Select rocket name'} isLoading={true} options={rocketNameList} onChange={handleChangeName}/>
    
                <Select styles={customStyles} placeholder={'success?'} isLoading={true} options={launchSuccessList}  onChange={handleChangeSuccess}/>
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
      
      {data.filter(item => item.launch_year.includes(filterYear))
      .filter(yItem => yItem.rocket.rocket_name.includes(filterName))
      .filter(nItem => (nItem.launch_success?'yes': 'no').includes(filterSuccess?'yes': 'no'))
      .map((launche) => {
          return(
            <tr>
                <th scope="row">{launche.flight_number}</th>
                <td>{launche.mission_name}</td>
                <td>{launche.launch_year}</td>
                <td>{launche.rocket.rocket_name}</td>
                <td>{launche.launch_success ? 'success': 'unsuccess'}</td>
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