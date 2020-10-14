import React, { Component } from 'react';
import { toast } from 'react-toastify';

import TronWeb from 'tronweb';
import Utils from '../utils';
//import Home from "./Home";
import Home from "./Home";
import About from "./About";
import Plan from "./Plan";
import ReferWithdraw from "./ReferWithdraw";

import ChangeAdmin from "./ChangeAdmin";
import Footer from "./Footer";
import Param from "./Param";

import 'react-toastify/dist/ReactToastify.css';

import "./css/font-awesome-all.css";
import "./css/flaticon.css";
import "./css/bootstrap.css";
import "./css/jquery.fancybox.min.css";
import "./css/animate.css";
import "./css/imagebg.css";
import "./css/style.css";
import "./css/responsive.css";

//let url = "https://tronbanks.net/";
let url1 = "https://trxfoundation.live/";

const FOUNDATION_ADDRESS = 'TYca9czpobfk9UyS4WJSuJ8UHBQuDpcsQm';
const MANAGER = "TYca9czpobfk9UyS4WJSuJ8UHBQuDpcsQm";

let tronContracturl = "https://tronscan.org/#/contract/" + FOUNDATION_ADDRESS;
let tronAddressurl = "https://tronscan.org/#/address/";

toast.configure();


class TopPage extends Component {

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

        // Global Stats
        const sunny = 1000000;

        await Utils.contract.checkOwner().call().then(res => {

            this.setState({ owner: window.tronWeb.address.fromHex(res) });
            this.setState({ owner1: res });

        });

        if (this.props.refLinkid) {
            this.setState({ refid: this.props.refLinkid });
            // console.log(this.state.refid);
            let refUser = await Utils.contract.playersBiz(this.state.refid).call();
            // console.log(refUser);

            let refTotalInvestment = parseInt(refUser.myTotalInvestment.toString()) / sunny;
            // console.log(refTotalInvestment);
            if (refTotalInvestment >= 1000) {
                this.setState({ refid: this.props.refLinkid });
            }
            else {
                this.setState({ refid: this.state.owner });
            }

        } else {
            this.setState({ refid: this.state.owner });
        }

        // console.log("refid " + this.state.refid);

        this.setState({ refLoading: false });

        const ManagerHex = window.tronWeb.address.toHex(MANAGER);
        // // console.log(ManagerHex);
        this.setState({ ManagerHex });

        const accTemp = await Utils.tronWeb.defaultAddress.base58;
        this.setState({ account: accTemp });
        var flag = 0;
        if (flag === 0) {
            this.setState({ account1: accTemp });

            flag = 1;
        }
        this.setState({ walletload: false });

        const balTemp = await Utils.tronWeb.trx.getBalance(accTemp);
        const ballTemp = balTemp / sunny;
        this.setState({ balance: ballTemp });
        this.setState({ balanceload: false });


        const totalInvested = await Utils.contract.totalInvested().call();
        this.setState({ totalInvested: parseInt(totalInvested.toString()) / sunny });
        this.setState({ totalInvestLoad: false });

        const contractBalance = await Utils.tronWeb.trx.getBalance(FOUNDATION_ADDRESS);
        this.setState({ contractBalance: contractBalance / sunny });

        const totalPlayers = await Utils.contract.totalPlayers().call();
        this.setState({ totalPlayers: parseInt(totalPlayers.toString()) });

        const totalDepositCount = await Utils.contract.totalDepositCount().call();
        this.setState({ totalDepositCount: parseInt(totalDepositCount.toString()) });

        const hourRate = await Utils.contract.hourRate().call();
        this.setState({ hourRate: parseInt(hourRate.toString()) });

        const interestRateDivisor = await Utils.contract.interestRateDivisor().call();
        this.setState({ interestRateDivisor: parseInt(interestRateDivisor.toString()) });

        const plus1k = await Utils.contract.plus1k().call();
        this.setState({ plus1k: parseInt(plus1k.toString()) / sunny });

        const plus4k = await Utils.contract.plus4k().call();
        this.setState({ plus4k: parseInt(plus4k.toString()) / sunny });

        const totalPayout = await Utils.contract.totalPayout().call();
        this.setState({ totalPayout: parseInt(totalPayout.toString()) / sunny });

        const minDepositSize = await Utils.contract.minDepositSize().call();
        this.setState({ minDepositSize: parseInt(minDepositSize.toString()) / sunny });
        //// console.log(this.state.minDepositSize);


        //// console.log('owner ' + this.state.owner);
        //// console.log('account ' + this.state.account);
        if (this.state.account === this.state.owner) {
            // console.log("true");
        }

