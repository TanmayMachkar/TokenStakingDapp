import RewardRate from './RewardRate';
import StakedAmount from './StakedAmount';
import EarnReward from './EarnReward';

const DisplayPanel = () => {
	return(
		<div className = 'top-wrapper'>
			<StakedAmount />
			<RewardRate />
			<EarnReward />
		</div>
	);
}

export default DisplayPanel;