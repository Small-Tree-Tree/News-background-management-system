import React from 'react';
import './App.css';
import {useRoutes} from "react-router-dom"
import {router} from "./router"
function App() {
  const element = useRoutes(router)
  return (
    <div>
      {element}
    </div>
  );
}

export default App;