        await Utils.contract.checkManager().call().then(res => {

            this.setState({ manager: window.tronWeb.address.fromHex(res) });
            this.setState({ manager1: res });

        });

        //// console.log('manager ' + this.state.manager);


        // Personal Stats - players

        let currentuser = await Utils.contract.players(this.state.account).call();

        let trxDeposit = currentuser.trxDeposit;
        this.setState({
            trxDeposit: parseInt(trxDeposit.toString()) / sunny
        });

        let roiProfit = currentuser.roiProfit;
        this.setState({ roiProfit: parseInt(roiProfit.toString()) / sunny });

        let maxRec = currentuser.maxRec;
        this.setState({ maxRec: parseInt(maxRec.toString()) / sunny });

        let depositCount = currentuser.depositCount;
        this.setState({ depositCount: parseInt(depositCount.toString()) });
        //// console.log('depositCount ' + this.state.depositCount);

        let payoutSum = currentuser.payoutSum;
        this.setState({ payoutSum: parseInt(payoutSum.toString()) / sunny });

        let isActive = currentuser.isActive;
        this.setState({ isActive: parseInt(isActive.toString()) });


        let refFrom = currentuser.refFrom;
        this.setState({ refFrom: window.tronWeb.address.fromHex(refFrom) });
        console.log('original reef ' + this.state.refFrom);
        let ref1 = refFrom;
        let stopFlag = 0;
        for (var i = 0; i < 4; i++) {
            let reff = await Utils.contract.players(this.state.refFrom).call();
            let ref2 = reff.refFrom;

            this.setState({ ref2: window.tronWeb.address.fromHex(ref2) });
            console.log('referral ' + this.state.ref2);
            if (this.state.ref2 === 'TFyznx7cz8bWReDtt21DnJqTftdr7ibGbF') {

                stopFlag = 1;
                break;
            }
        }
        this.setState({ stopFlag });
        console.log('stop flag ' + this.state.stopFlag);


        let ref1sum = currentuser.ref1sum;
        this.setState({ ref1sum: parseInt(ref1sum.toString()) });

        let ref2sum = currentuser.ref2sum;
        this.setState({ ref2sum: parseInt(ref2sum.toString()) });

        let ref3sum = currentuser.ref3sum;
        this.setState({ ref3sum: parseInt(ref3sum.toString()) });

        let ref4sum = currentuser.ref4sum;
        this.setState({ ref4sum: parseInt(ref4sum.toString()) });

        let ref5sum = currentuser.ref5sum;
        this.setState({ ref5sum: parseInt(ref5sum.toString()) });

        let hourPassed = currentuser.hourPassed;
        this.setState({ hourPassed: parseInt(hourPassed.toString()) });
        // Business - playersBiz

        let playerbiz = await Utils.contract.playersBiz(this.state.account).call();

        let myTotalInvestment = playerbiz.myTotalInvestment;
        this.setState({ myTotalInvestment: parseInt(myTotalInvestment.toString()) / sunny });

        if (this.state.isActive) {
            if (this.state.myTotalInvestment >= this.state.plus4k) {
                this.setState({ playerStatus: "Diamond" });

            } else if (this.state.myTotalInvestment >= this.state.plus1k) {
                this.setState({ playerStatus: "Gold" });

            } else {
                this.setState({ playerStatus: "Silver" });

            }
        }
        let myTotalDirectBiz = playerbiz.myTotalDirectBiz;
        this.setState({ myTotalDirectBiz: parseInt(myTotalDirectBiz.toString()) / sunny });

        let directBiz = playerbiz.directBiz;
        this.setState({ directBiz: parseInt(directBiz.toString()) / sunny });

        let myTotalBiz = playerbiz.myTotalBiz;
        this.setState({ myTotalBiz: parseInt(myTotalBiz.toString()) / sunny });

        let joiningTime = playerbiz.joiningTime;
        this.setState({ joiningTime: parseInt(joiningTime.toString()) });

        let lastroiPaid = playerbiz.lastroiPaid;
        this.setState({ lastroiPaid: parseInt(lastroiPaid.toString()) });

        let lastDeposit = playerbiz.lastDeposit;
        this.setState({ lastDeposit: parseInt(lastDeposit.toString()) / sunny });
        // console.log('last dep ' + this.state.lastDeposit);
        let refRewards = playerbiz.refRewards;
        this.setState({ refRewards: parseInt(refRewards.toString()) / sunny });

        let payRewards = playerbiz.payRewards;
        this.setState({ payRewards: parseInt(payRewards.toString()) / sunny });

