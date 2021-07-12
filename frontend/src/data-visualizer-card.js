import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import { LineChart } from 'recharts';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        color: "white",
        textAlign: "center"
    },
    title: {
        color: "black",
        fontFamily: ["Duru Sans", "sans-serif"]
    }
});
  
export default function DataVizCard(props) {
    const classes = useStyles();

    const data = [];

    return (<Card className={classes.root} key={props.dataBox.name}>
                <CardHeader title={props.dataBox.name} className={classes.title}/>
                <LineChart width={200} height={200} data={data}>
                </LineChart>
                <Button></Button>
            </Card>
           );
}  