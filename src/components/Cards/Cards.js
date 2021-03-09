import React from 'react';
import {Card, CardContent, Typography, Grid} from '@material-ui/core';
import styles from './Cards.module.css';
import CountUp from 'react-countup';

const Cards = ({data: {confirmed, recovered, deaths, lastUpdate}}) => {
    if(!confirmed){
        return 'loading...'
    }
    const data=[
        {
            id:0,
            cardData:confirmed,
            cardHeading:"Infected",
            cardPara:"number of active cases of covid 19"
        },
        {
            id:1,
            cardData:recovered,
            cardHeading:"Recovered",
            cardPara:"number of recoveries from covid 19"
        },
        {
            id:2,
            cardData:deaths, 
            cardHeading:"Deaths",
            cardPara:"number of deaths from covid 19"
        }
    ];
    const cards=data.map((item)=>{
        return(<Grid item component={Card} xs={12} md={3} key={item.id} className={`${styles.card}
         ${item.cardHeading==='Infected'?styles.Infected:
         item.cardHeading==='Recovered'?styles.Recovered:styles.Deaths}`}>
        <CardContent>
            <Typography color='textSecondary' gutterBottom>{item.cardHeading}</Typography>
            <Typography variant="h5">
                <CountUp start={0} end={item.cardData.value} duration={2.5} separator=","/>
            </Typography>
            <Typography color='textSecondary'>{new Date(lastUpdate).toDateString()}</Typography>
            <Typography variant='body2'>{item.cardPara}</Typography>
        </CardContent>
    </Grid>
    )})
    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify='center'>
            {cards}  
            </Grid>
        </div>
    )
}

export default Cards


