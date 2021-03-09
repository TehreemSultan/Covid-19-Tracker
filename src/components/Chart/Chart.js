import React, {useState, useEffect} from 'react';
import {fetchDailyData} from '../../api';
import {Line, Bar} from 'react-chartjs-2';
import styles from './Chart.module.css'

const Chart = ({data:{confirmed, recovered, deaths}, country}) => {
    const [dailyData, setDailyData] = useState([]);
 
    useEffect(()=>{
        const fetchApi= async () =>{
            setDailyData(await fetchDailyData());
        }
     
        fetchApi();
      
    },[]);

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
    );
 
    const barChart=(
        confirmed?
        (<Bar
        data={{
            labels:['Infected', 'Recovered', 'Deaths'],
            datasets:[{
                data:[confirmed.value, recovered.value, deaths.value],
                label:'People',
                backgroundColor:['rgba(0, 0, 255, 0.8)', 'rgba(1, 173, 1, 0.8) ', 'rgba(255, 0, 0, 0.8)']
            }],
           
        }}
        options={{
            legend:{display:false},
            title:{display:true, text:`Current state in ${country}`},
        }}
        
        /> ) 
        :null   
)

    return (
        <div className={styles.container}>
            {country?barChart:lineChart}
           
        </div>
    )
}

export default Chart
