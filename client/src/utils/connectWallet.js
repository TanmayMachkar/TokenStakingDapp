import { ethers, Contract } from 'ethers';
import stakingAbi from '../ABI/stakingAbi.json';
import stakeTokenAbi from '../ABI/stakeTokenAbi.json';

export const connectWallet = async() => {
	try{
		let [
			provider, 
			stakingContract, 
			stateTokenContract, 
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
	
		const stakingContractAddress = "0x55c646dfbe2fe7a7de5525cfcf7e2456df7a9c29";
		const stakeTokenContractAddress = "0xf9122572e937584b1871ece3fea2c9e522556f6c";
	
		stakingContract = new Contract(stakingContractAddress, stakingAbi, signer); //same as ethers.Contract
		stateTokenContract = new Contract(stakeTokenContractAddress, stakeTokenAbi, signer); //same as ethers.Contract
	
		return ({
			provider, 
			account, 
			stakingContract, 
			stateTokenContract, 
			chainId
		})
	} catch(error) {
		console.error(error);
		throw error;
	}
}