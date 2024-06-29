import { useState, useContext } from 'react';
import Web3Context from '../../context/Web3Context';
import Button from '../Button/Button';

const ClaimReward = () => {
	const { stakingContract } = useContext(Web3Context);
	const [ transactionStatus, setTransactionStatus ] = useState('');
	const ClaimRewardToken = async(e) => {
		try{
			const transaction = await stakingContract.getReward();
			//console.log(transaction);
			setTransactionStatus('Transaction is pending...');
			const receipt = await transaction.wait();
			if(receipt.status === 1) { //receipt = 1 then transaction is successfull
				setTransactionStatus('Transaction is Successful');
				setTimeout(() => {
					setTransactionStatus('');
				}, 5000);
			} else {
				setTransactionStatus('Transaction Failed');
			}
		} catch(error) {
			console.error('Claim Reward Failed', error.message);
		}
	}

	return(
		<div>
			{transactionStatus && <div>{transactionStatus}</div>}
			<Button onClick = {ClaimRewardToken} type = 'button' label = 'Claim Reward' />
		</div>
	);
}

export default ClaimReward;