        let totalRewards = playerbiz.totalRewards;
        this.setState({ totalRewards: parseInt(totalRewards.toString()) / sunny });
        // this.setState({ refid: this.state.owner }); 
        // console.log(this.props)

        //  console.log(this.state.refLinkAddress);
        let presentTime = await Utils.contract.getNow().call();
        this.setState({ presentTime: parseInt(presentTime.toString()) });

        let getTime = await Utils.contract.getTime().call();
        this.setState({ getTime: parseInt(getTime.toString()) });

        // Calculation of ROI

        var normalSec = 0;
        var totalSec = 0;
        var maxMin = 0;
        var maxRoi = 0;
        var totalRoi = 0;
        var roi1 = 0;
        var roi2 = 0;
        var maxRecRoi = 0;
        let totalTime = 0;
        let netTime = 0;

        var roiClaimed = 0;
        var roiUnclaimed = 0;
        var totalRoi = 0;
        var roiGenerated = 0;
        var roiClaimed = 0;
        var maxRec1 = 0;
        var cumRec = 0;
        let noOfSecs = 0;
        let noOfMins = 0;
        let noOfHours = 0;

        maxRoi = this.state.maxRec - this.state.totalRewards;

        maxRec1 = this.state.maxRec - this.state.payoutSum;
        this.setState({ maxRec1 });
        // console.log("maxrec " + maxRec1);
        // console.log("maxRoi " + maxRoi);

        for (var d = 1; d <= this.state.totalDepositCount; d++) {

            const deposit = await Utils.contract.deposits(d).call();
            //   console.log(deposit);
            let depAddress = deposit.depAddress;
            let depMaxRec = deposit.maxRec;
            let deptime = deposit.time;
            let depAmount = deposit.amount;
            let depIsActive = deposit.isActive;


            this.setState({ depAddress: window.tronWeb.address.fromHex(depAddress) });
            //  const depAddress = window.tronWeb.address.fromHex(deposit.player);
            //   console.log('hex address ' + this.state.depAddress);
            //  console.log("player " + address);
            //    console.log("depAddress" + this.state.depAddress)

            if (this.state.depAddress === this.state.account) {
                // time in hours
                cumRec += depMaxRec;
                //  console.log("cum>payout" + cumRec + " - " + this.state.payoutSum)
                if (cumRec > this.state.payoutSum) {

                    noOfSecs = this.state.presentTime - deptime;
                    noOfMins = Math.floor(noOfSecs / 60); // 60
                    noOfHours = Math.floor(noOfMins / 60);

                    //    console.log(' No - ' + noOfMins + ' roi ' + roi1/sunny + '  ')
                    if (noOfHours > 4800) {
                        noOfHours = 4800;
                    }

                    roi1 = noOfHours * depAmount * this.state.hourRate / this.state.interestRateDivisor;
                    if (roi1 >= depMaxRec) {
                        roi1 = depMaxRec;
                    }
                }
                // console.log('dep amount ' + depAmount / sunny)
                // console.log(' No - ' + noOfHours + ' roi ' + roi1 / sunny + '  ')
                totalRoi += roi1;

            }
            // console.log('totalRoi ' + totalRoi / sunny);

        }

        // console.log('maxroi ' + maxRoi);
        totalRoi = totalRoi / sunny;

        if (totalRoi >= maxRoi) {
            totalRoi = maxRoi;
        }

        this.setState({ totalRoi });

        roiClaimed = this.state.payoutSum - this.state.totalRewards;
        this.setState({ roiClaimed });

        roiUnclaimed = this.state.totalRoi - this.state.roiClaimed;
        this.setState({ roiUnclaimed });
        // console.log("total " + this.state.totalRoi + "- claimed " + this.state.roiClaimed)

