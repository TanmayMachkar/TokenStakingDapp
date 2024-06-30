import { useRef, useContext } from 'react';
import Web3Context from '../../context/Web3Context';
import { ethers } from 'ethers';
import Button from '../Button/Button';
import { toast } from "react-hot-toast";
import StakingContext from '../../context/StakingContext'; 
import "./StakeToken.css";

const StakeAmount = () => {
	const { stakingContract } = useContext(Web3Context);
	const { isReload, setIsReload } = useContext(StakingContext);
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
			await toast.promise(transaction.wait(),
		    {
		      loading: "Transaction is pending...",
		      success: 'Transaction successful 👌',
		      error: 'Transaction failed 🤯'
		    });
		    stakeAmountRef.current.value = "";
		    setIsReload(!isReload);
			// const receipt = await transaction.wait();
			// if(receipt.status === 1) { //receipt = 1 then transaction is successfull
			// 	setTransactionStatus('Transaction is Successful');
			// 	setIsReload(!isReload);
			// 	setTimeout(() => {
			// 		setTransactionStatus('');
			// 	}, 5000);
				
			// } else {
			// 	setTransactionStatus('Transaction Failed');
			// }
		} catch(error) {
			toast.error('Token Staking Failed');
			console.error(error.message);
		}
	}

	return(
		<div>
			<form onSubmit={stakeToken} className="stake-amount-form">
		        <label className="stake-input-label">Enter Staked Amount:</label>
		        <input type="text" ref={stakeAmountRef} />
		    	<Button onClick={stakeToken} type="submit" label="Stake Token" />
		    </form>
		</div>
	);
}

export default StakeAmount;