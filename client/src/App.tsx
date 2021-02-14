import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import React, { useState } from 'react';

function DApp() {
    const [contractBalance, setContractBalance] = useState<number>();

    const tezos = new TezosToolkit(TEZOS_RPC);
    tezos.tz.getBalance(TEZOS_CONTRACT_ADDRESS).then(balance => setContractBalance(balance.toNumber() / 100000));

    return (
        <div>
            <h1>Tezos Auction DApp</h1>
            <h3>Contract address: {TEZOS_CONTRACT_ADDRESS}</h3>
            <h4>Current balance: {contractBalance}</h4>
        </div>
    );
}

export default DApp;