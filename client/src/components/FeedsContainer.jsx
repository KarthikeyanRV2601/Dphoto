import React, {useState } from 'react';
import Feed from './Feed';
import loadingIcon from './Media/loading.svg';
import { create, urlSource  } from 'ipfs-http-client';
var FeedsContainer=({dphoto,account,photos,setisLoading})=>{
    var [desc,setDesc]=useState();
    var [isLoading,setisLoading]=useState(false);
    var [file,setFile]=useState();
    var [previewSrc,setpreviewSrc]=useState();
    const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
    
    

    function fetchPhotoData(){
        if(file)
        {
            
            const readerURL=new window.FileReader();
            readerURL.readAsDataURL(file)
            readerURL.onloadend=()=>{
                setpreviewSrc(readerURL.result);
            }
          
        
        }
    }
    

    async function handlePost(){
           
            if(previewSrc&&account)
            {
            const result = await ipfs.add(urlSource(previewSrc))
            let hashedCID=result.cid.toString();
            setisLoading(true);
            dphoto.methods.addNewPhotoEntry(hashedCID,desc).send({from:account}).on('transactionHash',(hash)=>{
                setisLoading(false);
            });
        
            }
        
    
    }
    
    
    return(
        <div className="FeedsContainer">
        {isLoading&&
            <div className="loading">
                <img src={loadingIcon} />
            </div>
        }{
            !isLoading&&
            <>
            <div className="uploadButton">
                {previewSrc&&<img src={previewSrc} alt="" className="prviewImage"/>}
                <label for="photoinput" onClick={fetchPhotoData()}>
                    upload photo    
                </label>

                <input 
                type="file" 
                id="photoinput" 
                style={{"visibility":"hidden"} } 
                accept=".jpg,.png,.jpeg,.svg"
                onChange={(e)=>{
                    setFile(e.target.files[0])
                }}/>

                <input type="text" 
                id="photodescription" 
                placeholder="Enter photo description" 
                onChange={(e)=>{
                    setDesc(e.target.value)
                }}/>

                <button className="postButton" onClick={e=>handlePost()}>
                    POST
                </button>
            </div>
            {photos.map((photo,key)=>{
                return(
                    <Feed
                    src={photo.hash}
                    description={photo.description}
                    author={photo.author}
                    tipper={account}
                    dphoto={dphoto}
                    id={photo.id}
                    previousTipAmount={photo.tipAmount}
                    setisLoading={setisLoading}
                    />
                )
            })}
            </>

        }
            
        </div>
    )
}

export default FeedsContainer;