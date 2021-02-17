import React, {useState, useEffect} from 'react';
import axios from 'axios';

import { Table } from 'reactstrap';

import Select from 'react-select';

import '../styles/LaunchPage.css';

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
        // 'https://hn.algolia.com/api/v1/search?query=redux',
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
    console.log("Fruit Selected!!");
    // console.log(e.value)
    console.log(e.value)
    console.log(filterYear)
    setFilterYear(e.value);
    console.log(filterYear)
    console.log(filterYear)
  }
  const handleChangeName = (e) => {
    console.log("Fruit Selected!!");
    // console.log(e.value)
    // console.log(e.value)
    // console.log(filterYear)
    setFilterName(e.value);
    console.log(filterName)
    console.log(filterYear)
  }
  const handleChangeSuccess = (e) => {
    console.log("Fruit Selected!!");
    // console.log(e.value)
    // console.log(e.value)
    // console.log(filterYear)
    setFilterSuccess(e.value);
    console.log(filterSuccess)
    console.log(filterYear)
    console.log(filterName)
  }

  return (
    <>
     <Select options={launchYearList} value={filterYear} onChange={handleChangeYear}>
     </Select>
     <Select options={rocketNameList} value={filterName} onChange={handleChangeName}/>
     <Select options={launchSuccessList} value={filterSuccess} onChange={handleChangeSuccess}/>
     
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
      {/* .includes(filterSuccess) */}
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
                {console.log(launche.launch_success)}
                {console.log(filterSuccess+"1")}
                <td>{launche.launch_success ? 'success': 'unsuccess'}</td>
            </tr>
          )
        //  console.log(filterYear)
     })}
      </tbody>
      {console.log("success load")}
    </Table>
    
    {/* <ul>
     {data.map(item => (
         <li key={item.objectID}>
             <h3>{item.mission_name}</h3>
           <a href={item.url}>{item.title}</a>
         </li>
       ))}
     </ul> */}
     </>
  )
} 