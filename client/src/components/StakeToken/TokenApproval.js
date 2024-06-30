import { useRef, useContext } from 'react';
import Web3Context from '../../context/Web3Context';
import { ethers } from 'ethers';
import { toast } from "react-hot-toast";
import Button from '../Button/Button';
import "./StakeToken.css";

const TokenApproval = () => {
	const { stakeTokenContract, stakingContract } = useContext(Web3Context);
	const approvedTokenRef = useRef();
	const approveToken = async(e) => {
		e.preventDefault(); //prevent form from auto submitting as soon as token is approved
		const amount = approvedTokenRef.current.value.trim();
		if(isNaN(amount) || amount <= 0) { //isNan = is not a number
			console.error('Please enter a valid positive number');
			return;
		}
		const amountToSend = ethers.parseUnits(amount, 18).toString(); //convert to wei so that smart contract can process it
		//console.log(amountToSend);

		try{
			const transaction = await stakeTokenContract.approve(stakingContract.target, amountToSend); //stakingContract.target = address of staking contract deployed on sepolia
			await toast.promise(transaction.wait(),
		    {
		      loading: "Transaction is pending...",
		      success: 'Transaction successful 👌',
		      error: 'Transaction failed 🤯'
		    });
		    approvedTokenRef.current.value = '';
			//console.log(transaction);
			// setTransactionStatus('Transaction is pending...');
			// const receipt = await transaction.wait();
			// if(receipt.status === 1) { //receipt = 1 then transaction is successfull
			// 	setTransactionStatus('Transaction is Successful');
			// 	setTimeout(() => {
			// 		setTransactionStatus('');
			// 	}, 5000);
			// 	approvedTokenRef.current.value = '';
			// } else {
			// 	setTransactionStatus('Transaction Failed');
			// }
		} catch(error) {
			toast.error('Token Approval Failed');
			console.error(error.message);
		}
	}

	return(
		<div>
			<form onSubmit={approveToken} className="token-amount-form">
		        <label className="token-input-label">Token Approval:</label>
		        <input type="text" ref={approvedTokenRef} />
		        <Button onClick={approveToken} type="submit" label="Token Approval" />
		    </form>
		</div>
	);
}

export default TokenApproval;