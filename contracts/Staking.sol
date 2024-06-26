//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Staking is ReentrancyGuard{
    IERC20 public s_stakingToken;
    IERC20 public s_rewardToken;

    uint public constant REWARD_RATE = 10;
    uint private totalStakedTokens;
    uint public rewardPerTokenStored;
    uint public lastUpdateTime;

    mapping(address => uint) public stakedBalance;
    mapping(address => uint) public rewards;
    mapping(address => uint) public userRewardPerTokenPaid;

    event Staked(address indexed user, uint256 indexed amount);
    event Withdrawn(address indexed user, uint256 indexed amount);
    event RewardsClaimed(address indexed user, uint256 indexed amount);

    constructor(address stakingToken, address rewardToken){
        s_stakingToken = IERC20(stakingToken);
        s_rewardToken = IERC20(rewardToken);
    }

    function rewardPerToken() public view returns(uint) {
        if(totalStakedTokens == 0){
            return rewardPerTokenStored;
        }
        uint totalTime = block.timestamp - lastUpdateTime; //if last update staked token of user was at 0th sec and he staked some tokens again at 3rd sec then total time = 3-0 = 3
        uint totalRewards = REWARD_RATE*totalTime; //get total rewards
        //rewardperTokenStored is previous value
        return rewardPerTokenStored + totalRewards/totalStakedTokens; //part of formula reward rate / total staked amount (check formula)
    }
}