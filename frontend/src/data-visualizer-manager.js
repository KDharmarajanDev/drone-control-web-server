import DataVizCard from './data-visualizer-card';
import { Grid, Button } from '@material-ui/core';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    button: {
      marginLeft: 'auto',
      marginRight: 'auto',
      borderColor: 'white',
      color: 'white',
      border: 'solid',
      borderColor: 'white',
      borderRadius: "10px",
      fontSize: "20px",
      padding: "10px"
    },
  });

export default function DataVizManager(props) {

    const [dataBoxes, setDataBoxes] = useState([]);
    const classes = useStyles();

    const onAddButtonClick = () => {
        const addedDataBox = {
            name: "Change Title"
        };
        setDataBoxes([...dataBoxes, addedDataBox]);
    }

    return (<div>
                <Button variant="outlined" className={classes.button} onClick={onAddButtonClick}>
                    Add Plot
                </Button>
                <Grid container>
                    {
                        dataBoxes.map(dataBox => (              
                            <Grid xs={12} md={6} item justify="center">
                                <DataVizCard dataBox={dataBox}/>
                            </Grid>))
                    }
                </Grid>
            </div>);
}
