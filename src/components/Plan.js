import React, { Component } from 'react'
import "./css/custom.css";
import { toast } from 'react-toastify';
import loader from "./img/loadicon1.gif"


toast.configure();



export class Plan extends Component {


    constructor(props) {
        super(props)

        this.state = {
            count1: 0,
            count2: 0,
            count3: 0,
        }

        this.firstzero = this.firstzero.bind(this);
        this.secondzero = this.secondzero.bind(this);
        this.thirdzero = this.thirdzero.bind(this);

        this.firstbutton100 = this.firstbutton100.bind(this);
        this.secondbutton100 = this.secondbutton100.bind(this);
        this.thirdbutton100 = this.thirdbutton100.bind(this);

        this.secondbutton1000 = this.secondbutton1000.bind(this);
        this.thirdbutton1000 = this.thirdbutton1000.bind(this);

        this.thirdbutton4000 = this.thirdbutton4000.bind(this);

    }
    firstzero(event) {
        this.setState({ count1: 0 });
    }
    secondzero(event) {
        this.setState({ count2: 0 });
    }
    thirdzero(event) {
        this.setState({ count3: 0 });
    }

    firstbutton100(event) {
        this.setState({ count1: this.state.count1 + 100 });
    }

    secondbutton100(event) {
        this.setState({ count2: this.state.count2 + 100 });
    }

    thirdbutton100(event) {
        this.setState({ count3: this.state.count3 + 100 });
    }

    secondbutton1000(event) {
        this.setState({ count2: this.state.count2 + 1000 });
    }
    thirdbutton1000(event) {
        this.setState({ count3: this.state.count3 + 1000 });
    }
    thirdbutton4000(event) {
        this.setState({ count3: this.state.count3 + 4000 });
    }


