import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import { LineChart } from 'recharts';
import { Button, Avatar } from '@material-ui/core';
import { useState } from 'react';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles({
    root: {
        color: "white",
        textAlign: "center"
    },
    title: {
        color: "black",
        fontFamily: ["Duru Sans", "sans-serif"]
    },
    updatingCard: {
        backgroundColor: "green"
    },
    notUpdatingCard: {
        backgroundColor: "red"
    }
});
  
export default function DataVizCard(props) {
    const classes = useStyles();

    const data = [];
    const [isUpdating, setIsUpdating] = useState(false);

    return (<Card className={classes.root} key={props.dataBox.name}>
                <CardHeader 
                avatar = {
                    isUpdating ? 
                    (<Avatar className={classes.updatingCard}>
                        <CheckCircleOutlineIcon/>
                    </Avatar>) : 
                    (<Avatar className={classes.notUpdatingCard}>
                        <HighlightOffIcon/>
                    </Avatar>)
                }
                title={props.dataBox.name} className={classes.title}/>
                <LineChart width={200} height={200} data={data}>
                </LineChart>
                <Button></Button>
            </Card>
           );
}  