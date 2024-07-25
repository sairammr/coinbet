/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";

import { useState } from "react";
import { useMetaMaskStore,useGarden,useSignStore } from "./store";
import { Assets } from "@gardenfi/orderbook";
import "./css/global.css";
import { useRouter } from 'next/router';

type AmountState = {
  btcAmount: string | null;
  wbtcAmount: string | null;
};

type SwapComponentProps = {
  address?: string | string[];
};

const SwapComponent: React.FC<SwapComponentProps> = ({ address }) => {
  const [amount, setAmount] = useState<AmountState>({
    btcAmount: null,
    wbtcAmount: null,
  });

  const changeAmount = (of: "WBTC" | "BTC", value: string) => {
    if (of === "WBTC") {
      handleWBTCChange(value);
    }
  };

  const handleWBTCChange = (value: string) => {
    const newAmount: AmountState = { wbtcAmount: value, btcAmount: null };
    if (Number(value) > 0) {
      const btcAmount = (1 - 0.3 / 100) * Number(value);
      newAmount.btcAmount = btcAmount.toFixed(8).toString();
    }
    setAmount(newAmount);
  };

  return (
    <div className="swap-component">
      <WalletConnect />
      <SwapAmount amount={amount} changeAmount={changeAmount} address={address} />
      <Swap amount={amount} changeAmount={changeAmount}  />
    </div>
  );
};

const WalletConnect: React.FC = () => {
  const { connectMetaMask, metaMaskIsConnected } = useMetaMaskStore();

  return (
    <div className="swap-component-top-section">
      <span className="swap-title">Place your betting amount</span>
      <MetaMaskButton
        
        isConnected={metaMaskIsConnected}
        onClick={connectMetaMask}
      />
    </div>
  );
};

type MetaMaskButtonProps = {
  isConnected: boolean;
  onClick: () => void;
};

const MetaMaskButton: React.FC<MetaMaskButtonProps> = ({
  isConnected,
  onClick,
}) => {
  const buttonClass = `connect-metamask button-${
    isConnected ? "black" : "white"
  }`;
  const buttonText = isConnected ? "Connected" : "Connect Metamask";

  return (
    <button className={buttonClass} onClick={onClick}>
      <img src="/assets/MetaMask_Fox.svg" className="fox-logo" alt="" />{buttonText}
    </button>
  );
};

type TransactionAmountComponentProps = {
  amount: AmountState;
  changeAmount: (of: "WBTC" | "BTC", value: string) => void;
  address?: string | string[];
};

const SwapAmount: React.FC<TransactionAmountComponentProps> = ({
  amount,
  changeAmount,
  address
}) => {
  const { wbtcAmount, btcAmount } = amount;

  return (
    <div className="swap-component-middle-section">
      <InputField
        id="wbtc"
        label="Contribute WBTC"
        
            value={address ? address.toString() : ""}
            readOnly
      />
    </div>
  );
};

type InputFieldProps = {
  id: string;
  label: string;
  value: string | null;
  readOnly?: boolean;
  onChange?: (value: string) => void;
};

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  readOnly,
  onChange,
}) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <div className="input-component">
      <input
        id={id}
        placeholder="0"
        value={value ? value : ""}
        type="number"
        readOnly={readOnly}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
      <button>{id.toUpperCase()}</button>
    </div>
  </div>
);

type SwapAndAddressComponentProps = {
  amount: AmountState;
  changeAmount: (of: "WBTC" | "BTC", value: string) => void;
  address?: string | string[];
};

const Swap: React.FC<SwapAndAddressComponentProps> = ({
  amount,
  changeAmount,
  address,
}) => {
  const { garden, bitcoin } = useGarden();
  const { metaMaskIsConnected } = useMetaMaskStore();
  const { wbtcAmount, btcAmount } = amount;

  const { isSigned } = useSignStore();
  const router = useRouter();
  const handleSwap = async () => {
    router.push( {pathname: '/result',
      query: { result: address}})
    if (
      !garden ||
      typeof Number(wbtcAmount) !== "number" ||
      typeof Number(btcAmount) !== "number"
    )
      return;

    console.log(Assets.bitcoin_regtest.BTC);
    const sendAmount = Number(wbtcAmount) * 1e8;
    const recieveAmount = Number(btcAmount) * 1e8;

    console.log(Assets.bitcoin_regtest.BTC);
    changeAmount("WBTC", "");
    try {
      await garden.swap(
        Assets.ethereum_localnet.WBTC,
        Assets.bitcoin_regtest.BTC,
        sendAmount,
        recieveAmount,
      );
    } catch (error) {
      window.alert('Enter valid BTC value!');

    }
  };

  return (
    <div className="swap-component-bottom-section">
      <div className="none-block">
        <label htmlFor="receive-address">Receive address</label>
        <div className="input-component">
          <input
            id="receive-address"
            placeholder="Enter BTC Address"
            value={address ? address.toString() : ""}
            readOnly
          />
        </div>
      </div>
      
      <button
      
        className={`button-${metaMaskIsConnected ? "white" : "black"}`}
        onClick={handleSwap}
      >
        Pay
      </button>
     
    </div>
  );
};

export default SwapComponent;
