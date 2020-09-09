import React, { Component } from 'react'

class ChangeAdmin extends Component {
    render() {
        return (
            <div >
                <div className="col-xl-5" style={{
                    animation: "animated - border 1.5s infinite",
                    fontSize: "18px", lineHeight: "30px", fontWeight: "bold", color: "white", borderRadius: "20px", borderSpacing: "15px", padding: "15px", background: "#1A246C", marginTop: "10px", marginLeft: "10px", marginRight: "10px", opacity: "80%", width: "500px",
                    background: "linear-gradient(to right, #c31432, #240b36 )"

                }}>
                    {this.props.account === this.props.owner ?

                        <form
                            onSubmit={(event) => {

                                event.preventDefault();
                                const owner = this.owner.value;
                                this.props.changeOwner(owner);

                            }}
                        >

                            <input className=" " type="text"
                                id="owner"
                                ref={(input) => {
                                    this.owner = input;
                                }}
                                style={{
                                    background: "none", border: "none",
                                    borderBottom: "1px solid #153772", color: "White", paddingTop: "10px", textAlign: "center"
                                }}
                                placeholder="New Owner"

                                required />

                            <br />

                            <button style={{

                                display: "inline-block",
                                padding: "7px 20px",
                                borderRadius: "25px",
                                textDecoration: "none",
                                color: "#FFF",

                                backgroundImage: "linear-gradient(45deg, #473f28 0%, #ff8b5f 100%)",
                                transition: ".4s",

                            }} type="submit">Change Owner</button>
                            <p style={{ color: "white" }}>{this.props.owner}</p>

                            <div style={{ paddingBottom: "50px" }}></div>

                        </form>

                        : null
                    }

                    {this.props.account === this.props.manager ?
                        <form
                            onSubmit={(event) => {

                                event.preventDefault();
                                const manager = this.manager.value;
                                this.props.changeManager(manager);

                            }}
                        >
                            <input className=" " type="text"
                                id="manager"
                                ref={(input) => {
                                    this.manager = input;
                                }}
                                style={{
                                    background: "none", border: "none",
                                    borderBottom: "1px solid #153772", color: "White", paddingTop: "10px", marginLeft: "13px"
                                }}
                                placeholder="New Manager"

                                required />

                            <br />
                            <br />

                            <button style={{

                                display: "inline-block",
                                padding: "7px 20px",
                                borderRadius: "25px",
                                textDecoration: "none",
                                color: "#FFF",

                                backgroundImage: "linear-gradient(45deg, #473f28 40%, #ff8b5f 100%)",
                                transition: ".4s",

                            }} type="submit">Change Manager</button>
                            <p style={{ color: "white" }}>{this.props.manager}</p>

                            <div style={{ paddingBottom: "50px" }}></div>

                        </form>
                        : null}
                </div>
            </div>

        )
    }
}

export default ChangeAdmin
