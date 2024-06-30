import { useState, useEffect } from 'react';
import { connectWallet } from '../../utils/connectWallet';
import Web3Context from '../../context/Web3Context';
import Button from '../Button/Button';
import { handleAccountChange } from '../../utils/handleAccountChange';
import { handleChainChange } from '../../utils/handleChainChange';
import { toast } from "react-hot-toast";
import "./Wallet.css";

const Wallet = ({children}) => {
	const [state, setState] = useState({
		provider: null,
		account: null,
		stakingContract: null,
		stakeTokenContract: null,
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
				stakeTokenContract, 
				chainId 
			} = await connectWallet();
			// console.log(
			// 	"Provider: ",provider, 
			// 	"Account: ",account, 
			// 	"stakingContract: ",stakingContract, 
			// 	"stakeTokenContract: ",stakeTokenContract, 
			// 	"chainId: ",chainId
			// );
			setState({
				provider, 
				account, 
				stakingContract, 
				stakeTokenContract, 
				chainId
			});
		} catch(error) {
			toast.error('Error connecting wallet');
			console.log(error.message);
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
		<div className="Connect-Wallet">
		    <Web3Context.Provider value={state}>
		    	{children}
		    </Web3Context.Provider>
		    {isLoading && <p>Loading...</p>}
		    <div className = 'CW'>
		    	<Button onClick={handleWallet} type="button" label="Connect Wallet" />
			</div>
		</div>
	);
}

export default Wallet;