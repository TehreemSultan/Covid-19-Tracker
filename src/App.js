import React from 'react'
import {Cards, Chart, CountryPicker} from './components';
import styles from './App.module.css';
import {fetchData} from './api';
import image from './images/Coronavirus.png'

class App extends React.Component{

state={
    data:{},
    country:'',
}

async componentDidMount(){
    const fetchedData= await fetchData();
    this.setState({data: fetchedData})
}

handleCountryChange= async(country)=>{
    const fetchedData= await fetchData(country);
    this.setState({data: fetchedData, country:country})
}
render(){
    const {data,country}=this.state;
    return (
        <div className={styles.container}>
            <h1 className={styles.title} >
                <img src={image} alt="corona" className={styles.image} />COVID-19 TRACKER</h1>
           <Cards data={data}/>
           <CountryPicker handleCountryChange={this.handleCountryChange}/>
           <Chart data={data} country={country}/>
           <div ><h6 style={{color:' rgb(143, 143, 143)', padding:'0px',
            margin:'50px 0px 0px 0px'}}>Made By Tehreem Sultan</h6></div>
        </div>
    )
}}

export default App

