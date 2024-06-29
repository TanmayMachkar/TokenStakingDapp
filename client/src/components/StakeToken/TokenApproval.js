import { useRef, useState, useContext } from 'react';
import Web3Context from '../../context/Web3Context';
import { ethers } from 'ethers';
import Button from '../Button/Button';

const TokenApproval = () => {
	const { stakeTokenContract, stakingContract } = useContext(Web3Context);
	const [ transactionStatus, setTransactionStatus ] = useState('');
	const approvedTokenRef = useRef();
	const approveToken = async(e) => {
		e.preventDefault(); //prevent formfrom auto submitting as soon as token is approved
		const amount = approvedTokenRef.current.value.trim();
		if(isNaN(amount) || amount <= 0) { //isNan = is not a number
			console.error('Please enter a valid positive number');
			return;
		}
		const amountToSend = ethers.parseUnits(amount, 18).toString(); //convert to wei so that smart contract can process it
		//console.log(amountToSend);

		try{
			const transaction = await stakeTokenContract.approve(stakingContract.target, amountToSend); //stakingContract.target = address of staking contract deployed on sepolia
			//console.log(transaction);
			setTransactionStatus('Transaction is pending...');
			const receipt = await transaction.wait();
			if(receipt.status === 1) { //receipt = 1 then transaction is successfull
				setTransactionStatus('Transaction is Successfull');
				setTimeout(() => {
					setTransactionStatus('');
				}, 5000);
				approvedTokenRef.current.value = '';
			} else {
				setTransactionStatus('Transaction Failed');
			}
		} catch(error) {
			console.error('Token Approval Failed', error.message);
		}
	}

	return(
		<div>
			{transactionStatus}
			<form onSubmit = {approveToken}>
				<label>Token Approval: </label>
				<input type = 'text' ref = {approvedTokenRef} />
				<Button onClick = {approveToken} type = 'submit' label = 'Token Approve' />
			</form>
		</div>
	);
}

export default TokenApproval;