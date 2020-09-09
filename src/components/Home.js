import React, { Component } from "react";

import logo from "./img/logoblack.png";
import telegram from "./img/telegram.png";
import back2 from "./img/back1.jpg"
import loader from "./img/loadicon1.gif"
import side from "./img/illustration-13.png"

const FOUNDATION_ADDRESS = 'TYca9czpobfk9UyS4WJSuJ8UHBQuDpcsQm';
const TronBillion = 'TYDWj2DBbKMdnzmUgZZrujSxkwuy522fCZ';
let url1 = "https://trxfoundation.live/";
// let url1 = "http://localhost:3000/"
let contracturl = "https://tronscan.org/#/contract/" + TronBillion;

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = { copySuccess: '' }
  }

  copyToClipboard = (e) => {
    this.textArea.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    this.setState({ copySuccess: 'Copied!' });
  };

  render() {
    return (
      <div>
        <body className="is-boxed has-animations">
          <div className="body-wrap boxed-containerbox">

            <main>
              <section className="hero">

                <div className="containerbox" style={{ textAlign: "center", paddingTop: "30px", overflow: "hidden" }} >
                  <a href="https://trxfoundation.live">
                    <img src={logo} alt="Logo" width="520px" /></a>

                  <div className="hero-inner">
                    <div className="row">
                      <div className="col-md-6">

                      </div>
                      <div className="col-md-6"></div>
                    </div>
                    <div className="hero-copy">
                      <h1 style={{ fontSize: "44px", color: "Grey" }} ><strong>Get 1% Daily</strong></h1><br />
                      <h4 style={{ fontSize: "14px", color: "black" }} >
                        <strong>100% Decentralized - No third party institutions involved</strong>
                      </h4><br />
                      <h4 style={{ fontSize: "14px", color: "black" }} >
                        <strong>100% Transparent - All In going and Out going transactions are traceable in tronscan.org</strong>
                      </h4><br />
                      <h4 style={{ fontSize: "14px", color: "black" }} >
                        <strong> Fully Verified and Secured Smart Contract</strong>
                      </h4><br />
                      <h4 style={{ fontSize: "14px", color: "black" }} >
                        <strong>Get 50% on return of your directs</strong>
                      </h4><br />
                      <a href={contracturl}>
                        <button style={{
                          display: "inline - block",
                          textDecoration: "none",
                          background: "#ff8181",
                          color: "#FFF",
                          width: "80px",
                          height: "80px",
                          lineHeight: "80px",
                          borderRadius: "50%",
                          textAlign: "center",
                          fontWeight: " bold",
                          verticalAlign: "middle",
                          overflow: "hidden",
                          boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.29)",
                          borderBottom: "solid 3px #bd6565",
                          backgroundImage: -"webkit-linear-gradient(#000 0%, #ffaaaa 100%)",
                          backgroundImage: "linear-gradient(#000 0%, #ffaaaa 100%)",

                          transition: ".4s",
                        }} ><i className="fa fa-suitcase" style={{ fontSize: "30px" }} ></i></button></a>

                      <a href="https://t.me/etherbanks_official">
                        <button href="#" style={{
                          display: "inline - block",
                          textDecoration: "none",
                          background: "#ff8181",
                          color: "#FFF",
                          width: "80px",
                          height: "80px",
                          lineHeight: "80px",
                          borderRadius: "50%",
                          textAlign: "center",
                          fontWeight: " bold",
                          verticalAlign: "middle",
                          overflow: "hidden",
                          boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.29)",
                          borderBottom: "solid 3px #bd6565",
                          backgroundImage: -"webkit-linear-gradient(#000 0%, #ffaaaa 100%)",
                          backgroundImage: "linear-gradient(#000 0%, #ffaaaa 100%)",

                          transition: ".4s",
                          marginLeft: "20px"
                        }} ><i className="fa fa-home" style={{ fontSize: "30px" }} ></i></button></a>
                    </div>

                  </div>
                </div>
              </section>
            </main>
          </div>

        </body >
        {this.props.totalInvested > 1000000 ?
          <div>
            <h5 style={{ textAlign: "center", color: "black", paddingTop: "60px" }}><strong>Total Invested</strong></h5>
            <h3 style={{ fontWeight: "70px", fontSize: "64px", color: "#888", marginLeft: "20px", textAlign: "center" }}> {this.props.totalInvestLoad ? <img src={loader} alt="loading..." width="60px" style={{ paddingLeft: "10px" }} /> :
              <strong style={{ paddingLeft: "10px", paddingRight: "10px" }}>{this.props.totalInvested} </strong>}
       TRX </h3> </div> : null
        }
        <br />
        <h5 style={{ textAlign: "center", color: "black" }}>Your Tron Wallet <br />
          {this.props.walletload ? <img src={loader} alt="loading..." width="30px" style={{ paddingLeft: "10px" }} /> :
            <strong style={{ paddingLeft: "10px" }}>{this.props.account}</strong>}
        </h5>
        <h5 style={{ textAlign: "center", color: "black", paddingTop: "20px" }}>Your Balance   {this.props.balanceload ? <img src={loader} alt="loading..." width="30px" style={{ paddingLeft: "10px" }} /> :
          <strong style={{ paddingLeft: "10px", paddingRight: "10px" }}>{this.props.balance}</strong>}
        TRX</h5><br />
        <h5 style={{ textAlign: "center", color: "black", paddingTop: "20px" }}>   Your Referral Link </h5>
        <form style={{ textAlign: "center" }}>
          {this.props.trxDeposit >= this.props.plus1k ?
            <input style={{ textAlign: "center" }}
              ref={(textarea) => this.textArea = textarea}
              value={url1 + this.props.account}
            /> :
            <input style={{ textAlign: "center" }}
              ref={(textarea) => this.textArea = textarea}
              value="no link..."
            />
          }

        </form>
        {
          document.queryCommandSupported('copy') &&
          <div style={{ textAlign: "center" }} >
            <button style={{ textAlign: "center" }} className="btn btn-primary" onClick={this.copyToClipboard}>Copy</button>
            {this.state.copySuccess}
          </div>
        }



      </div >
    );
  }
}

export default Home;
