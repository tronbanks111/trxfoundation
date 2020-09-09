import React, { Component } from "react";

import logo from "./img/logoblack.png";
import telegram from "./img/telegram.png";
import back2 from "./img/back1.jpg"
import loader from "./img/loadicon1.gif"
import side from "./img/illustration-13.png"

const FOUNDATION_ADDRESS = 'TE5qNun6wsmGR58ygEE5yA963Jse6AYNqe';
let url1 = "https://trxfoundation.live/";
// let url1 = "http://localhost:3000/"
let contracturl = "https://tronscan.org/#/contract/" + FOUNDATION_ADDRESS;

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

                                <div className="containerbox" style={{ textAlign: "left", paddingTop: "30px", paddingLeft: "30px" }} > <h3 style={{ textAlign: "left", color: "black", paddingTop: "60px", overflow: "hidden" }}><strong>About Us </strong></h3><br />

                                    <div className="hero-inner">
                                        <div className="row" style={{ paddingLeft: "30px", fontSize: "17px" }}>
                                            <h4> </h4>
                                            <h5> TRX Foundation is a community driven funding project which aims to offer 1% daily returns upto 200% and also offers 50% on ROI profits from your direct partners.
                                            TRX Foundation does not have a owner. It is 100% decentralized.
</h5>
                                        </div><br />
                                        <div className="row" style={{ paddingLeft: "30px", fontSize: "17px" }}>
                                            <h4 style={{ color: "black" }}> What is TRON ?</h4>
                                            <h5 style={{ paddingTop: "12px" }}>TRON (TRX) is one of the leading cryptocurrency established in 2017. Tron blockchain is used by major players in the market and has huge community support for future developments. </h5>
                                        </div>
                                        <br />
                                        <div className="row" style={{ paddingLeft: "30px", fontSize: "17px" }}>
                                            <h4 style={{ color: "black" }}> What is Smart Contract and its Advantages ?</h4>
                                            <h5 style={{ paddingTop: "12px" }}>Smart contract is an algorithm which is used to communicate with blockchains to do a particular assigned work automatically forever. In our case we believe that TRON is the best crypto currency available in the market to do this work. </h5>
                                        </div><br />
                                        <div className="row" style={{ paddingLeft: "30px", fontSize: "17px" }}>
                                            <h4 style={{ color: "black" }}> What does Contract Verification means ?</h4>
                                            <h5 style={{ paddingTop: "12px" }}> Contract verification is a step towards 100% transparency of the source code to our clients, it ensures that each and every client is comfortable before putting their hard earned money into the system. </h5>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </main>
                    </div>

                </body >

            </div >
        );
    }
}

export default Home;
