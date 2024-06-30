import { useEffect, useState, useContext } from 'react';
import Web3Context from '../../context/Web3Context';
import StakingContext from '../../context/StakingContext';
import { ethers } from 'ethers';
import { toast } from "react-hot-toast";
import "./DisplayPanel.css";

const StakedAmount = () => {
	const { account, stakingContract } = useContext(Web3Context);
	const [ stakedAmount, setStakedAmount ] = useState('0');
	const { isReload } = useContext(StakingContext);

	useEffect(() => {
		const fetchStakeBalance = async() => {
			try{
				const amountStakedWei = await stakingContract.stakedBalance(account);
				const amountStakedEth = ethers.formatEther(amountStakedWei);
				// console.log(amountStakedEth);
				setStakedAmount(amountStakedEth);
			}catch(error){
				toast.error('Error Fetching Staked Amount: ');
				console.error(error.message);
			}
		}
		stakingContract && fetchStakeBalance();
	}, [stakingContract, account, isReload]);

	return(
		<div className="staked-amount">
			<p>Staked Amount: </p>
			<span>{stakedAmount} token</span>
		</div>
	);
}

export default StakedAmount;