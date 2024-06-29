import './App.css';
import Wallet from './components/Wallet/Wallet';
import Navigation from './components/Navigation/Navigation';
import DisplayPanel from './components/DisplayPanel/DisplayPanel';
import StakeAmount from './components/StakeToken/StakeAmount';
import TokenApproval from './components/StakeToken/TokenApproval';

function App() {
  return (
    <div className="App">
      <Wallet>
        <Navigation />
        <DisplayPanel />
        <StakeAmount />
        <TokenApproval />
      </ Wallet>
    </div>
  );
}

export default App;