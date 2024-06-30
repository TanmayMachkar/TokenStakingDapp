import { useRef, useContext } from 'react';
import Web3Context from '../../context/Web3Context';
import { ethers } from 'ethers';
import Button from '../Button/Button';
import StakingContext from '../../context/StakingContext'; 
import { toast } from "react-hot-toast";
import "./Withdraw.css";

const Withdraw = () => {
	const { stakingContract } = useContext(Web3Context);
	const { isReload, setIsReload } = useContext(StakingContext);
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
			await toast.promise(transaction.wait(),
		    {
		      loading: "Transaction is pending...",
		      success: 'Transaction successful 👌',
		      error: 'Transaction failed 🤯'
		    });
		    withdrawTokenRef.current.value = "";
    		setIsReload(!isReload);
			//console.log(transaction);
			// setTransactionStatus('Transaction is pending...');
			// const receipt = await transaction.wait();
			// if(receipt.status === 1) { //receipt = 1 then transaction is successfull
			// 	setTransactionStatus('Transaction is Successful');
			// 	setIsReload(!isReload);
			// 	setTimeout(() => {
			// 		setTransactionStatus('');
			// 	}, 5000);
			// 	withdrawTokenRef.current.value = '';
			// } else {
			// 	setTransactionStatus('Transaction Failed');
			// }
		} catch(error) {
			toast.error('Token Withdrawing Failed');
			console.error(error.message);
		}
	}

	return(
		<div>
			<form className="withdraw-form" onSubmit={withdrawToken}>
	            <label>Withdraw Token:</label>
	            <input type="text" ref={withdrawTokenRef} />
	            <Button
		            onClick={withdrawToken}
		            type="submit"
		            label="Withdraw Staked Token"
	            />
		    </form>
		</div>
	);
}

export default Withdraw;