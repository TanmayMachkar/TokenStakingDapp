import RewardRate from './RewardRate';
import StakedAmount from './StakedAmount';
import EarnReward from './EarnReward';

const DisplayPanel = () => {
	return(
		<div>
			<StakedAmount />
			<RewardRate />
			<EarnReward />
		</div>
	);
}

export default DisplayPanel;