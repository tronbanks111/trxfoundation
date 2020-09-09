import React, { Component } from 'react'
import logo from "./img/logoblack.png";

import "./dist/css/style.css"

export class NewHome extends Component {
    render() {
        return (
            <div>
                <body className="is-boxed has-animations">
                    <div className="body-wrap boxed-containerbox">
                        <header className="site-header">
                            <div className="containerbox">
                                <div className="site-header-inner">
                                    <div className="brand header-brand">
                                        <h1 className="m-0">
                                            <a href="#">
                                                <img className="header-logo-image asset-light" src={require("./dist/images/logo-light.svg")} alt="Logo" />
                                                <img className="header-logo-image asset-dark" src={require("./dist/images/logo-dark.svg")} alt="Logo" />
                                            </a>
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </header>

                        <main>
                            <section className="hero">

                                <div className="containerbox" style={{ textAlign: "center" }} >
                                    <img src={logo} alt="Logo" width="520px" />

                                    <div className="hero-inner">
                                        <div className="row">
                                            <div className="col-md-6">

                                            </div>
                                            <div className="col-md-6"></div>
                                        </div>
                                        <div className="hero-copy">
                                            <h1 style={{ fontSize: "44px", color: "Grey" }} ><strong>Get 1% Daily</strong></h1><br />
                                            <h4 style={{ fontSize: "14px", color: "black" }} >
                                                <strong>100% Decentralized, Fully Verifed and Secured Smart Contract</strong>
                                            </h4><br />
                                            <h4 style={{ fontSize: "14px", color: "black" }} >
                                                <strong>Get 50% on return of your directs</strong>
                                            </h4><br />
                                            <a href={tronContracturl}>
                                                <button style={{
                                                    display: "inline - block",
                                                    textDecoration: "none",
                                                    background: "#ff8181",
                                                    color: "#FFF",
                                                    width: "120px",
                                                    height: "120px",
                                                    lineHeight: "120px",
                                                    borderRadius: "50%",
                                                    textAlign: "center",
                                                    fontWeight: " bold",
                                                    verticalAlign: "middle",
                                                    overflow: "hidden",
                                                    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.29)",
                                                    borderBottom: "solid 3px #bd6565",
                                                    backgroundImage: -"webkit-linear-gradient(#fed6e3 0%, #ffaaaa 100%)",
                                                    backgroundImage: "linear-gradient(#fed6e3 0%, #ffaaaa 100%)",

                                                    transition: ".4s",
                                                }} ><i className="fa fa-home" style={{ fontSize: "30px" }} ></i></button></a>

                                            <a href="https://t.me/trxfoundation_live">
                                                <button href="#" style={{
                                                    display: "inline - block",
                                                    textDecoration: "none",
                                                    background: "#ff8181",
                                                    color: "#FFF",
                                                    width: "120px",
                                                    height: "120px",
                                                    lineHeight: "120px",
                                                    borderRadius: "50%",
                                                    textAlign: "center",
                                                    fontWeight: " bold",
                                                    verticalAlign: "middle",
                                                    overflow: "hidden",
                                                    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.29)",
                                                    borderBottom: "solid 3px #bd6565",
                                                    backgroundImage: -"webkit-linear-gradient(#fed6e3 0%, #ffaaaa 100%)",
                                                    backgroundImage: "linear-gradient(#fed6e3 0%, #ffaaaa 100%)",

                                                    transition: ".4s",
                                                    marginLeft: "20px"
                                                }} ><i className="fa fa-home" style={{ fontSize: "30px" }} ></i></button></a>
                                        </div>
                                        <div className="hero-media">
                                            <div className="header-illustration">
                                                <img className="header-illustration-image asset-light"
                                                    src={require("./dist/images/header-illustration-light.svg")} alt="Header illustration" />
                                            </div>
                                            <div className="hero-media-illustration">
                                                <img className="hero-media-illustration-image asset-light"
                                                    src={require("./dist/images/hero-media-illustration-light.svg")} alt="Hero media illustration" />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </section>
                        </main>
                    </div>

                </body >
            </div >
        )
    }
}

export default NewHome
