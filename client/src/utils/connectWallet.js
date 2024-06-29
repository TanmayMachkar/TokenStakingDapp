import { ethers, Contract } from 'ethers';
import stakingAbi from '../ABI/stakingAbi.json';
import stakeTokenAbi from '../ABI/stakeTokenAbi.json';

export const connectWallet = async() => {
	try{
		let [
			provider, 
			stakingContract, 
			stakeTokenContract, 
			chainId
		] = [null];
		//check if metmask installed or not
		if(window.ethereum === null){
			throw new Error("METAMASK NOT INSTALLED");
		}

		//if metamask is installed then fetch the accounts from metamask
		const accounts = await window.ethereum.request({
			method: 'eth_requestAccounts'
		})

		//chainId will be in hex form
		let chainIdHex = await window.ethereum.request({
			method: 'eth_chainId'
		})
		chainId = parseInt(chainIdHex, 16); //convert from hex(16 is base) to int
	
		let account = accounts[0];

		if(!account){
			throw new Error('No ethereum accounts available');
		}

		//metamask will be used to connect our computer(node) to blockchains
		provider = new ethers.BrowserProvider(window.ethereum); 
		const signer = await provider.getSigner(); //get acc details, addresses of accounts etc
	
		const stakingContractAddress = "0x44d6Cc9262DCa24312bd3Cecfa51D3De7f871C3D";
		const stakeTokenContractAddress = "0xF8138C7130a7E377CA6AD1bBfAd80504410cF877";
	
		stakingContract = new Contract(stakingContractAddress, stakingAbi, signer); //same as ethers.Contract
		stakeTokenContract = new Contract(stakeTokenContractAddress, stakeTokenAbi, signer); //same as ethers.Contract
	
		return ({
			provider, 
			account, 
			stakingContract, 
			stakeTokenContract, 
			chainId
		})
	} catch(error) {
		console.error(error);
		throw error;
	}
}