import { useEffect, useState, useContext } from 'react';
import Web3Context from '../../context/Web3Context';
import { ethers } from 'ethers';

const EarnReward = () => {
	const { account, stakingContract } = useContext(Web3Context);
	const [ earnedReward, setEarnedReward ] = useState('0');

	useEffect(() => {
		const fetchEarnedReward = async() => {
			try{
				const earnedRewardWei = await stakingContract.earned(account);
				const earnedRewardEth = ethers.formatEther(earnedRewardWei);
				//console.log(earnedRewardEth);
				const roundedReward = parseFloat(earnedRewardEth).toFixed(2);
				setEarnedReward(roundedReward);
			}catch(error){
				console.error('Error Fetching Data: ', error.message);
			}
		}
		stakingContract && fetchEarnedReward();
	}, [stakingContract, account]);

	return(
		<div>
			<p>Earned Reward: {earnedReward} token</p>
		</div>
	);
}

export default EarnReward;