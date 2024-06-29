import { useRef, useState, useContext } from 'react';
import Web3Context from '../../context/Web3Context';
import { ethers } from 'ethers';
import Button from '../Button/Button';

const Withdraw = () => {
	const { stakingContract } = useContext(Web3Context);
	const [ transactionStatus, setTransactionStatus ] = useState('');
	const withdrawTokenRef = useRef();
	const withdrawToken = async(e) => {
		e.preventDefault(); //prevent form from auto submitting as soon as token is approved
		const amount = withdrawTokenRef.current.value.trim();
		if(isNaN(amount) || amount <= 0) { //isNan = is not a number
			console.error('Please enter a valid positive number');
			return;
		}
		const amountToWithdraw = ethers.parseUnits(amount, 18).toString(); //convert to wei so that smart contract can process it
		try{
			const transaction = await stakingContract.withdrawStakedTokens(amountToWithdraw);
			//console.log(transaction);
			setTransactionStatus('Transaction is pending...');
			const receipt = await transaction.wait();
			if(receipt.status === 1) { //receipt = 1 then transaction is successfull
				setTransactionStatus('Transaction is Successful');
				setTimeout(() => {
					setTransactionStatus('');
				}, 5000);
				withdrawTokenRef.current.value = '';
			} else {
				setTransactionStatus('Transaction Failed');
			}
		} catch(error) {
			console.error('Token Withdrawing Failed', error.message);
		}
	}

	return(
		<div>
			{transactionStatus && <div>{transactionStatus}</div>}
			<form onSubmit = {withdrawToken}>
				<label>Amount to Withdraw: </label>
				<input type = 'text' ref = {withdrawTokenRef} />
				<Button onClick = {withdrawToken} type = 'submit' label = 'Withdraw' />
			</form>
		</div>
	);
}

export default Withdraw;