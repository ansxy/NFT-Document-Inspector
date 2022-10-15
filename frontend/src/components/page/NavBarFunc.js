import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "./ConnectWallet";
import NavLinks from "./NavLink";

export default function NavBarNew() {
  const [haveMetamask, setHaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  console.log(accountAddress);

  useEffect(() => {
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        setHaveMetamask(false);
      }
      setHaveMetamask(true);
    };
    checkMetamaskAvailability();
  }, []);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        setHaveMetamask(false);
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      let balance = await provider.getBalance(accounts[0]);
      let bal = ethers.utils.formatEther(balance);
      setAccountAddress(accounts[0]);
      setAccountBalance(bal);
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  };

  return (
    <>
      {haveMetamask ? (
        <nav className="bg-[-#0066FF]">
          <div className="flex items-center font-medium justify-around">
            <ul className="md:flex hidden uppercase items-center gap-44 px-5 rounded-b-2xl drop-shadow-lg bg-[#001577]">
              <Link to="/" className="py-7 px-3 inline-block text-cyan-50">
                Home
              </Link>
              {isConnected ? <></> : <></>}
              {isConnected ? (
                <NavLinks />
              ) : (
                <Button onClick={connectWallet()} />
              )}
            </ul>
          </div>
        </nav>
      ) : (
        <p>Please Install MataMask</p>
      )}
    </>
  );
}
