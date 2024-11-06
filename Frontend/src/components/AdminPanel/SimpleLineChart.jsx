import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
//   { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
//   { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
//   { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
// ];

const SimpleLineChart = (props) => {

    const [selected, setSelected] = useState(props.data.users) 
    // Update selected data based on `props.clicked`
  useEffect(() => {
    if (props.clicked === 1) {
      setSelected(props.data.users);
    } else if (props.clicked === 2) {
      setSelected(props.data.departments);
    } else {
      setSelected(props.data.complaints); // Fixed typo from "compliants" to "complaints"
    }
  }, [props.clicked, props.data]); // Re-run effect when `clicked` or `data` changes

    
    
    console.log(selected)
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={selected} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="createdAt" />
        <YAxis domain={[0, selected.length]} />
        {/* {console.log(props.data.createdAt)} */}
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="name" activeDot={{ r: 8 }}  stroke="#000000" strokeWidth={1} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SimpleLineChart;
