
import './App.css';
import Greeting  from './greeting.js';
import User  from './user.js';
import Profile from "./profile.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
       
         <Greeting/>  <User age = {24}/> 
         <Profile name = 'Aren' surname = {'Arzumanyan'} href='https://facebook.com/aren.arzumanyan'/>
      </header>
    </div>
  );
}

export default App;
