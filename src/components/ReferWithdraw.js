import React, { Component } from 'react'
import back2 from "./img/bg2.png"
import Footer from "./Footer"
export class ReferWithdraw extends Component {
    render() {
        return (
            <div style={{ paddingTop: "40px" }}>
                <div className="row" style={{
                    backgroundColor: "white"
                }}>
                    <div className="col-md-2"></div>
                    <div className="col-md-4" style={{ textAlign: "center", margingTop: "12px", marginBottom: "12px", backgroundColor: "#eee", opacity: "80%" }} >
                        <h3 style={{ paddingTop: "20px", color: "#1C396D" }}><strong>Personal Statistics </strong> </h3>
                        <br />
                        <h5 style={{ color: "091A39", marginLeft: "20px" }}>My Investment : <strong>{this.props.myTotalInvestment}  </strong>TRX</h5>
                        <br />
                        <h5 style={{ color: "091A39", marginLeft: "20px" }}>Total Rewards : <strong>{this.props.totalRewards}  </strong>TRX</h5>
                        <br />
                        <h5 style={{ color: "091A39", marginLeft: "20px" }}>Total ROI : <strong>{Number(this.props.totalRoi).toFixed(4)}  </strong>TRX</h5>
                        <br />
                        <h5 style={{ color: "091A39", marginLeft: "20px" }}>Total Paid : <strong>{this.props.payoutSum}  </strong>TRX</h5>
                        <br />
                        <h5 style={{ color: "091A39", marginLeft: "20px" }}>Balance Withdrawable : <strong>{Number(this.props.roiUnclaimed).toFixed(4)}  </strong>TRX</h5>
                        <br />
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                this.props.withdraw(this.props.roiUnclaimed);
                            }}
                        >
                            <button style={{
                                fontFamily: "MyFont",

                                display: "inline-block",
                                padding: "0.5em 1em",
                                textDecoration: "none",
                                background: "#f7f7f7",
                                borderLeft: "solid 6px #ff7c5c",
                                color: "#ff7c5c",
                                fontWeight: "bold",
                                boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.29)"

                            }} type="submit">Withdraw</button>
                        </form>
                        <p>Transaction fee ~2 TRX for more</p>
                    </div>

                    <div className="col-md-4" style={{ textAlign: "center", margingTop: "12px", marginBottom: "12px", marginLeft: "12px", backgroundColor: "#eee", opacity: "80%" }} >
                        <h5 style={{ textAlign: "center", paddingTop: "20px", color: "091A39" }}>Member Status :
                        {this.props.isActive ?
                                <strong style={{ color: "Green" }}> {this.props.playerStatus}</strong>
                                : <strong style={{ color: "Red" }}> {this.props.playerStatus}</strong>
                            }
                        </h5>

                        <h5 style={{ textAlign: "center", paddingTop: "20px", color: "091A39" }}>Maximum Receivable :<strong style={{ color: "black" }}> {Number(this.props.netRec).toFixed(4)} TRX</strong></h5>
                        <h3 style={{ textAlign: "center", paddingTop: "40px", color: "black" }}><strong style={{ color: "#1C396D" }}>Referral Rewards </strong> </h3>
                        <h5 style={{ textAlign: "center", paddingTop: "20px", color: "091A39" }}>Direct Commission :<strong style={{ color: "black" }}>10%</strong></h5>

                        <h3 style={{ textAlign: "center", paddingTop: "20px", color: "black" }}><strong style={{ color: "#1C396D" }}>Payout Rewards : 75% </strong> </h3>
                        <h5 style={{ textAlign: "center", paddingTop: "20px", color: "091A39" }}>Level 1 :<strong style={{ color: "black" }}> 50%</strong></h5>
                        <h5 style={{ textAlign: "center", paddingTop: "20px", color: "091A39" }}>Level 2 :<strong style={{ color: "black" }}> 10%</strong></h5>
                        <h5 style={{ textAlign: "center", paddingTop: "20px", color: "091A39" }}>Level 3 to 5 :<strong style={{ color: "black" }}> 5%</strong></h5><br />

                    </div>
                    <div className="col-md-2"></div>
                </div >
            </div >
        )
    }
}

export default ReferWithdraw
