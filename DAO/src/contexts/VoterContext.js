import React ,{createContext} from "react";
import { useWeb3React } from "@web3-react/core";

import { getContract } from "../utils/contract";
import VoterAbi from "../constant/abi/Voter.json";

const initialState = {};

export const VoterContext = createContext(null);

export const VoterContextProvider = ({children}) => {

    const {library, account,chainId} = useWeb3React();

    const addVoter = async (payload) =>{
        const {name} = payload;
        const voter = getContract(library, VoterAbi.abi, "0x5FbDB2315678afecb367f032d93F642f64180aa3");
        let tx = await voter.methods.addVoter(name,account).send({from:account});
    }

    const approveVoter = async (payload) =>{
        const {voterAddress} = payload;
        const voter = getContract(library, VoterAbi.abi, "0x5FbDB2315678afecb367f032d93F642f64180aa3");
        let tx = await voter.methods.approveVoter(voterAddress).send({from:account});
    }

    return (
        <VoterContext.Provider value={{
            initialState:initialState,
            addVoter,
            approveVoter}}>
            {children}
            </VoterContext.Provider>
    )
}