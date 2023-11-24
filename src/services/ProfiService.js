import Web3 from 'web3';
import abi from './abi.json';

class ProfiService {
    web3 =  new Web3('http://localhost:8545');
    contractAddress = "0x253652de6C7c6814601cB3b9C8f4D32fcd97A100";
    contract = new this.web3.eth.Contract(abi, this.contractAddress);

    updatePhase = async (sender) => {
        return await this.contract.methods.updatePhase().send({from: sender});
    };

    signIn = async (login, password) => {
        return await this.contract.methods.signIn(login, password).call();
    };

    signUp = async (wallet, login, password) => {
        await this.contract.methods.signUp(login, password).send({from: wallet});
    };

    getBalance = async (wallet) => {
        return await this.contract.methods.getBalance(wallet).call();
    };

    getTime = async () => {
        return await this.contract.methods.getTime().call();
    };

    getTokenPrice = async () => {
        return await this.contract.methods.getTokenPrice().call();
    };

    getTransactionLimit = async () => {
        return await this.contract.methods.getTransactionLimit().call();
    };

    getRequestList = async (sender) => {
        return await this.contract.methods.getRequestList().call({from: sender});
    };

    getWhitelist = async (sender) => {
        return await this.contract.methods.getWhitelist().call({from: sender});
    };

    requestWhitelist = async (sender) => {
        await this.contract.methods.requestWhitelist().send({from: sender});
    };

    addMinute = async (sender) => {
        await this.contract.methods.addMinute().send({from: sender});
    };

    processRequest = async (sender, requestIndex, isConfirm) => {
        await this.contract.methods.processRequestWhitelist(requestIndex, isConfirm).send({from: sender});
    };

    transferToken = async (sender, to, amount, tokenType) => {
        await this.contract.methods.transferToken(to, amount, tokenType).send({from: sender});
    };

    buyToken = async (sender, amount, value) => {
        await this.contract.methods.buyToken(amount).send({from: sender, value: value});
    };

    changeTokenPrice = async (sender, price) => {
        await this.contract.methods.changeTokenPrice(price).send({from: sender});
    };

    sendReward = async (sender, to, amount) => {
        await this.contract.methods.sendReward(to, amount).send({from: sender});
    };
}

export default new ProfiService();