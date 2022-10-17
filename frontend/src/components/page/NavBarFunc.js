import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./ConnectWallet";

export default function NavBarNew() {
  const [haveMetamask, setHaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const links = [
    { name: "Form KTP", url: "/formktp" },
    { name: "Form Sertikat Tanah", url: "/formsertifikattanah" },
    { name: "Form Validator ", url: "/formvalidator" },
  ];
  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(window.ethereum);

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
      setAccountAddress(accounts[0]);
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  };

  const HARDHAT_NETWORK_ID = "1337";

  const checkNetwork = () => {
    if (window.ethereum.networkVersion === HARDHAT_NETWORK_ID) {
      return true;
    }
    alert("Please Connect To Hardhat LocalHost Network");
    return false;
  };

  return (
    <>
      {haveMetamask ? (
        <nav className="flex items-center font-medium justify-around">
          <ul className="md:flex hidden uppercase items-center gap-44 px-5 rounded-b-2xl drop-shadow-lg bg-navbar">
            <Link to="/" className="py-7 px-3 inline-block text-white">
              Home
            </Link>
            {isConnected ? <></> : <></>}
            {isConnected ? (
              <>
                {links.map((links) => (
                  <li key={links.name} className="text-white">
                    <Link to={links.url}>{links.name}</Link>
                  </li>
                ))}
              </>
            ) : (
              <Button onClick={connectWallet()} />
            )}
          </ul>
        </nav>
      ) : (
        <p>Please Install MataMask</p>
      )}
    </>
  );
}
