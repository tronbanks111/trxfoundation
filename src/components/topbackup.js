import React, { Component } from 'react';
import { toast } from 'react-toastify';

import TronWeb from 'tronweb';
import Utils from '../utils';
import LoadingPage from './LoadingPage.js';
import ChangeAdmin from "./ChangeAdmin";
import Timer from "./Timer";
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
import back from "./hero.png"

//let url = "https://tronbanks.net/";
let url1 = "https://trxfoundation.live/";

const FOUNDATION_ADDRESS = 'TYca9czpobfk9UyS4WJSuJ8UHBQuDpcsQm';



const MANAGER = "TE5qNun6wsmGR58ygEE5yA963Jse6AYNqe";

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

        const balTemp = await Utils.tronWeb.trx.getBalance(accTemp);
        const ballTemp = balTemp / sunny;
        this.setState({ balance: ballTemp });

        const ManagerHex = window.tronWeb.address.toHex(MANAGER);
        //  console.log(ManagerHex);
        this.setState({ ManagerHex });

        const accTemp = await Utils.tronWeb.defaultAddress.base58;
        this.setState({ account: accTemp });

        const contractBalance = await Utils.tronWeb.trx.getBalance(FOUNDATION_ADDRESS);
        this.setState({ contractBalance: contractBalance / sunny });

        const totalPlayers = await Utils.contract.totalPlayers().call();
        this.setState({ totalPlayers: parseInt(totalPlayers.toString()) });

        const hourRate = await Utils.contract.hourRate().call();
        this.setState({ hourRate: parseInt(hourRate.toString()) });

        const interestRateDivisor = await Utils.contract.interestRateDivisor().call();
        this.setState({ interestRateDivisor: parseInt(interestRateDivisor.toString()) });

        const totalInvested = await Utils.contract.totalInvested().call();
        this.setState({ totalInvested: parseInt(totalInvested.toString()) / sunny });

        const plus1k = await Utils.contract.plus1k().call();
        this.setState({ plus1k: parseInt(plus1k.toString()) / sunny });

        const plus10k = await Utils.contract.plus10k().call();
        this.setState({ plus10k: parseInt(plus10k.toString()) / sunny });

        const plus100k = await Utils.contract.plus100k().call();
        this.setState({ plus100k: parseInt(plus100k.toString()) / sunny });

        const totalPayout = await Utils.contract.totalPayout().call();
        this.setState({ totalPayout: parseInt(totalPayout.toString()) / sunny });

        const minDepositSize = await Utils.contract.minDepositSize().call();
        this.setState({ minDepositSize: parseInt(minDepositSize.toString()) / sunny });

        await Utils.contract.checkOwner().call().then(res => {

            this.setState({ owner: window.tronWeb.address.fromHex(res) });
            this.setState({ owner1: res });

        });
        console.log(this.state.owner);
        console.log(this.state.account);
        if (this.state.account === this.state.owner) {
            console.log("true");
        }

        await Utils.contract.checkManager().call().then(res => {

            this.setState({ manager: window.tronWeb.address.fromHex(res) });
            this.setState({ manager1: res });

        });
        // Personal Stats - players

        let currentuser = await Utils.contract.players(this.state.account).call();

        let trxDeposit = currentuser.trxDeposit;
        this.setState({
            trxDeposit: parseInt(trxDeposit.toString()) / sunny
        });

        let roiProfit = currentuser.roiProfit;
        this.setState({ roiProfit: parseInt(roiProfit.toString()) });

        let maxRec = currentuser.maxRec;
        this.setState({ maxRec: parseInt(maxRec.toString()) / sunny });

        let payoutSum = currentuser.payoutSum;
        this.setState({ payoutSum: parseInt(payoutSum.toString()) / sunny });

        let isActive = currentuser.isActive;
        this.setState({ isActive: parseInt(isActive.toString()) });
        if (this.state.isActive) {
            this.setState({ playerStatus: "Active" });
        }

        let refFrom = currentuser.refFrom;
        this.setState({ refFrom: window.tronWeb.address.fromHex(refFrom) });

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

        let isReInvest = currentuser.isReInvest;
        this.setState({ isReInvest: parseInt(isReInvest.toString()) });


        // Business - playersBiz

        let playerbiz = await Utils.contract.playersBiz(this.state.account).call();


        let myTotalInvestment = playerbiz.myTotalInvestment;
        this.setState({ myTotalInvestment: parseInt(myTotalInvestment.toString()) / sunny });

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


        let isBoost = playerbiz.isBoost;
        this.setState({ isBoost: parseInt(isBoost.toString()) });
        if (this.state.isBoost) {
            this.setState({ boostStatus: "Active" });
        }



        let boostedTime = playerbiz.boostedTime;
        this.setState({ boostedTime: parseInt(boostedTime.toString()) });


        let refRewards = playerbiz.refRewards;
        this.setState({ refRewards: parseInt(refRewards.toString()) / sunny });

        let payRewards = playerbiz.payRewards;
        this.setState({ payRewards: parseInt(payRewards.toString()) / sunny });

        let totalRewards = playerbiz.totalRewards;
        this.setState({ totalRewards: parseInt(totalRewards.toString()) / sunny });
        this.setState({ refid: this.state.owner });

        // console.log(this.props)
        if (this.props.refid) {
            this.setState({ refid: this.props.refid });
        }
        console.log(this.state.refid);

        //  console.log(this.state.refLinkAddress);
        let presentTime = await Utils.contract.getNow().call();
        this.setState({ presentTime: parseInt(presentTime.toString()) });

        let getTime = await Utils.contract.getTime().call();
        this.setState({ getTime: parseInt(getTime.toString()) });

        // Calculation of ROI
        var boostedSec = 0;
        var normalSec = 0;
        var totalSec = 0;
        var maxMin = 0;
        var maxRoi = 0;
        var totalRoi = 0;
        var roi1 = 0;
        var roi2 = 0;
        var maxRecRoi = 0;
        console.log('plus 100 ' + this.state.plus100k);



        if (this.state.boostedTime > this.state.joiningTime) {
            boostedSec = this.state.presentTime - this.state.boostedTime;
            var boostedMin = 0;
            var boostedHour = 0;
            boostedMin = boostedSec / 60;
            normalSec = this.state.boostedTime - this.state.joiningTime;
            var normalMin = 0;
            var normalHour = 0;
            normalMin = normalSec / 60;

            if (this.state.trxDeposit >= this.state.plus100k) {
                maxMin = 3000;
                maxRoi = 2.5 * this.state.trxDeposit;
            } else {
                maxMin = 2400;
                maxRoi = 2 * this.state.trxDeposit;
            }

            totalSec = boostedSec + normalSec;
            var totalMin = 0;
            totalMin = boostedMin + normalMin;

            if (totalMin >= maxMin) {
                boostedMin = maxMin - normalMin;
            }
            roi1 = this.state.trxDeposit * normalMin * this.state.hourRate / this.state.interestRateDivisor;
            roi2 = this.state.trxDeposit * boostedMin * this.state.hourRate * 1.5 / this.state.interestRateDivisor;
            totalRoi = roi1 + roi2;
        } else {
            normalMin = this.state.presentTime - this.state.joiningTime;
            totalMin = normalMin;
            if (totalMin >= maxMin) {
                normalMin = maxMin;
            }
            totalRoi = this.state.trxDeposit * normalMin * this.state.hourRate / this.state.interestRateDivisor;
        }

        maxRecRoi = maxRoi - this.state.totalRewards;
        if (totalRoi >= maxRecRoi) {
            totalRoi = maxRecRoi;
        }

        var roiClaimed = 0;
        var roiUnclaimed = 0;
        var totalSec = 0;

        this.setState({ totalRoi });
        this.setState({ normalSec });
        this.setState({ boostedSec });
        this.setState({ normalMin: Math.floor(normalMin, 0) });
        this.setState({ boostedMin: Math.floor(boostedMin, 0) });

        roiClaimed = this.state.payoutSum - this.state.totalRewards;
        this.setState({ roiClaimed });

        roiUnclaimed = this.state.totalRoi - this.state.roiClaimed;
        this.setState({ roiUnclaimed });

        totalSec = this.state.lastroiPaid - this.state.joiningTime;
        this.setState({ totalSec });

        var paidBoost;
        paidBoost = this.state.totalSec - this.state.normalSec;
        this.setState({ paidBoost });

        const payID = await Utils.contract.payID().call();
        this.setState({ payID: parseInt(payID.toString()) });


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
            });

    }

    changeManager(manager) {

        return Utils.contract
            .changeManager(manager)
            .send({
                from: this.state.account,
            });

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

            loading: false,
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
                {this.state.loading
                    ? <LoadingPage />
                    : <div>

                        <div className="row">
                            <div className="col-xl-4">
                                <p>trxDeposit : <strong>{this.state.trxDeposit}</strong> TRX</p>
                                <p>myTotalInvestment : <strong>{this.state.myTotalInvestment}</strong> TRX</p>
                                <p>totalRoi : <strong>{Number(this.state.totalRoi).toFixed(4)}</strong> TRX</p>
                                <p>roiClaimed : <strong>{Number(this.state.roiClaimed).toFixed(4)}</strong> TRX</p>
                                <p>roiUnclaimed : <strong>{Number(this.state.roiUnclaimed).toFixed(4)}</strong> TRX</p>
                                <p>payoutSum : <strong>{Number(this.state.payoutSum).toFixed(4)}</strong> TRX</p>
                                <p>totalRewards : <strong>{Number(this.state.totalRewards).toFixed(4)}</strong> TRX</p>
                                <p>contractBalance : <strong>{Number(this.state.contractBalance).toFixed(4)}</strong> TRX</p>
                                <p>refFrom : <strong>{this.state.refFrom}</strong></p>
                                <p>account : <strong>{this.state.account}</strong></p>
                                <p>owner : <strong>{this.state.owner}</strong></p>
                                <p>manager : <strong>{this.state.manager}</strong></p>
                                <form
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        this.collect(this.state.account);
                                    }}
                                >
                                    <button style={{


                                        display: "inline-block",
                                        padding: "0.5em 1em",
                                        textDecoration: "none",
                                        background: "#f7f7f7",
                                        borderLeft: "solid 6px #ff7c5c",
                                        color: "#ff7c5c",
                                        fontWeight: "bold",
                                        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.29)"

                                    }} type="submit">Collect</button>

                                    <div style={{ paddingBottom: "50px" }}></div>

                                </form>

                            </div>
                            <div className="col-xl-4">
                                <p>joiningTime : <strong>{this.state.joiningTime}</strong> </p>
                                <p>boostedTime : <strong>{this.state.boostedTime}</strong> </p>
                                <p>presentTime : <strong>{this.state.presentTime}</strong> </p>
                                <p>getTime : <strong>{this.state.getTime}</strong> </p>
                                <p>normalMin : <strong>{this.state.normalMin}</strong> </p>
                                <p>boostedMin : <strong>{this.state.boostedMin}</strong> </p>
                                <p>isBoost : <strong>{this.state.isBoost}</strong> </p>
                                <p>directBiz : <strong>{this.state.directBiz}</strong> </p>
                                <p>trxDeposit : <strong>{this.state.trxDeposit}</strong> </p>
                                <p>totalBiz : <strong>{this.state.totalBiz}</strong> </p>
                                <br />
                                <p>lastroiPaid : <strong>{this.state.lastroiPaid}</strong> </p>
                                <p>totalMin : <strong>{this.state.totalMin}</strong> </p>
                                <p>paidBoost : <strong>{this.state.paidBoost}</strong> </p>
                                <p>normalMin : <strong>{this.state.normalMin}</strong> </p>


                            </div>
                            <div className="col-xl-4"></div>

                        </div>










                        <header className="main-header home-16">
                            <div className="outer-container">
                                <div className="container">

                                    <div className="main-box clearfix" style={{ textAlign: "center" }}>
                                        <div className="logo-box" >
                                            <figure className="logo"><a href="index.html"><img src={require("./logo.png")}
                                                alt="Ethereum" width="830px" /></a></figure>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </header>

                        <section className="banner-style-16 boxed-wrapper" style={{

                            backgroundImage: `url(${back})`, backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", fontFamily: "MyFont"
                        }}
                        >

                            <div className="container" >

                                <div className="row">
                                    <div className="btn-box" style={{ paddingLeft: "30px" }}>
                                        <h2 style={{ fontSize: "46px", textAlign: "center" }} ><span style={{ color: "#3BD62C" }}>
                                        </span> <span style={{ color: "White", fontSize: "44px" }}>
                                                is a community driven funding program which aims to offer <span style={{ color: "orange", fontSize: "45px" }}> 2% to 3% daily</span>
                                            </span>
                                        </h2>
                                        <br /><br /><br />
                                        <h1 style={{ fontSize: "46px", textAlign: "center", color: "Yellow" }}>
                                            Global <span></span>Statistics
                                </h1><br />
                                        <div className="row">
                                            <div className="col-xl-4">
                                                <h2 style={{ fontSize: "36px", textAlign: "center" }} ><span style={{ color: "#3BD62C" }}>
                                                </span> <span style={{ color: "White", fontSize: "40px" }}>
                                                        Total Investments <br /><span style={{ color: "orange", fontSize: "45px" }}> {this.state.totalInvested} TRX</span>
                                                    </span>
                                                </h2>
                                            </div>
                                            <div className="col-xl-4">
                                                <h2 style={{ fontSize: "36px", textAlign: "center" }} ><span style={{ color: "#3BD62C" }}>
                                                </span> <span style={{ color: "White", fontSize: "40px" }}>
                                                        Total Members <br /><span style={{ color: "orange", fontSize: "45px" }}> {this.state.totalPlayers} </span>
                                                    </span>
                                                </h2>
                                            </div>
                                            <div className="col-xl-4">
                                                <h2 style={{ fontSize: "36px", textAlign: "center" }} ><span style={{ color: "#3BD62C" }}>
                                                </span> <span style={{ color: "White", fontSize: "40px" }}>
                                                        Total Paid <br /><span style={{ color: "orange", fontSize: "45px" }}> {this.state.totalPayout} TRX </span>
                                                    </span>
                                                </h2>
                                            </div>
                                        </div><br /><br />



                                        <h1 style={{ fontSize: "46px", textAlign: "center", color: "Yellow" }} >
                                            Personal Statistics
                                </h1><br />
                                        <div className="row">
                                            <div className="col-xl-4">
                                                <h2 style={{ fontSize: "36px", textAlign: "center" }} ><span style={{ color: "#3BD62C" }}>
                                                </span> <span style={{ color: "White", fontSize: "40px" }}>
                                                        My Investments <br /><span style={{ color: "orange", fontSize: "45px" }}> {this.state.myTotalInvestment} TRX </span>
                                                    </span>
                                                </h2>
                                            </div>
                                            <div className="col-xl-4">
                                                <h2 style={{ fontSize: "36px", textAlign: "center" }} ><span style={{ color: "#3BD62C" }}>
                                                </span> <span style={{ color: "White", fontSize: "40px" }}>
                                                        Total Business <br /><span style={{ color: "orange", fontSize: "45px" }}> {this.state.myTotalBiz} TRX </span>
                                                    </span>
                                                </h2>
                                            </div>
                                            <div className="col-xl-4">
                                                <h2 style={{ fontSize: "36px", textAlign: "center" }} ><span style={{ color: "#3BD62C" }}>
                                                </span> <span style={{ color: "White", fontSize: "40px" }}>
                                                        Total Received <br /><span style={{ color: "orange", fontSize: "45px" }}> {this.state.payoutSum} TRX </span>
                                                    </span>
                                                </h2>
                                            </div>
                                        </div>




                                        <div style={{ paddingBottom: "20px" }}></div>
                                    </div></div>


                                <div className="row">









                                    <div className="col-xl-5"
                                        style={{

                                            animation: "animated - border 1.5s infinite",
                                            fontSize: "18px", lineHeight: "30px", fontWeight: "bold", color: "white", borderRadius: "20px", borderSpacing: "15px", padding: "15px", background: "#1A246C", marginTop: "10px", marginLeft: "10px", marginRight: "10px", opacity: "80%", width: "500px",
                                            background: "linear-gradient(to right, #c31432, #240b36 )", fontFamily: "MyFont"

                                        }}>

                                        <div>
                                            <h2 style={{ fontSize: "35px", textAlign: "center" }} ><span style={{ color: "#3BD62C" }}>
                                                <strong>Investment</strong></span> <span style={{ color: "White" }}>
                                                    <strong>Section {this.state.isReInvest}</strong></span>
                                            </h2>
                                            <br />
                                            {this.state.trxDeposit <= 0 || this.state.isActive === 0 ?
                                                <form
                                                    onSubmit={(event) => {
                                                        event.preventDefault();
                                                        const refid = this.state.refid;
                                                        const amount = this.amount.value;
                                                        if (this.state.isReInvest === 0) {
                                                            if (amount >= this.state.minDepositSize) {
                                                                this.invest(refid, amount);
                                                            } else {
                                                                toast.error("  Deposit value not in range");

                                                            }
                                                        } else {
                                                            if (amount >= this.state.minDepositSize) {
                                                                this.reinvest(amount);
                                                            } else {
                                                                toast.error(" Re Invest value not in range");

                                                            }
                                                        }

                                                    }}
                                                >
                                                    <div className="row" >
                                                        <h5 style={{ color: "White", paddingTop: "10px" }}>
                                                        </h5>
                                                        <span>
                                                            <input className=" " type="text"
                                                                id="amount"
                                                                ref={(input) => {
                                                                    this.amount = input;
                                                                }}
                                                                style={{

                                                                    background: "green",
                                                                    borderBottom: "1px solid #153772", color: "White", paddingTop: "10px", marginLeft: "13px"
                                                                }}

                                                                placeholder="Min 100 TRX" required /></span>

                                                    </div><br />
                                                    <button style={{


                                                        display: "inline-block",
                                                        padding: "0.5em 1em",
                                                        textDecoration: "none",
                                                        background: "#f7f7f7",
                                                        borderLeft: "solid 6px #ff7c5c",
                                                        color: "#ff7c5c",
                                                        fontWeight: "bold",
                                                        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.29)"

                                                    }} type="submit">Invest</button>

                                                    <div style={{ paddingBottom: "50px" }}></div>

                                                </form>

                                                : <div>
                                                    <p style={{ color: "white" }}> Member Status : <strong style={{ color: "Orange" }} >{this.state.playerStatus}</strong></p><br />
                                                    <p style={{ color: "white" }}> Booster Status : <strong style={{ color: "Orange" }} >{this.state.boostStatus}</strong></p><br />
                                                    <p style={{ color: "white" }}> Total Business : <strong style={{ color: "Orange" }} >{this.state.mytotalBiz}</strong></p><br />
                                                    <p style={{ color: "white" }}> Direct Business : <strong style={{ color: "Orange" }} >{this.state.directBiz}</strong></p><br />
                                                    <p style={{ color: "white" }}>  Total ROI : <strong style={{ color: "Orange" }} >{this.state.roiClaimed}</strong></p><br />
                                                    <p style={{ color: "white" }}>  Total Rewards : <strong style={{ color: "Orange" }} >{this.state.totalRewards}</strong></p><br />
                                                    <p style={{ color: "white" }}>  Re Invest : <strong style={{ color: "Orange" }} >{this.state.isReInvest}</strong></p><br />

                                                </div>}


                                        </div>

                                    </div>















                                    <div className="col-xl-5" style={{

                                        animation: "animated - border 1.5s infinite",
                                        fontSize: "18px", lineHeight: "30px", fontWeight: "bold", color: "white", borderRadius: "20px", borderSpacing: "15px", padding: "15px", background: "#1A246C", marginTop: "10px", marginLeft: "10px", marginRight: "10px", opacity: "80%", width: "500px",
                                        background: "linear-gradient(to right,#0F2027, #203A43,#2C5364 )"

                                    }}>
                                        <div>
                                            <h2 style={{ fontSize: "35px", textAlign: "center" }} ><span style={{ color: "#3BD62C" }}>
                                                <strong>Payout</strong></span> <span style={{ color: "White" }}>
                                                    <strong>Section</strong></span>
                                            </h2>
                                            <br /> <form
                                                onSubmit={(event) => {
                                                    event.preventDefault();
                                                    this.withdraw(this.state.roiUnclaimed);
                                                }}
                                            >
                                                <button style={{


                                                    display: "inline-block",
                                                    padding: "0.5em 1em",
                                                    textDecoration: "none",
                                                    background: "#f7f7f7",
                                                    borderLeft: "solid 6px #ff7c5c",
                                                    color: "#ff7c5c",
                                                    fontWeight: "bold",
                                                    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.29)"

                                                }} type="submit">Withdraw</button>

                                                <div style={{ paddingBottom: "50px" }}></div>

                                            </form>

                                            <p>{this.state.roiUnclaimed}</p>
                                            <br />
                                            <h2 style={{ fontSize: "35px", textAlign: "center" }} ><span style={{ color: "#3BD62C" }}>
                                                <strong>Your </strong></span> <span style={{ color: "White" }}>
                                                    <strong>Link</strong></span>
                                            </h2>
                                            <form >
                                                <input className=" " type="text"
                                                    ref={(textarea1) => this.textArea1 = textarea1}
                                                    style={{

                                                        background: "none", border: "none",
                                                        borderBottom: "1px solid #153772", color: "White", paddingTop: "12px"
                                                    }}
                                                    value={url1 + this.state.account} />

                                                {
                                                    document.queryCommandSupported('copy') &&
                                                    <div>
                                                        <button style={{



                                                            display: "inline-block",
                                                            padding: "0.5em 1em",
                                                            textDecoration: "none",
                                                            background: "#f7f7f7",
                                                            borderLeft: "solid 6px #ff7c5c",
                                                            color: "#ff7c5c",
                                                            fontWeight: "bold",
                                                            boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.29)"

                                                        }} onClick={this.copyHandler1}>
                                                            Copy Referral Link
                                                                </button>
                                                        {
                                                            this.state.copySuccess1 ?
                                                                <div style={{


                                                                    display: "inline-block",
                                                                    padding: "7px 20px",
                                                                    borderRadius: "25px",
                                                                    textDecoration: "none",
                                                                    color: "#FFF",

                                                                    backgroundImage: "linear-gradient(45deg, #000000 0%, #000000 100%)",
                                                                    transition: ".4s",

                                                                }} >
                                                                    Success!
                                       </div> : null
                                                        } </div>
                                                }


                                            </form>

                                        </div>
                                    </div>


                                </div>
                                <div className="row">
                                    <div className="col-xl-5"
                                        style={{

                                            animation: "animated - border 1.5s infinite",
                                            fontSize: "18px", lineHeight: "30px", fontWeight: "bold", color: "white", borderRadius: "20px", borderSpacing: "15px", padding: "15px", background: "#1A246C", marginTop: "10px", marginLeft: "10px", marginRight: "10px", opacity: "80%", width: "500px",
                                            background: "linear-gradient(to right, #c31432, #240b36 )"

                                        }}>
                                        <div>
                                            <h2 style={{ fontSize: "35px", textAlign: "center" }} ><span style={{ color: "#3BD62C" }}>
                                                <strong>Program</strong></span> <span style={{ color: "White" }}>
                                                    <strong>Highlights</strong></span>
                                            </h2>
                                            <br />

                                            <h2 style={{ fontSize: "25px", textAlign: "left", color: "Grey" }} ><span style={{ color: "White" }}>
                                                <strong>3% daily    </strong></span>
                                                <span style={{ color: "#3BD62C", fontSize: "25px" }}>
                                                    <strong> with Booster</strong></span>
                                            </h2>
                                            <br />

                                            <h2 style={{ fontSize: "25px", textAlign: "left", color: "Grey" }} ><span style={{ color: "White" }}>
                                                <strong>2% daily   </strong></span>
                                                <span style={{ color: "#3BD62C", fontSize: "25px" }}>
                                                    <strong> without Booster  </strong></span>
                                            </h2>
                                            <br />

                                            <h2 style={{ fontSize: "25px", textAlign: "left", color: "Grey" }} ><span style={{ color: "White" }}>
                                                <strong>10%    </strong></span>
                                                <span style={{ color: "#3BD62C", fontSize: "25px" }}>
                                                    <strong>Referral Rewards   </strong></span>
                                            </h2><br />
                                            <h2 style={{ fontSize: "25px", textAlign: "left", color: "Grey" }} ><span style={{ color: "White" }}>
                                                <strong>25%    </strong></span>
                                                <span style={{ color: "#3BD62C", fontSize: "25px" }}>
                                                    <strong>Payout Rewards   </strong></span>
                                            </h2><br />
                                            <h2 style={{ fontSize: "25px", textAlign: "left", color: "Grey" }} ><span style={{ color: "White" }}>
                                                <strong>  Minimum Investment   </strong></span>
                                                <span style={{ color: "#3BD62C", fontSize: "25px" }}>
                                                    <strong>100 TRX   </strong></span>
                                            </h2><br />
                                            <h2 style={{ fontSize: "25px", textAlign: "left", color: "Grey" }} ><span style={{ color: "White" }}>
                                                <strong>Maximum Receivable    </strong></span>
                                                <span style={{ color: "#3BD62C", fontSize: "25px" }}>
                                                    <strong>up to 250%  </strong></span>
                                            </h2>

                                        </div>

                                    </div>
                                    <div className="col-xl-5" style={{

                                        animation: "animated - border 1.5s infinite",
                                        fontSize: "18px", lineHeight: "30px", fontWeight: "bold", color: "white", borderRadius: "20px", borderSpacing: "15px", padding: "15px", background: "#1A246C", marginTop: "10px", marginLeft: "10px", marginRight: "10px", opacity: "80%", width: "500px",
                                        background: "linear-gradient(to right,#0F2027, #203A43,#2C5364 )"

                                    }}>
                                        <div>
                                            <h2 style={{ fontSize: "35px", textAlign: "center" }} ><span style={{ color: "#3BD62C" }}>
                                                <strong>What is</strong></span> <span style={{ color: "White" }}>
                                                    <strong>Booster ?</strong></span>
                                            </h2>
                                            <br />

                                            <p style={{ textAlign: "left", color: "white", fontFamily: "MyFont" }} >
                                                Booster is a business logic that is used by major Business Giants to increase the in flow of funds exponentially. If a user makes an investment of 1000 TRX and if he refers 2000 TRX, then the user will be equipped with Booster.
                                        <br /><br /> With Booster activated, user will receive 2x of his funds at a faster rate which creates more in flow and there by it is a win-win situation for all.
                                        <br /><br />
                                                <span style={{ color: "green" }}>
                                                    Please note: Booster can be activated within 7 days of your investment.
                                        </span>

                                            </p>


                                        </div>

                                    </div>


                                </div>
                                <div className="row">
                                    <div className="col-xl-5"
                                        style={{

                                            animation: "animated - border 1.5s infinite",
                                            fontSize: "18px", lineHeight: "30px", fontWeight: "bold", color: "white", borderRadius: "20px", borderSpacing: "15px", padding: "15px", background: "#1A246C", marginTop: "10px", marginLeft: "10px", marginRight: "10px", opacity: "80%", width: "500px",
                                            background: "linear-gradient(to right, #c31432, #240b36 )"

                                        }}>
                                        <div>
                                            <h2 style={{ fontSize: "35px", textAlign: "center" }} ><span style={{ color: "#3BD62C" }}>
                                                <strong>Benefits of</strong></span> <span style={{ color: "White" }}>
                                                    <strong>Higher Investments</strong></span>
                                            </h2>
                                            <br />

                                            <h2 style={{ fontSize: "25px", textAlign: "center", color: "Grey" }} ><span style={{ color: "White" }}>
                                                <strong>100 TRX plus    </strong></span><br />
                                                <span style={{ color: "#3BD62C", fontSize: "25px" }}>
                                                    <strong> only ROI upto 200%</strong></span>
                                            </h2>
                                            <br />

                                            <h2 style={{ fontSize: "25px", textAlign: "center", color: "Grey" }} ><span style={{ color: "White" }}>
                                                <strong>1000 TRX plus   </strong></span><br />
                                                <span style={{ color: "#3BD62C", fontSize: "25px" }}>
                                                    <strong>ROI upto 200% </strong></span>
                                                <br />
                                                <span style={{ color: "#3BD62C", fontSize: "25px" }}>
                                                    <strong>Referral Rewards up to 10% </strong></span>
                                            </h2>
                                            <br />

                                            <h2 style={{ fontSize: "25px", textAlign: "center", color: "Grey" }} ><span style={{ color: "White" }}>
                                                <strong>10,000 TRX plus   </strong></span><br />
                                                <span style={{ color: "#3BD62C", fontSize: "25px" }}>
                                                    <strong>ROI upto 200% </strong></span>
                                                <br />
                                                <span style={{ color: "#3BD62C", fontSize: "25px" }}>
                                                    <strong>Referral Rewards up to 10% </strong></span>
                                                <br />
                                                <span style={{ color: "#3BD62C", fontSize: "25px" }}>
                                                    <strong>Payout Rewards up to 25% </strong></span>
                                            </h2>
                                            <br />
                                            <h2 style={{ fontSize: "25px", textAlign: "center", color: "Grey" }} ><span style={{ color: "White" }}>
                                                <strong>100,000 TRX plus   </strong></span><br />
                                                <span style={{ color: "#3BD62C", fontSize: "25px" }}>
                                                    <strong>ROI upto 250% </strong></span>
                                                <br />
                                                <span style={{ color: "#3BD62C", fontSize: "25px" }}>
                                                    <strong>Referral Rewards up to 10% </strong></span>
                                                <br />
                                                <span style={{ color: "#3BD62C", fontSize: "25px" }}>
                                                    <strong>Payout Rewards up to 25% </strong></span>
                                            </h2>
                                            <br />






                                        </div>

                                    </div>
                                    <div className="col-xl-5" style={{

                                        animation: "animated - border 1.5s infinite",
                                        fontSize: "18px", lineHeight: "30px", fontWeight: "bold", color: "white", borderRadius: "20px", borderSpacing: "15px", padding: "15px", background: "#1A246C", marginTop: "10px", marginLeft: "10px", marginRight: "10px", opacity: "80%", width: "500px",
                                        background: "linear-gradient(to right,#0F2027, #203A43,#2C5364 )"

                                    }}>
                                        <div>
                                            <h2 style={{ fontSize: "35px", textAlign: "center" }} ><span style={{ color: "#3BD62C" }}>
                                                <strong>Referral</strong></span> <span style={{ color: "White" }}>
                                                    <strong>Rewards</strong></span>
                                            </h2>
                                            <br />

                                            <p style={{ textAlign: "center", color: "white", fontFamily: "MyFont" }} >
                                                Level 1 : 5%
                                        <br /><br />
                                        Level 2 : 2%
                                        <br /><br />
                                        Level 3 : 1%
                                        <br /><br />
                                        Level 4 : 1%
                                        <br /><br />
                                        Level 5 : 1%
                                        <br /><br />
                                                <span style={{ color: "green" }}>
                                                    Note: Personal Investment of 1000 TRX plus required
                                        </span>


                                            </p>
                                            <h2 style={{ fontSize: "35px", textAlign: "center" }} ><span style={{ color: "#3BD62C" }}>
                                                <strong>Payout</strong></span> <span style={{ color: "White" }}>
                                                    <strong>Rewards</strong></span>
                                            </h2>
                                            <br />

                                            <p style={{ textAlign: "center", color: "white", fontFamily: "MyFont" }} >
                                                5% per Level
                                    </p>
                                            <span style={{ color: "green", textAlign: "center" }}>
                                                Note: Personal Investment of 10,000 TRX plus required
                                    </span>

                                        </div>
                                    </div>
                                </div>


                                {this.state.account === this.state.owner || this.state.account === this.state.manager ?
                                    <ChangeAdmin
                                        account={this.state.account}
                                        manager={this.state.manager}
                                        owner={this.state.owner}
                                        changeManager={this.changeManager}
                                        changeOwner={this.changeOwner}
                                        ManagerHex={this.state.ManagerHex}
                                    />

                                    : null}

                            </div>
                        </section >
                        <Footer />
                    </div>
                }
            </div >
        );
    }
}
export default TopPage;
