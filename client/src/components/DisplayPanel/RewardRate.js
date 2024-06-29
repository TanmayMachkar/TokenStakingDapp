import { useEffect, useState, useContext } from 'react';
import Web3Context from '../../context/Web3Context';
import { ethers } from 'ethers';

const RewardRate = () => {
	const { stakingContract, account } = useContext(Web3Context);
	const [ rewardRate, setRewardRate ] = useState('0');

	useEffect(() => {
		const fetchRewardRate = async() => {
			try{
				const amountRewardRateWei = await stakingContract.REWARD_RATE();
				const amountRewardRateEth = ethers.formatEther(amountRewardRateWei);
				//console.log(amountRewardRateEth);
				setRewardRate(amountRewardRateEth);
			}catch(error){
				console.error('Error Fetching Data: ', error.message);
			}
		}
		stakingContract && fetchRewardRate();
	}, [stakingContract, account]);

	return(
		<div>
			<p>Reward Rate: {rewardRate} token/second</p>
		</div>
	);
}

export default RewardRate;