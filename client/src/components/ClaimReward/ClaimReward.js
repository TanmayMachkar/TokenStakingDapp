import { useContext } from 'react';
import Web3Context from '../../context/Web3Context';
import { toast } from "react-hot-toast";
import Button from '../Button/Button';
import "./ClaimReward.css";

const ClaimReward = () => {
	const { stakingContract } = useContext(Web3Context);
	const ClaimRewardToken = async(e) => {
		try{
			const transaction = await stakingContract.getReward();
			//console.log(transaction);
			// const receipt = await transaction.wait();
			await toast.promise(transaction.wait(),
		    {
		      loading: "Transaction is pending...",
		      success: 'Transaction successful 👌',
		      error: 'Transaction failed 🤯'
		    });
			// if(receipt.status === 1) { //receipt = 1 then transaction is successfull
			// 	setTransactionStatus('Transaction is Successful');
			// 	setTimeout(() => {
			// 		setTransactionStatus('');
			// 	}, 5000);
			// } else {
			// 	setTransactionStatus('Transaction Failed');
			// }
		} catch(error) {
			toast.error('Claim Reward Failed');
			console.error(error.message);
		}
	}

	return(
		<div className = 'claim-reward'>
			<Button onClick = {ClaimRewardToken} type = 'button' label = 'Claim Reward' />
		</div>
	);
}

export default ClaimReward;