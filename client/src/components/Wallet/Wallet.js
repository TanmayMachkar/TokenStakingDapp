import { useState, useEffect } from 'react';
import { connectWallet } from '../../utils/connectWallet';
import Web3Context from '../../context/Web3Context';
import Button from '../Button/Button';
import { handleAccountChange } from '../../utils/handleAccountChange';
import { handleChainChange } from '../../utils/handleChainChange';

const Wallet = ({children}) => {
	const [state, setState] = useState({
		provider: null,
		account: null,
		stakingContract: null,
		stateTokenContract: null,
		chainId: null
	});
	const [isLoading, setIsLoading] = useState(false);

	const handleWallet = async() => {
		try{
			setIsLoading(true);
			const { 
				provider, 
				account, 
				stakingContract, 
				stateTokenContract, 
				chainId 
			} = await connectWallet();
			console.log(
				"Provider: ",provider, 
				"Account: ",account, 
				"stakingContract: ",stakingContract, 
				"stateTokenContract: ",stateTokenContract, 
				"chainId: ",chainId
			);
			setState({
				provider, 
				account, 
				stakingContract, 
				stateTokenContract, 
				chainId
			});
		} catch(error) {
			console.log('Error connecting wallet: ', error.message);
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		window.ethereum.on('accountsChanged', () => {
			handleAccountChange(setState)
		})
		window.ethereum.on('chainChanged', () => {
			handleChainChange(setState)
		})

		return() => {
			window.ethereum.removeListener('accountsChanged', () => {
			handleAccountChange(setState)
			})
			window.ethereum.removeListener('chainChanged', () => {
				handleChainChange(setState)
			})
		}
	}, [])

	return(
		<div>
			<Web3Context.Provider value = {state}>
				{children}
			</Web3Context.Provider>
			{isLoading && (
				<p>Loading....</p>
			)}
			<Button onClick = {handleWallet} label = "Connect Wallet"/>
		</div>
	);
}

export default Wallet;