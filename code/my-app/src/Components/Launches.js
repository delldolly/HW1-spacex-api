import React, {useState, useEffect} from 'react';
import axios from 'axios';


export default function Launches(){
    // const response = await fetch('https://api.spacexdata.com/v3/rockets')
    // const data = await response.json()
    // console.log(data)
    const [data, setData] = useState([]);
    
    useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        // 'https://hn.algolia.com/api/v1/search?query=redux',
        'https://api.spacexdata.com/v3/Launches',
      );
        console.log(result.data.hits)
      setData(result.data);
    };
 
    fetchData();
  }, []);
    
  return (
    <ul>
      {data.map(item => (
        <li key={item.objectID}>
            <h3>{item.mission_name}</h3>
          {/* <a href={item.url}>{item.title}</a> */}
        </li>
      ))}
    </ul>
  )
} 