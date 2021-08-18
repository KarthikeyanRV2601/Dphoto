import React, {useState,useEffect } from "react";
import getWeb3 from "./getWeb3";
import './components/Styles/style.css'
import Navbar from './components/Navbar';
import ProfileTab from './components/ProfileTab';
import FeedsContainer from './components/FeedsContainer';
import DPhoto from './contracts/DPhoto.json';
import Web3 from 'web3';
var App=()=>{


  var [account,setAccount]=useState();
  var [dphoto,setDphoto]=useState();
  var [photos,setPhotos]=useState([]);
  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, [])
  

  async function loadWeb3() {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
      }
      else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
      }
      else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }
    }
  
  async function loadBlockchainData() {
      const web3 = window.web3;
      const accounts=await web3.eth.getAccounts();
      setAccount(accounts[0])
      const balanceInstance=await web3.eth.getBalance(accounts[0])
      console.log({balanceInstance})
      const networkId=await web3.eth.net.getId();
      const networkData =DPhoto.networks[networkId];
      if(networkData){
      const dphotoInstance=new web3.eth.Contract(DPhoto.abi,networkData.address)
      setDphoto(dphotoInstance);
      const count=await dphotoInstance.methods.photosCount().call();
      for(let i=count;i>=1;--i)
      {
        const photo=await dphotoInstance.methods.photos(i).call();
        photos.push(photo)
        setPhotos([...photos]);
      }
     
      
    }
      else{
        window.alert('the contract has not been deployed yet');
      }
    }

  





  return(
    <body>
      <Navbar 
      account={account}/>
      <div class="mainPage">
          <ProfileTab
          />
          <FeedsContainer 
          account={account}
          dphoto={dphoto}
          photos={photos}
          />
      </div>
    </body>
  )
}

export default App;