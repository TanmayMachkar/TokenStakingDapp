import { useEffect, useState, useContext } from 'react';
import Web3Context from '../../context/Web3Context';
import { ethers } from 'ethers';
import { toast } from "react-hot-toast";
import "./DisplayPanel.css";

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
				toast.error('Error Fetching Reward Rate: ');
				console.error(error.message);
			}
		}
		stakingContract && fetchRewardRate();
	}, [stakingContract, account]);

	return(
		<div className = 'reward-rate'>
			<p>Reward Rate: </p>
			<span>{rewardRate} token/second</span>
		</div>
	);
}

export default RewardRate;