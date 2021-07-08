import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        color: "white",
        textAlign: "center"
    }
});
  
export default function DataVizCard(props) {
    const classes = useStyles();

    return (<Card className={classes.root} key={props.name}>
                <CardHeader title={props.name} className={classes.title}/>

            </Card>
           );
}  