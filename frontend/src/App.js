import './App.css';
import DataVizCard from './data-visualizer-card';
import { Grid } from '@material-ui/core';

function App() {
  return (
  <div id="background">
    <div id="main-content">
      <h1 id="main-title">Drone Control Web Server</h1>
      <div>
        <p id="connection-status">Disconnected</p>
      </div>
      <button id="arm-button" class="action-button">Arm</button>
      <button id="fly-button" class="action-button">Fly Home</button>
      <button id="test" class="action-button">Test</button>
      <button id="pause-mission-button" class="action-button">Pause Mission/Rest</button>
      <div class="booth">
        <img id="video-feed"/>
      </div>
      <div id="map">
      </div>
      <h2 id="data-plotting-title">Data Plotting</h2>
      <div id="data" class="dashboard-section">
        <Grid container >
          <DataVizCard name="Test"/>
        </Grid>
      </div>
    </div>
  </div>
  );
}

export default App;
