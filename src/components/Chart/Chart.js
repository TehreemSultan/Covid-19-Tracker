import React, {useState, useEffect} from 'react';
import {fetchDailyData} from '../../api';
import {Line, Bar} from 'react-chartjs-2';
import styles from './Chart.module.css'

const Chart = () => {
    const [dailyData, setDailyData] = useState([{check:"mm"}]);

    useEffect(()=>{
        const fetchApi= async () =>{
            setDailyData(await fetchDailyData());
            console.log(dailyData);
        }
     
        fetchApi();
      
    });

    const lineChart=(
        dailyData.length?
        (<Line
        data={{
            labels:dailyData.map(({date})=>date),
            datasets:[{
                data:dailyData.map(({confirmed})=>confirmed),
                label:'Infected',
                borderColor:'blue',
                backgroundColor:'rgba(0,0,225,0.2)',
                fill:true
            },{
                data:dailyData.map(({deaths})=>deaths),
                label:'Deaths',
                borderColor:'red',
                backgroundColor:'rgba(225,0,0,0.2)',
                fill:true
            }]
        }}
        />):null
    )

    return (
        <div className={styles.container}>
            {lineChart}
        </div>
    )
}

export default Chart
