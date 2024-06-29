import './App.css';
import Wallet from './components/Wallet/Wallet';
import Navigation from './components/Navigation/Navigation';
import DisplayPanel from './components/DisplayPanel/DisplayPanel';
import StakeAmount from './components/StakeToken/StakeAmount';
import TokenApproval from './components/StakeToken/TokenApproval';
import Withdraw from './components/Withdraw/Withdraw';
import ClaimReward from './components/ClaimReward/ClaimReward';

function App() {
  return (
    <div className="App">
      <Wallet>
        <Navigation />
        <DisplayPanel />
        <StakeAmount />
        <TokenApproval />
        <Withdraw />
        <ClaimReward />
      </ Wallet>
    </div>
  );
}

export default App;