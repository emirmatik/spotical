import React from "react";
import './App.css';
import {MyContext} from './context';
import Nav from './components/Nav';
import Main from './components/Main';
import LoadingScreen from './components/LoadingScreen';

function App() {
  let {loading, pickedMusic} = React.useContext(MyContext);

  return (
    <div className="container">
      <Nav />
      <Main />
      {loading && <LoadingScreen />}
      <audio src={pickedMusic && pickedMusic.src} id="besmt">
        <source  type="audio/mpeg"></source>
      </audio>
    </div>
  );
}

export default App;
