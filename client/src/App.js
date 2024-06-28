import './App.css';
import Wallet from './components/Wallet/Wallet';
import Navigation from './components/Navigation/Navigation';
import DisplayPanel from './components/DisplayPanel/DisplayPanel';

function App() {
  return (
    <div className="App">
      <Wallet>
        <Navigation />
        <DisplayPanel />
      </ Wallet>
    </div>
  );
}

export default App;