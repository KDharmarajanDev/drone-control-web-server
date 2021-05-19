import logo from './logo.svg';
import './App.css';

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
        <input type="text" class="dashboard-section-title" size="20" placeholder="Data Plot Title"/>
        <div class="topic-data-container">
          <label for="data-topic-input" class="input-box-labels">ROS Topic of Data:</label>
          <input type="text" id="data-topic-input" size="13"/>
        </div>
        <div class="topic-data-container">
          <label for="data-topic-input" class="input-box-labels">Data Being Plotted:</label>
          <input type="text" size="13"/>
        </div>
        <button id="start-plotting-button">Start Plotting Data</button>
        <div id="plot" class="data-plots"></div>
      </div>
      <script type="module" src="/public/js/main.js"></script> 
    </div>
  </div>
  );
}

export default App;
