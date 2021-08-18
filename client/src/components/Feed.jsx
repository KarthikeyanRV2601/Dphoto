import React, {  useState } from 'react';
import Identicon from 'identicon.js';
import ethIcon from './Media/ethereum-eth.svg';
import Web3 from 'web3';
var Feed=({id,src,description,author,tipper,dphoto,setisLoading,previousTipAmount})=>{
    const [tipAmount,settipAmount]=useState('0.1');
    
    async function sendTip()
    {
        setisLoading(true);
        let tipStatus=await dphoto.methods.tipPhotoAuthor(id).send({from:tipper,value:Web3.utils.toWei(tipAmount,'ether')}).on('transactionHash',(hash)=>{
            setisLoading(false);
        });
    }
    
    return(
        <div className="feed">
                <div className="profileDetails">
                    <img 
                    src={`data:image/png;base64,${new Identicon(author,30).toString()}`}
                    alt="profilepicture" 
                    className="dp"/>
                    <div className="name">
                        ben
                    </div>
                </div>
                <img src={`https://ipfs.infura.io/ipfs/${src}`} alt=""/>
                <div className="description">
                    {description}
                </div>
                <div className="bottomTrail">
                    <p>{Web3.utils.fromWei(previousTipAmount, "ether") + " ETH"} ether</p>
                    <div className="wrap">
                        <select 
                        name="tip amount" 
                        id="tipAmountSelect"
                        onChange={(e)=>{
                            settipAmount(e.target.value);
                        }}
                        >
                            <option value="0.1">0.1 ether</option>
                            <option value="0.5">0.5 ether</option>
                            <option value="1">1 ether</option>
                            <option value="10">10 ether</option>
                        </select>
                        <img
                        src={ethIcon}
                        onClick={
                        ()=>{
                            sendTip();
                        }
                        }
                        >
                        </img>
                    </div>
                    
                    
                </div>
        </div>
    )
}
export default Feed;