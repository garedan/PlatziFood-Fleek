import "../styles/globals.css";
import styles from '../styles/Home.module.css';
import Link from "next/link";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

function MyApp({ Component, pageProps }) {

  const [walletAccount, setWalletAccount] = useState("");
  const [isConnectedToSepolia, setIsConnectedToSepolia] = useState(true);

  const checkIfMetamaskIsConnected = async () => {
    const { ethereum } = window;

    if(!ethereum) {
      console.log("Check ig Metamask is installed");
    } else {
      console.log("Metamask is installed");

      ethereum.on("chainChanged", function(networkId) {
        if(parseInt(networkId) !== 0xaa36a7) {
          setIsConnectedToSepolia(false);
        }else {
          setIsConnectedToSepolia(true);
        }
      });
    }
    
    const accounts = await ethereum.request({
      method: "eth_accounts",
    });

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    if(accounts.length != 0) {
      setWalletAccount(accounts[0]);
    }else {
      console.log("No authorized account");
    }
      
    
  }

  useEffect(() => {
    checkIfMetamaskIsConnected();
    //connectMetamask();
  }, []);

  const connectMetamask = async () => {
    try {
      const { ethereum } = window;
      if(!ethereum) {
        alert("Get Metamask");
        return;
      } 

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts[0]);
      setWalletAccount(accounts[0]);

    } catch (error) {
      console.log(error);
    }

  }


  return (
    <div>
      {!isConnectedToSepolia && (
        <div className={styles.container}>
          <div className={styles.wrongNetwork}>
            <h1>Red Equivocada</h1>
            <p>
              {""}
              Por favor conectarse a la red Sepolia en su Metamask. Gracias.
            </p>
          </div>
        </div>
      )}
      {(!walletAccount) && (
        <div className={styles.container}>
          <button className={styles.eth_connect_wallet_button} onClick={connectMetamask} >
            Log In
          </button>
        </div>
      )}

      {(walletAccount && isConnectedToSepolia) && (
        <div>
          <main>
            <nav className="border-b p-6">
              <p className="text-4xl font-bold">Platzi Eaters</p>
              <div className="flex mt-4">
                <Link href="/">
                  <a className="mr-4 text-pink-500">Inicio</a>
                </Link>
                <Link href="/add-dish">
                  <a className="mr-6 text-pink-500">Agregar platillos</a>
                </Link>
                <Link href="/my-dishes">
                  <a className="mr-6 text-pink-500">Mis platillos</a>
                </Link>
              </div>
            </nav>
          </main>
          <Component {...pageProps} />
        </div>
      )}
    </div>  
  );
}

export default MyApp;
