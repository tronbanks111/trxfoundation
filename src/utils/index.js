const contractAddress = 'TYca9czpobfk9UyS4WJSuJ8UHBQuDpcsQm'

const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },

};

export default utils;