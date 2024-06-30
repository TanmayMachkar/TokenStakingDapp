import ConnectedAccount from './ConnectedAccount';
import ConnectedNetwork from './ConnectedNetwork';
import ClaimReward from "../ClaimReward/ClaimReward";
import "./Navigation.css";

const Navigation = () => {
	return(
		<div>
			<header className="navbar">
			    <div className="navbar-btns">
			      <ClaimReward />
			    </div>
			    <div className="navbar-acc">
			      <ConnectedAccount />
			      <ConnectedNetwork />
			    </div>
			</header>
		</div>
	);
}

export default Navigation;