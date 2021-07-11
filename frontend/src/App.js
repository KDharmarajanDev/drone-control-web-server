import './App.css';
import DataVizManager from './data-visualizer-manager';

function App() {
  return (
  <div id="background">
    <div id="main-content">
      <h1 id="main-title">Drone Control Web Server</h1>
      <div>
        <p id="connection-status">Disconnected</p>
      </div>
      <div class="booth">
        <img id="video-feed"/>
      </div>
      <div id="map">
      </div>
      <h2 id="data-plotting-title">Data Plotting</h2>
      <div id="data" class="dashboard-section">
        <DataVizManager/>
      </div>
    </div>
  </div>
  );
}

export default App;
