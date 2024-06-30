import { useEffect, useState, useContext } from 'react';
import Web3Context from '../../context/Web3Context';
import { ethers } from 'ethers';
import { toast } from "react-hot-toast";
import './DisplayPanel.css';

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
				toast.error('Error Fetching the Reward: ');
				console.error(error.message);
			}
		}
		const interval = setInterval(() => {
			stakingContract && fetchEarnedReward();
		},1000)
		return () => clearInterval(interval);
	}, [stakingContract, account]);

	return(
		<div className="earned-reward">
			<p>Earned Reward: </p>
			<span>{earnedReward} token</span>
		</div>
	);
}

export default EarnReward;