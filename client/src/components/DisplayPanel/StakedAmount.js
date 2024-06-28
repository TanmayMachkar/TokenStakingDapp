import { useEffect, useState, useContext } from 'react';
import Web3Context from '../../context/Web3Context';
import { ethers } from 'ethers';

const StakedAmount = () => {
	const { account, stakingContract } = useContext(Web3Context);
	const [ stakedAmount, setStakedAmount ] = useState('0');

	useEffect(() => {
		const fetchStakeBalance = async() => {
			try{
				const amountStakedWei = await stakingContract.stakedBalance(account);
				const amountStakedEth = ethers.formatEther(amountStakedWei);
				// console.log(amountStakedEth);
				setStakedAmount(amountStakedEth);
			}catch(error){
				console.error('Error Fetching Data: ', error.message);
			}
		}
		stakingContract && fetchStakeBalance();
	}, [stakingContract, account]);

	return(
		<div>
			<p>Staked Amount: {stakedAmount} eth</p>
		</div>
	);
}

export default StakedAmount;