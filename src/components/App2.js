import React, { Component } from "react";

import TronWeb from 'tronweb';
import Utils from 'utils';
import Home from './Home.js';
import Top from "./TopPage2";
import { Route, BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingPage from "./LoadingPage";
import Timer from "./Timer";
import Footer from "./Footer";
import TronLinkGuide from "./TronLinkGuide";

const FOUNDATION_ADDRESS = 'TLDyEBBQAexL3vJPP4XSnHXQVr5BE5t7Wc';
const OWNER = 'TVDRiydzogJYQZwFcaUuLRh9LntAk2HoxB';

let refLinkAddress;
const Child = ({ match }) => (refLinkAddress = match.params.id);

class App extends React.Component {



    async componentDidMount() {

        await this.connectTronWeb();
        await this.loadBlockChainData();

    }

    connectTronWeb = async () => {
        await new Promise(resolve => {
            const tronWebState = {
                installed: window.tronWeb,
                loggedIn: window.tronWeb && window.tronWeb.ready
            };

            if (tronWebState.installed) {
                this.setState({
                    tronWeb:
                        tronWebState
                });

                return resolve();
            }

            let tries = 0;

            const timer = setInterval(() => {
                if (tries >= 10) {
                    const TRONGRID_API = 'https://api.trongrid.io';

                    window.tronWeb = new TronWeb(
                        TRONGRID_API,
                        TRONGRID_API,
                        TRONGRID_API
                    );

                    this.setState({
                        tronWeb: {
                            installed: false,
                            loggedIn: false
                        }
                    });

                    clearInterval(timer);
                    return resolve();
                }

                tronWebState.installed = !!window.tronWeb;
                tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;

                if (!tronWebState.installed)
                    return tries++;

                this.setState({
                    tronWeb: tronWebState
                });

                resolve();
            }, 100);
        });

        if (!this.state.tronWeb.loggedIn) {
            // Set default address (foundation address) used for contract calls
            // Directly overwrites the address object as TronLink disabled the
            // function call
            window.tronWeb.defaultAddress = {
                hex: window.tronWeb.address.toHex(FOUNDATION_ADDRESS),
                base58: FOUNDATION_ADDRESS
            };

            window.tronWeb.on('addressChanged', () => {
                if (this.state.tronWeb.loggedIn)
                    window.location.reload();
                return;

                this.setState({
                    tronWeb: {
                        installed: true,
                        loggedIn: true
                    }
                });
            });
        }

        await Utils.setTronWeb(window.tronWeb);

        // this.startEventListener();
        //   this.fetchMessages();

    }


    loadBlockChainData = async () => {
        //  this.setState({ loading: false });
        const sunny = 1000000;

        const balTemp = await Utils.tronWeb.trx.getBalance(accTemp);
        const ballTemp = balTemp / sunny;
        this.setState({ balance: ballTemp });

        const accTemp = await Utils.tronWeb.defaultAddress.base58;
        this.setState({ account: accTemp });

        const contractBalance = await Utils.tronWeb.trx.getBalance(FOUNDATION_ADDRESS);
        this.setState({ contractBalance: contractBalance / sunny });

        const totalMembers = await Utils.contract.totalMembers().call();
        this.setState({ totalMembers: parseInt(totalMembers.toString()) });



        const sitetotalInvestments = await Utils.contract.totalInvestments().call();
        this.setState({ sitetotalInvestments: parseInt(sitetotalInvestments.toString()) / sunny - 10000 });

        const depositid = await Utils.contract.depositid().call();
        this.setState({ depositid: parseInt(depositid.toString()) });

        const ultraCount = await Utils.contract.ultraCount().call();
        this.setState({ ultraCount: parseInt(ultraCount.toString()) });

        // Club Stats
        const club1MembersCount = await Utils.contract.club1MembersCount().call();
        this.setState({ club1MembersCount: parseInt(club1MembersCount.toString()) });

        const club2MembersCount = await Utils.contract.club2MembersCount().call();
        this.setState({ club2MembersCount: parseInt(club2MembersCount.toString()) });


        const club1Reserve = await Utils.contract.club1Reserve().call();
        this.setState({ club1Reserve: parseInt(club1Reserve.toString()) / sunny });

        const club2Reserve = await Utils.contract.club2Reserve().call();
        this.setState({ club2Reserve: parseInt(club2Reserve.toString()) / sunny });

        if (this.state.club1MembersCount > 0) {

            const club1share = 0.5 * this.state.club1Reserve / this.state.club1MembersCount;
            this.setState({ club1share });

        } else {
            this.setState({ club1share: 0 });
        }

        if (this.state.club2MembersCount > 0) {

            const club2share = 0.5 * this.state.club2Reserve / this.state.club2MembersCount;
            this.setState({ club2share });

        } else {
            this.setState({ club2share: 0 });
        }




        const globalPaid = await Utils.contract.globalPaid().call();
        this.setState({ globalPaid: parseInt(globalPaid.toString()) / sunny });

        const minDepositSize = await Utils.contract.minDepositSize().call();
        this.setState({ minDepositSize: parseInt(minDepositSize.toString()) / sunny });

        const maxDepositSize = await Utils.contract.maxDepositSize().call();
        this.setState({ maxDepositSize: parseInt(maxDepositSize.toString()) / sunny });

        const totalid = await Utils.contract.id().call();
        this.setState({ totalid: parseInt(totalid.toString()) });

        let currentuser = await Utils.contract.members(this.state.account).call();

        let totalInvested = currentuser.totalInvested;
        this.setState({ totalInvested: parseInt(totalInvested.toString()) / sunny });

        let isUltra = currentuser.isUltra;
        this.setState({ isUltra: parseInt(isUltra.toString()) });

        let userid = currentuser.id;
        this.setState({ userid: parseInt(userid.toString()) });

        let maxRec = currentuser.maxRec;
        this.setState({ maxRec: parseInt(maxRec.toString()) / sunny });

        let totalPaid = currentuser.totalPaid;
        this.setState({ totalPaid: parseInt(totalPaid.toString()) / sunny });

        let avlBalance = currentuser.avlBalance;
        if (avlBalance < 0) {
            avlBalance = 0;
        }
        this.setState({ avlBalance: parseInt(avlBalance.toString()) / sunny });
        if (this.state.avlBalance < 0) {
            this.setState({ avlBalance: 0 });
        }

        let lastDepositTime = currentuser.time;
        this.setState({ lastDepositTime: parseInt(lastDepositTime.toString()) });

        let presenttime = await Utils.contract.getNow().call();
        this.setState({ presenttime: parseInt(presenttime.toString()) });

        let totalRewards = currentuser.totalRewards;
        this.setState({ totalRewards: parseInt(totalRewards.toString()) / sunny });


        let totalBiz = currentuser.totalBiz;
        this.setState({ totalBiz: parseInt(totalBiz.toString()) / sunny });

        let level1Count = currentuser.level1Count;
        this.setState({ level1Count: parseInt(level1Count.toString()) });

        let depositCount = currentuser.depositCount;
        this.setState({ depositCount: parseInt(depositCount.toString()) });

        let isActive = currentuser.isActive;
        this.setState({ isActive: parseInt(isActive.toString()) });

        let lastDeposit = currentuser.lastDeposit;
        this.setState({ lastDeposit: parseInt(lastDeposit.toString()) / sunny });

        let big1 = await Utils.contract.bigPlayers(1).call();
        console.log('Big player ' + big1.player);
        this.setState({ bigPlayer: window.tronWeb.address.fromHex(big1.player) });
        this.setState({ bigLeader: window.tronWeb.address.fromHex(big1.introducer) });
        this.setState({
            bigAmount: parseInt(big1.deposit.toString()) / sunny
        });
        this.setState({ bigTime: parseInt(big1.time.toString()) });

        let rewards = await Utils.contract.members2(this.state.account).call();

        let levelRewards = rewards.levelRewards;
        this.setState({ levelRewards: parseInt(levelRewards.toString() / sunny) });

        let roiRewards = rewards.roiRewards;
        this.setState({ roiRewards: parseInt(roiRewards.toString() / sunny) });


        let GenerationRewards = rewards.GenerationRewards;
        this.setState({ GenerationRewards: parseInt(GenerationRewards.toString() / sunny) });

        let clubRewards = rewards.clubRewards;
        this.setState({ clubRewards: parseInt(clubRewards.toString() / sunny) });

        let ultraRewards = rewards.ultraRewards;
        this.setState({ ultraRewards: parseInt(ultraRewards.toString() / sunny) });

        let bigPlayerRewards = rewards.bigPlayerRewards;
        this.setState({ bigPlayerRewards: parseInt(bigPlayerRewards.toString() / sunny) });

        let bigLeaderRewards = rewards.bigLeaderRewards;
        this.setState({ bigLeaderRewards: parseInt(bigLeaderRewards.toString() / sunny) });

        let level1Biz = rewards.level1Biz;
        this.setState({ level1Biz: parseInt(level1Biz.toString() / sunny) });
        let roiClaim = rewards.roiClaim;
        this.setState({ roiClaim: parseInt(roiClaim.toString() / sunny) });

        let isClub1 = rewards.isClub1;
        this.setState({ isClub1: parseInt(isClub1.toString()) });

        let isClub2 = rewards.isClub2;
        this.setState({ isClub2: parseInt(isClub2.toString()) });

        let clubPaidTime = rewards.clubPaidTime;
        this.setState({ clubPaidTime: parseInt(clubPaidTime.toString()) });


        let refuser = await Utils.contract.teams(this.state.account).call();

        let ref1sum = refuser.ref1sum;
        this.setState({ ref1sum: parseInt(ref1sum.toString()) });

        let ref2sum = refuser.ref2sum;
        this.setState({ ref2sum: parseInt(ref2sum.toString()) });

        let ref3sum = refuser.ref3sum;
        this.setState({ ref3sum: parseInt(ref3sum.toString()) });

        let ref4sum = refuser.ref4sum;
        this.setState({ ref4sum: parseInt(ref4sum.toString()) });

        let ref5sum = refuser.ref5sum;
        this.setState({ ref5sum: parseInt(ref5sum.toString()) });

        let ref6sum = refuser.ref6sum;
        this.setState({ ref6sum: parseInt(ref6sum.toString()) });

        let ref7sum = refuser.ref7sum;
        this.setState({ ref7sum: parseInt(ref7sum.toString()) });

        let ref8sum = refuser.ref8sum;
        this.setState({ ref8sum: parseInt(ref8sum.toString()) });

        let ref9sum = refuser.ref9sum;
        this.setState({ ref9sum: parseInt(ref9sum.toString()) });

        let ref10sum = refuser.ref10sum;
        this.setState({ ref10sum: parseInt(ref10sum.toString()) });

        let timediff = 0;
        timediff = this.state.presenttime - this.state.time;
        this.setState({ timediff });

        for (var u = 1; u <= this.state.ultraCount; u++) {
            var ultrauser = await Utils.contract.ultraUsers(u).call();
            const addressBase58 = window.tronWeb.address.fromHex(ultrauser.memberAddress);
            console.log('Ultra ' + addressBase58);

            this.setState({ ultraUsers: [...this.state.ultraUsers, ultrauser] });
        }

        var refid;

        if (!window.tronWeb.isAddress(refLinkAddress)) {
            refid = OWNER;
        } else {
            refid = await Utils.contract.members(refLinkAddress).call();
        }

        if (refid.depositCount > 0) {
            refid = refLinkAddress;
        } else {
            refid = OWNER;
        }

        this.setState({ refid });
        console.log(this.state.refid);


        let roi = 0;

        for (var d = 1; d <= this.state.depositid; d++) {
            var deposit = await Utils.contract.deposits(d).call();
            this.setState({ deposits: [...this.state.deposits, deposit] });

            const addressInBase58 = window.tronWeb.address.fromHex(deposit.memberAddress);
            // const addr = "41ada414f57f5830bc0ec67503e5b8e04394133453";
            // const newAddress = window.tronWeb.address.fromHex(addr);
            // console.log(newAddress);



            if (addressInBase58 === this.state.account) {

                let mydepositValue = parseInt(deposit.depositValue.toString()) / sunny;
                let mytime = parseInt(deposit.time.toString());
                let diff = this.state.presenttime - mytime;
                this.setState({ diffInSec: diff });
                let diffInMin = Math.floor(diff / 60);
                let diffInHour = Math.floor(diffInMin / 60);
                let diffInDay = Math.floor(diffInHour / 24); // 2 days

                let mycumDeposit = mydepositValue;
                let profit;

                // if (diffInHour > 100) {
                //   diffInHour = 100;
                // }

                diffInDay = Math.round(diffInDay, 0);

                if (diffInDay > 100) {
                    diffInDay = 100;
                }

                this.setState({ diffInDay });
                for (var p = 1; p <= this.state.diffInDay; p++) {
                    profit = mycumDeposit * 3 / 100;
                    mycumDeposit = mycumDeposit + profit * 0.6;
                    roi = roi + profit * 0.4;
                }
            }
        }
        this.setState({ roi: Math.floor(roi) });


        var depCount = 0;
        for (var i = 1; i <= this.state.depositid; i++) {

            const deposit_tmp = await Utils.contract.deposits(i).call();
            console.log('deposit s', deposit_tmp);

            const addressInBase581 = window.tronWeb.address.fromHex(deposit.memberAddress);

            if (addressInBase581 === this.state.account) {
                depCount++;
                const deposits2 = [...this.state.deposits];

                deposits2.push({
                    id: depCount,
                    depositid: deposit_tmp.id,
                    time: parseInt(deposit_tmp.time.toString()),
                    depositValue: parseInt(deposit_tmp.depositValue.toString()) / sunny
                });

                this.setState({ deposits2 })
                console.log(this.state.deposits2)
            }
        }

        let avlBal;
        var totalRec = this.state.roi + this.state.totalRewards - this.state.totalPaid;

        if (this.state.maxRec < totalRec) {
            avlBal = this.state.maxRec - this.state.totalPaid;
            this.setState({ avlBal });

        } else {
            this.setState({ avlBal: totalRec });

        }
        //  console.log(this.state.refLinkAddress);

        this.setState({ loading: false });
    }


    invest(refid, amount) {

        return Utils.contract
            .invest(refid)
            .send({
                from: this.state.account,
                callValue: Number(amount) * 1000000,
            }).then(res => toast.success(amount + ' TRX Deposit processing', { position: toast.POSITION.TOP_RIGHT, autoClose: 10000 })

            );

    }

    reinvest(amount) {

        return Utils.contract
            .reinvest()
            .send({
                from: this.state.account,
                callValue: Number(amount) * 1000000,
            }).then(res => toast.success(amount + ' TRX Deposit processing', { position: toast.POSITION.TOP_RIGHT, autoClose: 10000 }))
    }

    withdraw(amount) {
        return Utils.contract
            .withdraw()
            .send({
                from: this.state.account,
            }).then(res => toast.success(amount + ' TRX Withdrawal processing', { position: toast.POSITION.TOP_RIGHT, autoClose: 10000 }
            ))
    }

    withdrawClub() {
        return Utils.contract
            .withdrawClub()
            .send({
                from: this.state.account,
            }).then(res => toast.success(' Club share Withdrawal is processing', { position: toast.POSITION.TOP_RIGHT, autoClose: 10000 }
            ))
    }


    collect(address) {
        return Utils.contract
            .collect(address)
            .send({
                from: this.state.account,
            }).then(res =>
                toast.success(' Balance updated', { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 10000 })
            );
    }

    constructor(props) {
        super(props)

        this.state = {

            loading: true,

            account: '',
            totalMembers: 0,
            balance: 0,
            refFlag: 0,
            totalInvested: 0,
            depositid: 0,
            deposits: [],
            ultraUsers: [],
            mainUsers: [],
            deposits2: [],
            refLnkAddress: '',

            lastDepositTime: 0,
            depositCount: 0,

            tronWeb: {
                installed: false,
                loggedIn: false
            },
        }
        this.invest = this.invest.bind(this);
        this.reinvest = this.reinvest.bind(this);
        this.withdraw = this.withdraw.bind(this);
        this.collect = this.collect.bind(this);
        this.withdrawClub = this.withdrawClub.bind(this);
    }


    render() {
        // if (!this.state.tronWeb.installed) {
        //   return <TronLinkGuide />;

        // }

        return (
            <div>

                {this.state.loading ?
                    <LoadingPage /> :
                    <div>
                        <BrowserRouter>
                            {this.state.depositCount > 0
                                ? <Route path='/' />
                                : <Route path='/ref/:id' component={Child} />
                            }
                        </BrowserRouter>
                        <Top
                            account={this.state.account}
                            contractBalance={this.state.contractBalance}
                            club={this.state.club}
                            balance={this.state.balance}
                            avlBalance={this.state.avlBal}
                            depositCount={this.state.depositCount}
                            minDepositSize={this.state.minDepositSize}
                            maxDepositSize={this.state.maxDepositSize}
                            lastDeposit={this.state.lastDeposit}
                            roiClaim={this.state.roiClaim}

                            refid={this.state.refid}
                            isClub1={this.state.isClub1}
                            isClub2={this.state.isClub2}
                            clubShare={this.state.clubShare}
                            clubPaidTime={this.state.clubPaidTime}
                            nextClubTime={this.state.nextClubTime}
                            club1MembersCount={this.state.club1MembersCount}
                            club2MembersCount={this.state.club2MembersCount}
                            ref1sum={this.state.ref1sum}
                            ref2sum={this.state.ref2sum}
                            ref3sum={this.state.ref3sum}
                            ref4sum={this.state.ref4sum}
                            ref5sum={this.state.ref5sum}
                            ref6sum={this.state.ref6sum}
                            ref7sum={this.state.ref7sum}
                            ref8sum={this.state.ref8sum}
                            ref9sum={this.state.ref9sum}
                            ref10sum={this.state.ref10sum}
                            realBalance={this.state.avlBalance}
                            sitetotalInvestments={this.state.sitetotalInvestments}
                            totalPaid={this.state.totalPaid}
                            globalPaid={this.state.globalPaid}
                            depositid={this.state.depositid}
                            totalRefRewards={this.state.totalRefRewards}
                            totalMembers={this.state.totalMembers}
                            lastDepositTime={this.state.lastDepositTime}
                            totalRewards={this.state.totalRewards}
                            GenerationRewards={this.state.GenerationRewards}
                            clubRewards={this.state.clubRewards}
                            ultraRewards={this.state.ultraRewards}
                            levelRewards={this.state.levelRewards}
                            totalInvested={this.state.totalInvested}
                            club1Reserve={this.state.club1Reserve}
                            club2Reserve={this.state.club2Reserve}
                            club1share={this.state.club1share}
                            club2share={this.state.club2share}
                            level1Count={this.state.level1Count}
                            level1Biz={this.state.level1Biz}
                            roi={this.state.roi}
                            totalBiz={this.state.totalBiz}
                            bigPlayer={this.state.bigPlayer}
                            presenttime={this.state.presenttime}
                            bigLeader={this.state.bigLeader}
                            bigPlayerRewards={this.state.bigPlayerRewards}
                            bigLeaderRewards={this.state.bigLeaderRewards}
                            bigAmount={this.state.bigAmount}

                            invest={this.invest}
                            reinvest={this.reinvest}
                            withdraw={this.withdraw}
                            withdrawClub={this.withdrawClub}
                            collect={this.collect}
                            diffInDay={this.state.diffInDay}
                        />
                        <Footer />

                    </div>
                }

            </div>
        );
    }
}

export default App;
