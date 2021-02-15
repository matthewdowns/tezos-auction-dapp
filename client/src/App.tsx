import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import React, { useState } from 'react';

interface ContractBid {
    address: string;
    amount: number;
}

function DApp() {
    const [contractBalance, setContractBalance] = useState<number>();
    const [contractBids, setContractBids] = useState<ContractBid[]>();

    const tezos = new TezosToolkit(TEZOS_RPC);
    tezos.tz.getBalance(TEZOS_CONTRACT_ADDRESS).then(balance => setContractBalance(balance.toNumber() / 100000));

    return (
        <div>
            <h1>Tezos Auction DApp</h1>
            <h3>Contract address: {TEZOS_CONTRACT_ADDRESS}</h3>
            <h4>Current balance: {contractBalance}</h4>

            <div>
                <h3>Bids</h3>
                <ul>
                    {contractBids && contractBids.map(o => (
                        <li>
                            <h4>{o.address}</h4>
                            <h5>{o.amount}</h5>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default DApp;