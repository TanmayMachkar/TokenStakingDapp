import { useContext } from 'react';
import Web3Context from '../../context/Web3Context';

const ConnectedAccount = () => {
	const { account } = useContext(Web3Context);

	return(
		<div>
			<p>Connected Account: {account}</p>
		</div>
	);
}

export default ConnectedAccount;