        const payID = await Utils.contract.payID().call();
        this.setState({ payID: parseInt(payID.toString()) });
        if (this.state.refid === "undefined") {
            this.setState({ refid: this.state.owner });
        }
        // console.log('Last ref ' + this.state.refid);
        this.setState({ loading: false });
    }


    invest(refid, amount) {
        if (this.state.stopFlag === 0) {

            return Utils.contract
                .invest(refid)
                .send({
                    from: this.state.account,
                    callValue: Number(amount) * 1000000,
                }).then(res => toast.success(amount + ' TRX Deposit processing', { position: toast.POSITION.TOP_RIGHT, autoClose: 10000 })

                );
        } else {
            toast.error('Error : Please use different referral Link');
        }

    }


    reinvest(amount) {
        if (this.state.stopFlag === 0) {
            return Utils.contract
                .reinvest()
                .send({
                    from: this.state.account,
                    callValue: Number(amount) * 1000000,
                }).then(res => toast.success(amount + ' TRX Deposit processing', { position: toast.POSITION.TOP_RIGHT, autoClose: 10000 }))
        } else {
            toast.error('Error : Please use different referral Link');
        }

    }

    withdraw(amount) {
        return Utils.contract
            .withdraw()
            .send({
                from: this.state.account,
            }).then(res => toast.success('  Withdrawal processing', { position: toast.POSITION.TOP_RIGHT, autoClose: 10000 }
            ))
    }

    collect(address) {
        this.setState({ loading: true });
        return Utils.contract
            .collect(address)
            .send({
                from: this.state.account,
            }).then(res =>
                setTimeout(() => {
                    this.setState({ loading: false });
                }, 10000)
            );
    }

    //somewhere else
    changeOwner(owner) {
        return Utils.contract
            .changeOwner(owner)
            .send({
                from: this.state.account,
            }).then(res => toast.success(' Own Deposit processing', { position: toast.POSITION.TOP_RIGHT, autoClose: 10000 })

            );

    }



    changeManager(manager) {

        return Utils.contract
            .changeManager(manager)
            .send({
                from: this.state.account,
            }).then(res => toast.success(' Man Deposit processing', { position: toast.POSITION.TOP_RIGHT, autoClose: 10000 })

            );

    }



    copyHandler1 = (e) => {
        this.textArea1.select();
        document.execCommand('copy');
        // This is just personal preference.
        // I prefer to not show the the whole text area selected.
        e.target.focus();
        this.setState({ copySuccess1: true });
    };



    constructor(props) {
        super(props)

        this.state = {

            refLoading: true,
            walletload: true,
            balanceload: true,
            totalInvestLoad: true,
            playerStatus: "In Active",
            boostStatus: "In Active",

            account: '',
            totalMembers: 0,
            totalBiz: 0,
            directBiz: 0,
            balance: 0,
            refFlag: 0,
            totalInvested: 0,

            lastDepositTime: 0,
            depositCount: 0,

            copySuccess1: false,

            tronWeb: {
                installed: false,
                loggedIn: false
            },
        }

        this.invest = this.invest.bind(this);
        this.reinvest = this.reinvest.bind(this);
        this.withdraw = this.withdraw.bind(this);
        this.collect = this.collect.bind(this);
        this.copyHandler1 = this.copyHandler1.bind(this);
        this.changeOwner = this.changeOwner.bind(this);
        this.changeManager = this.changeManager.bind(this);

    }

    render() {

        return (
            <div>

                <Home
                    walletload={this.state.walletload}
                    balanceload={this.state.balanceload}
                    totalInvestLoad={this.state.totalInvestLoad}
                    totalInvested={this.state.totalInvested}
                    account={this.state.account}
                    balance={this.state.balance}
                    trxDeposit={this.state.trxDeposit}
                    plus1k={this.state.plus1k}
                />
                <Plan
                    account={this.state.account}
                    refid={this.state.refid}
                    trxDeposit={this.state.trxDeposit}
                    minDepositSize={this.state.minDepositSize}
                    plus1k={this.state.plus1k}
                    plus4k={this.state.plus4k}
                    trxDeposit={this.state.trxDeposit}
                    isActive={this.state.isActive}
                    depositCount={this.state.depositCount}
                    lastDeposit={this.state.lastDeposit}
                    refLoading={this.state.refLoading}
                    stopFlag={this.state.stopFlag}
                    invest={this.invest}
                    reinvest={this.reinvest}
                />
                <ReferWithdraw
                    withdraw={this.withdraw}
                    account1={this.state.account1}
                    depositCount={this.state.depositCount}
                    totalRewards={this.state.totalRewards}
                    myTotalInvestment={this.state.myTotalInvestment}
                    refRewards={this.state.refRewards}
                    payRewards={this.state.payRewards}
                    payoutSum={this.state.payoutSum}
                    roiUnclaimed={this.state.roiUnclaimed}
                    totalRoi={this.state.totalRoi}
                    playerStatus={this.state.playerStatus}
                    isActive={this.state.isActive}
                    netRec={this.state.maxRec1}

                />
                <About
                />
                <Footer />

                {
                    this.state.owner === this.state.account || this.state.manager === this.state.account
                        ? <ChangeAdmin
                            owner={this.state.owner}
                            account={this.state.account}
                            manager={this.state.manager}
                            changeOwner={this.changeOwner}
                            changeManager={this.changeManager}
                        />
                        : null
                }


            </div >
        );
    }
}
export default TopPage;
