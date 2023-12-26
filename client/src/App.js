import   ResponsiveAppBar from  './components/navbar.js'
import Footer from './components/footer.js';
import { Route,Switch,Routes,Router } from 'react-router-dom';
import    Mycodes  from './components/Mycodes.js';
import Compiler from './components/Compiler.js';
import './App.css'; // Replace with the correct path to your CSS file

import Help from './components/help.js'
function App(){
  
  return (
    
    <div className="App">
      <div className="main">
      <ResponsiveAppBar/>
      
      <Routes>
        <Route path="/" element={<Compiler />} />

        <Route path="/Mycodes" element={<Mycodes />} />
        <Route path="/help"    element={<Help />}/>
        
      </Routes>
      </div>
      <Footer className="footer"/>
    </div>
  );
}

export default App;
