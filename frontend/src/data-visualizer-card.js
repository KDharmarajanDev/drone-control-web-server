import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import { LineChart } from 'recharts';
import { Button, Avatar, IconButton } from '@material-ui/core';
import { useState } from 'react';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DeleteIcon from '@material-ui/icons/Delete';
import Delete from '@material-ui/icons/Delete';

const useStyles = makeStyles({
    root: {
        color: "#E7DFDD",
        textAlign: "center",
        backgroundColor: "#4717F6",
    },
    title: {
        color: "#E7DFDD",
        fontFamily: ["Duru Sans", "sans-serif"],
        textAlign: "center"
    },
    updatingCard: {
        backgroundColor: "green"
    },
    notUpdatingCard: {
        backgroundColor: "red"
    },
    updatingButton: {
        color: "#E7DFDD",
        borderColor: "#E7DFDD"
    },
    deleteIcon: {
        color: "#E7DFDD"
    }
});
  
export default function DataVizCard(props) {
    const classes = useStyles();

    const data = [];
    const [isUpdating, setIsUpdating] = useState(props.dataBox.isUpdating);

    const onUpdateButtonClick = () => {
        setIsUpdating(!isUpdating);
        props.dataBox.isUpdating = isUpdating;
    };

    const removeCard = () => {
        props.removeDataBox(props.dataBox);
    };

    return (<Card className={classes.root} key={props.dataBox.name} m>
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
                title={props.dataBox.name} className={classes.title}
                titleTypographyProps={{variant:'h4', align: 'center'}}/>
                <LineChart width={200} height={200} data={data}>
                </LineChart>
                <Button variant="outlined" onClick={onUpdateButtonClick} className={classes.updatingButton}>
                    {isUpdating ? "Stop Updating" : "Start Updating"}
                </Button>
                <IconButton onClick={removeCard}>
                    <DeleteIcon className={classes.deleteIcon}/>
                </IconButton>
            </Card>
           );
}  