    render() {
        return (
            <div>
                <div style={{ paddingTop: "30px" }}></div>
                <div className="demo">
                    <div className="container" style={{ overflow: "hidden" }}>
                        <div className="row">
                            <div className="col-md-4 col-sm-6">
                                <div className="pricingTable">
                                    <div className="pricingTable-header">
                                        <h3 className="title">Silver</h3>
                                    </div>
                                    <div className="price-value">
                                        <span className="amount">100</span>
                                        <span className="duration"> TRX</span>
                                    </div>
                                    <ul className="pricing-content">
                                        <li>1% Daily Return</li>
                                        <li> Total Return 200% </li>
                                        <li>Min Investment 100 TRX</li>
                                        <li>Dividends Every Hour</li>
                                    </ul>
                                    {this.props.depositCount === 0 ?
                                        <form
                                            onSubmit={(event) => {

                                                event.preventDefault();
                                                const refid = this.props.refid;
                                                const amount = this.state.count1;

                                                if (amount >= this.props.minDepositSize) {
                                                    this.props.invest(refid, amount);

                                                } else {
                                                    toast.error("Min deposit is 100 TRX");
                                                }


                                            }}
                                        >
                                            <input className=" " type="text"
                                                ref={(input) => {
                                                    this.amount = input;
                                                }}
                                                style={{
                                                    background: "none", border: "none",
                                                    borderBottom: "1px solid #153772", color: "black", paddingTop: "10px", textAlign: "center"
                                                }}
                                                value={this.state.count1}
                                                required />

                                            <br />
                                            <p>You should have ~2 TRX or more for transaction fee</p>
                                            <a className="btn btn-primary"
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    lineHeight: "60px",
                                                    borderRadius: "50%",
                                                    marginLeft: "12px",
                                                    color: "white", textAlign: "center",
                                                    backgroundImage: -"webkit-linear-gradient(#000 0%, #ffaaaa 100%)",
                                                    backgroundImage: "linear-gradient(#ad5389 0%, #3c1053 100%)",

                                                }} onClick={this.firstbutton100}>+100</a>
                                            <a className="btn btn-primary"
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    lineHeight: "60px",
                                                    borderRadius: "50%",
                                                    marginLeft: "12px",
                                                    color: "white", textAlign: "center",
                                                    backgroundImage: -"webkit-linear-gradient(#000 0%, #ffaaaa 100%)",
                                                    backgroundImage: "linear-gradient(#ED213A 0%, #93291E 100%)",

                                                }}
                                                onClick={this.firstzero}>Zero</a><br />

                                            {this.props.refLoading == false ?
                                                <button type="submit" style={{
                                                    fontFamily: "MyFont",

                                                    display: "inline-block",
                                                    padding: "0.5em 1em",
                                                    textDecoration: "none",
                                                    background: "#f7f7f7",
                                                    borderLeft: "solid 6px #ff7c5c",
                                                    color: "#ff7c5c",
                                                    fontWeight: "bold",
                                                    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.29)",
                                                    marginTop: "12px"

                                                }}>Invest</button>
                                                : <img src={loader} alt="loading..." width="30px" style={{ paddingLeft: "10px" }} />
                                            }


                                        </form>
                                        : <form
                                            onSubmit={(event) => {

                                                event.preventDefault();
                                                const amount = this.state.count1;

                                                if (amount >= this.props.lastDeposit) {
                                                    this.props.reinvest(amount);
                                                } else {
                                                    toast.error("Value less than last deposit");
                                                }



                                            }}
                                        >
                                            <input className=" " type="text"
                                                ref={(input) => {
                                                    this.amount = input;
                                                }}
                                                style={{
                                                    background: "none", border: "none",
                                                    borderBottom: "1px solid #153772", color: "black", paddingTop: "10px", textAlign: "center"
                                                }}
                                                value={this.state.count1}
                                                required />

                                            <br />
                                            <p>You should have ~2 TRX or more for transaction fee</p>
                                            <a className="btn btn-primary"
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    lineHeight: "60px",
                                                    borderRadius: "50%",
                                                    marginLeft: "12px",
                                                    color: "white", textAlign: "center",
                                                    backgroundImage: -"webkit-linear-gradient(#000 0%, #ffaaaa 100%)",
                                                    backgroundImage: "linear-gradient(#ad5389 0%, #3c1053 100%)",

                                                }} onClick={this.firstbutton100}>+100</a>
                                            <a className="btn btn-primary"
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    lineHeight: "60px",
                                                    borderRadius: "50%",
                                                    marginLeft: "12px",
                                                    color: "white", textAlign: "center",
                                                    backgroundImage: -"webkit-linear-gradient(#000 0%, #ffaaaa 100%)",
                                                    backgroundImage: "linear-gradient(#ED213A 0%, #93291E 100%)",

                                                }}
                                                onClick={this.firstzero}>Zero</a><br />


                                            <button type="submit" style={{
                                                fontFamily: "MyFont",

                                                display: "inline-block",
                                                padding: "0.5em 1em",
                                                textDecoration: "none",
                                                background: "#f7f7f7",
                                                borderLeft: "solid 6px #ff7c5c",
                                                color: "#ff7c5c",
                                                fontWeight: "bold",
                                                boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.29)",
                                                marginTop: "12px"

                                            }}>Re-Invest</button>


                                        </form>
                                    }

                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6" >
                                <div className="pricingTable gold">
                                    <div className="pricingTable-header">
                                        <h3 className="title">Gold</h3>
                                    </div>
                                    <div className="price-value">
                                        <span className="amount">1000</span>
                                        <span className="duration"> TRX</span>
                                    </div>
                                    <ul className="pricing-content">
                                        <li>Silver Plus</li>
                                        <li>Referral Rewards 10%</li>
                                        <li>Min Investment 1000 TRX</li>
                                        <li>Dividends Every Hour</li>

                                    </ul>
                                    {this.props.depositCount === 0 ?
                                        <form
                                            onSubmit={(event) => {

                                                event.preventDefault();
                                                const refid = this.props.refid;
                                                const amount = this.state.count2;

                                                if (amount >= this.props.plus1k) {
                                                    this.props.invest(refid, amount);

                                                } else {
                                                    toast.error("Min deposit is 1000 TRX");
                                                }


                                            }}
                                        >
                                            <input className=" " type="text"
                                                ref={(input) => {
                                                    this.amount = input;
                                                }}
                                                style={{
                                                    background: "none", border: "none",
                                                    borderBottom: "1px solid #153772", color: "black", paddingTop: "10px", textAlign: "center"
                                                }}
                                                value={this.state.count2}
                                                required />

                                            <br />
                                            <p>You should have ~2 TRX or more for transaction fee</p>
                                            <a className="btn btn-primary"
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    lineHeight: "60px",
                                                    borderRadius: "50%",
                                                    marginLeft: "12px",
                                                    color: "white", textAlign: "center",
                                                    backgroundImage: -"webkit-linear-gradient(#000 0%, #ffaaaa 100%)",
                                                    backgroundImage: "linear-gradient(#ad5389 0%, #3c1053 100%)",

                                                }} onClick={this.secondbutton1000}>+1000</a>
                                            <a className="btn btn-primary"
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    lineHeight: "60px",
                                                    borderRadius: "50%",
                                                    marginLeft: "12px",
                                                    color: "white", textAlign: "center",
                                                    backgroundImage: -"webkit-linear-gradient(#000 0%, #ffaaaa 100%)",
                                                    backgroundImage: "linear-gradient(#ad5389 0%, #3c1053 100%)",

                                                }} onClick={this.secondbutton100}>+100</a>
                                            <a className="btn btn-primary"
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    lineHeight: "60px",
                                                    borderRadius: "50%",
                                                    marginLeft: "12px",
                                                    color: "white", textAlign: "center",
                                                    backgroundImage: -"webkit-linear-gradient(#000 0%, #ffaaaa 100%)",
                                                    backgroundImage: "linear-gradient(#ED213A 0%, #93291E 100%)",

                                                }}
                                                onClick={this.secondzero}>Zero</a><br />


                                            {this.props.refLoading == false ?
                                                <button type="submit" style={{
                                                    fontFamily: "MyFont",

                                                    display: "inline-block",
                                                    padding: "0.5em 1em",
                                                    textDecoration: "none",
                                                    background: "#f7f7f7",
                                                    borderLeft: "solid 6px #ff7c5c",
                                                    color: "#ff7c5c",
                                                    fontWeight: "bold",
                                                    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.29)",
                                                    marginTop: "12px"

                                                }}>Invest</button>
                                                : <img src={loader} alt="loading..." width="30px" style={{ paddingLeft: "10px" }} />
                                            }


                                        </form>
                                        : <form
                                            onSubmit={(event) => {

                                                event.preventDefault();
                                                const amount = this.state.count2;

                                                if (amount >= this.props.lastDeposit) {
                                                    this.props.reinvest(amount);
                                                } else {
                                                    toast.error("Value less than last deposit");
                                                }



                                            }}
                                        >
                                            <input className=" " type="text"
                                                ref={(input) => {
                                                    this.amount = input;
                                                }}
                                                style={{
                                                    background: "none", border: "none",
                                                    borderBottom: "1px solid #153772", color: "black", paddingTop: "10px", textAlign: "center"
                                                }}
                                                value={this.state.count2}
                                                required />

                                            <br />
                                            <p>You should have ~2 TRX or more for transaction fee</p>
                                            <a className="btn btn-primary"
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    lineHeight: "60px",
                                                    borderRadius: "50%",
                                                    marginLeft: "12px",
                                                    color: "white", textAlign: "center",
                                                    backgroundImage: -"webkit-linear-gradient(#000 0%, #ffaaaa 100%)",
                                                    backgroundImage: "linear-gradient(#ad5389 0%, #3c1053 100%)",

                                                }} onClick={this.secondbutton1000}>+1000</a>
                                            <a className="btn btn-primary"
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    lineHeight: "60px",
                                                    borderRadius: "50%",
                                                    marginLeft: "12px",
                                                    color: "white", textAlign: "center",
                                                    backgroundImage: -"webkit-linear-gradient(#000 0%, #ffaaaa 100%)",
                                                    backgroundImage: "linear-gradient(#ad5389 0%, #3c1053 100%)",

                                                }} onClick={this.secondbutton100}>+100</a>
                                            <a className="btn btn-primary"
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    lineHeight: "60px",
                                                    borderRadius: "50%",
                                                    marginLeft: "12px",
                                                    color: "white", textAlign: "center",
                                                    backgroundImage: -"webkit-linear-gradient(#000 0%, #ffaaaa 100%)",
                                                    backgroundImage: "linear-gradient(#ED213A 0%, #93291E 100%)",

                                                }}
                                                onClick={this.secondzero}>Zero</a><br />


                                            <button type="submit" style={{
                                                fontFamily: "MyFont",

                                                display: "inline-block",
                                                padding: "0.5em 1em",
                                                textDecoration: "none",
                                                background: "#f7f7f7",
                                                borderLeft: "solid 6px #ff7c5c",
                                                color: "#ff7c5c",
                                                fontWeight: "bold",
                                                boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.29)",
                                                marginTop: "12px"

                                            }}>Re-Invest</button>


                                        </form>
                                    }

                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6" id="invest">
                                <div className="pricingTable plat">
                                    <div className="pricingTable-header">
                                        <h3 className="title">Diamond</h3>
                                    </div>
                                    <div className="price-value">
                                        <span className="amount">4000</span>
                                        <span className="duration"> TRX</span>
                                    </div>
                                    <ul className="pricing-content">
                                        <li>Gold plus</li>
                                        <li>Payout Rewards 75%</li>
                                        <li>Min Investment 4,000 TRX</li>
                                        <li>Dividends Every Hour</li>

                                    </ul>
                                    {this.props.depositCount === 0 ?
                                        <form
                                            onSubmit={(event) => {

                                                event.preventDefault();
                                                const refid = this.props.refid;
                                                const amount = this.state.count3;

                                                if (amount >= this.props.plus4k) {
                                                    this.props.invest(refid, amount);

                                                } else {
                                                    toast.error("Min deposit is 4000 TRX");
                                                }


                                            }}
                                        >
                                            <input className=" " type="text"
                                                ref={(input) => {
                                                    this.amount = input;
                                                }}
                                                style={{
                                                    background: "none", border: "none",
                                                    borderBottom: "1px solid #153772", color: "black", paddingTop: "10px", textAlign: "center"
                                                }}
                                                value={this.state.count3}
                                                required />

                                            <br />
                                            <p>You should have ~2 TRX or more for transaction fee</p>
                                            <a className="btn btn-primary"
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    lineHeight: "60px",
                                                    borderRadius: "50%",
                                                    marginLeft: "12px",
                                                    color: "white", textAlign: "center",
                                                    backgroundImage: -"webkit-linear-gradient(#000 0%, #ffaaaa 100%)",
                                                    backgroundImage: "linear-gradient(#ad5389 0%, #3c1053 100%)",

                                                }} onClick={this.thirdbutton4000}>+4000</a>
                                            <a className="btn btn-primary"
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    lineHeight: "60px",
                                                    borderRadius: "50%",
                                                    marginLeft: "12px",
                                                    color: "white", textAlign: "center",
                                                    backgroundImage: -"webkit-linear-gradient(#000 0%, #ffaaaa 100%)",
                                                    backgroundImage: "linear-gradient(#ad5389 0%, #3c1053 100%)",

                                                }} onClick={this.thirdbutton1000}>+1000</a>
                                            <a className="btn btn-primary"
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    lineHeight: "60px",
                                                    borderRadius: "50%",
                                                    marginLeft: "12px",
                                                    color: "white", textAlign: "center",
                                                    backgroundImage: -"webkit-linear-gradient(#000 0%, #ffaaaa 100%)",
                                                    backgroundImage: "linear-gradient(#ad5389 0%, #3c1053 100%)",

                                                }} onClick={this.thirdbutton100}>+100</a>
                                            <a className="btn btn-primary"
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    lineHeight: "60px",
                                                    borderRadius: "50%",
                                                    marginLeft: "12px",
                                                    color: "white", textAlign: "center",
                                                    backgroundImage: -"webkit-linear-gradient(#000 0%, #ffaaaa 100%)",
                                                    backgroundImage: "linear-gradient(#ED213A 0%, #93291E 100%)",

                                                }}
                                                onClick={this.thirdzero}>Zero</a><br />


                                            {this.props.refLoading == false ?
                                                <button type="submit" style={{
                                                    fontFamily: "MyFont",

                                                    display: "inline-block",
                                                    padding: "0.5em 1em",
                                                    textDecoration: "none",
                                                    background: "#f7f7f7",
                                                    borderLeft: "solid 6px #ff7c5c",
                                                    color: "#ff7c5c",
                                                    fontWeight: "bold",
                                                    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.29)",
                                                    marginTop: "12px"

                                                }}>Invest</button>
                                                : <img src={loader} alt="loading..." width="30px" style={{ paddingLeft: "10px" }} />
                                            }


                                        </form>
                                        : <form
                                            onSubmit={(event) => {

                                                event.preventDefault();
                                                const amount = this.state.count3;

                                                if (amount >= this.props.lastDeposit) {
                                                    this.props.reinvest(amount);
                                                } else {
                                                    toast.error("Value less than last deposit");
                                                }



                                            }}
                                        >
                                            <input className=" " type="text"
                                                ref={(input) => {
                                                    this.amount = input;
                                                }}
                                                style={{
                                                    background: "none", border: "none",
                                                    borderBottom: "1px solid #153772", color: "black", paddingTop: "10px", textAlign: "center"
                                                }}
                                                value={this.state.count3}
                                                required />

                                            <br />
                                            <p>You should have ~2 TRX or more for transaction fee</p>
                                            <a className="btn btn-primary"
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    lineHeight: "60px",
                                                    borderRadius: "50%",
                                                    marginLeft: "12px",
                                                    color: "white", textAlign: "center",
                                                    backgroundImage: -"webkit-linear-gradient(#000 0%, #ffaaaa 100%)",
                                                    backgroundImage: "linear-gradient(#ad5389 0%, #3c1053 100%)",

                                                }} onClick={this.thirdbutton4000}>+4000</a>

                                            <a className="btn btn-primary"
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    lineHeight: "60px",
                                                    borderRadius: "50%",
                                                    marginLeft: "12px",
                                                    color: "white", textAlign: "center",
                                                    backgroundImage: -"webkit-linear-gradient(#000 0%, #ffaaaa 100%)",
                                                    backgroundImage: "linear-gradient(#ad5389 0%, #3c1053 100%)",

                                                }} onClick={this.thirdbutton1000}>+1000</a>

                                            <a className="btn btn-primary"
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    lineHeight: "60px",
                                                    borderRadius: "50%",
                                                    marginLeft: "12px",
                                                    color: "white", textAlign: "center",
                                                    backgroundImage: -"webkit-linear-gradient(#000 0%, #ffaaaa 100%)",
                                                    backgroundImage: "linear-gradient(#ad5389 0%, #3c1053 100%)",

                                                }} onClick={this.thirdbutton100}>+100</a>
                                            <a className="btn btn-primary"
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    lineHeight: "60px",
                                                    borderRadius: "50%",
                                                    marginLeft: "12px",
                                                    color: "white", textAlign: "center",
                                                    backgroundImage: -"webkit-linear-gradient(#000 0%, #ffaaaa 100%)",
                                                    backgroundImage: "linear-gradient(#ED213A 0%, #93291E 100%)",

                                                }}
                                                onClick={this.thirdzero}>Zero</a><br />


                                            <button type="submit" style={{
                                                fontFamily: "MyFont",

                                                display: "inline-block",
                                                padding: "0.5em 1em",
                                                textDecoration: "none",
                                                background: "#f7f7f7",
                                                borderLeft: "solid 6px #ff7c5c",
                                                color: "#ff7c5c",
                                                fontWeight: "bold",
                                                boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.29)",
                                                marginTop: "12px"

                                            }}>Re-Invest</button>


                                        </form>
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default Plan
