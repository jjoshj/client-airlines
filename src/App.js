
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter,Route} from "react-router-dom";
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Profilescreen from './screens/Profilescreen';
import Adminscreen from './screens/Adminscreen';
import Landingscreen from './screens/Landingscreen';
function App() {
  return (
    <div className="App">
    <Navbar/>
    <BrowserRouter>

    <Route path="/" exact component={Landingscreen}/>
    <Route path="/home" exact component={Homescreen}/>
    <Route path="/book/:planeid/:ondate" exact component={Bookingscreen}/>
    <Route path="/register" exact component={Registerscreen}/>
    <Route path="/login" exact component={Loginscreen}/>
    <Route path="/profile" exact component={Profilescreen}/>
    <Route path="/admin" exact component={Adminscreen}/>
   
    
    
    </BrowserRouter>

     </div>

  );
}

export default App;
