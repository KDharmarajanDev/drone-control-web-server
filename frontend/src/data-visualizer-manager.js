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
      padding: "10px",
      marginBottom: "10px",
      marginTop: "10px"
    },
  });

export default function DataVizManager(props) {

    const [dataBoxes, setDataBoxes] = useState([]);
    const classes = useStyles();

    let nextKey = 0;

    const getNextKey = () => {
        nextKey += 1;
        return nextKey;
    }

    const onAddButtonClick = () => {
        const addedDataBox = {
            name: "Plot " + dataBoxes.length,
            isUpdating: false,
            key: getNextKey()
        };
        setDataBoxes([...dataBoxes, addedDataBox]);
    }

    const removeDataBox = dataBox => {
        const newDataBoxes = dataBoxes.filter(inputBox => inputBox !== dataBox);
        setDataBoxes(newDataBoxes);
    };

    return (<div>
                <Button variant="outlined" className={classes.button} onClick={onAddButtonClick}>
                    Add Plot
                </Button>
                <Grid container spacing={6}>
                    {
                        dataBoxes.map(dataBox => (              
                            <Grid xs={12} md={6} item justify="center" key={dataBox.key}>
                                <DataVizCard dataBox={dataBox} removeDataBox={removeDataBox}/>
                            </Grid>))
                    }
                </Grid>
            </div>);
}
