import { useRef, useState, useContext } from 'react';
import Web3Context from '../../context/Web3Context';
import { ethers } from 'ethers';
import Button from '../Button/Button';

const StakeAmount = () => {
	const { stakingContract } = useContext(Web3Context);
	const [ transactionStatus, setTransactionStatus ] = useState('');
	const stakeAmountRef = useRef();
	const stakeToken = async(e) => {
		e.preventDefault(); //prevent form from auto submitting as soon as token is approved
		const amount = stakeAmountRef.current.value.trim();
		if(isNaN(amount) || amount <= 0) { //isNan = is not a number
			console.error('Please enter a valid positive number');
			return;
		}
		const amountToStake = ethers.parseUnits(amount, 18).toString(); //convert to wei so that smart contract can process it
		//console.log(amountToSend);

		try{
			const transaction = await stakingContract.stake(amountToStake);
			//console.log(transaction);
			setTransactionStatus('Transaction is pending...');
			const receipt = await transaction.wait();
			if(receipt.status === 1) { //receipt = 1 then transaction is successfull
				setTransactionStatus('Transaction is Successful');
				setTimeout(() => {
					setTransactionStatus('');
				}, 5000);
				stakeAmountRef.current.value = '';
			} else {
				setTransactionStatus('Transaction Failed');
			}
		} catch(error) {
			console.error('Token Staking Failed', error.message);
		}
	}

	return(
		<div>
			{transactionStatus && <div>{transactionStatus}</div>}
			<form onSubmit = {stakeToken}>
				<label>Amount to Stake: </label>
				<input type = 'text' ref = {stakeAmountRef} />
				<Button onClick = {stakeToken} type = 'submit' label = 'Stake' />
			</form>
		</div>
	);
}

export default StakeAmount;