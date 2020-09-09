import React from 'react';

import TronLinkLogo from './TronLinkLogo.png';
import './TronLinkGuide.scss';

const WEBSTORE_URL = 'https://chrome.google.com/webstore/detail/ibnejdfjmmkpcnlpebklmnkoeoihofec/';

const logo = (
    <div className='logo'>
    </div>
);

const openTronLink = () => {
    window.open(WEBSTORE_URL, '_blank');
};

const TronLinkGuide = props => {
    const {
        installed = false
    } = props;

    if (!installed) {
        return (
            <div className='tronLink' onClick={openTronLink}>
                <div className='info'>
                    <h1>TronWeb Connection Required</h1>
                    <p>
                        <strong>To continue using this site, please ensure you have downloaded Token Pocket or Tron Wallet or Math wallet for Mobile Phones <br /> OR <br />Tron Link google chrome extension for PC </strong>  </p>
                </div>

            </div>
        );
    }

    return (
        <div className='tronLink hover' onClick={openTronLink}>
            <div className='info'>
                <h1>Log in Required</h1>
                <p>
                    TronLink is installed but you must first log in. Open TronLink from the browser bar and set up your
                    first wallet or decrypt a previously-created wallet.
                </p>
            </div>
            {logo}
        </div>
    );
};

export default TronLinkGuide;