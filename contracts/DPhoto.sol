pragma solidity >=0.4.21 <0.7.0;

contract DPhoto{
    uint public photosCount=0;
    struct Photo{
        uint id;
        uint tipAmount;
        string hash;
        string description;
        address payable author;
    }

    event PhotoUploaded(
        uint id,
        uint tipAmount,
        string hash,
        string description,
        address payable author
    );

    event PhotoTipped(
        uint id,
        uint tipAmount,
        string hash,
        string description,
        address payable author
    );

    mapping(uint=>Photo) public photos;

   

    function addNewPhotoEntry(string memory _photoHash,string memory _photoDescription) public
    {
        
        require(bytes(_photoHash).length>0  && bytes(_photoDescription).length>0 && msg.sender!=address(0));
        photosCount++;
        photos[photosCount]=Photo(photosCount,0,_photoHash,_photoDescription,msg.sender);
        emit PhotoUploaded(photosCount,0, _photoHash, _photoDescription,msg.sender);
    }

    function tipPhotoAuthor(uint _id) public payable{

        require(_id>0 && _id<=photosCount);
        Photo memory _photo=photos[_id];
        address payable _author=_photo.author;
        address(_author).transfer(msg.value);
        _photo.tipAmount+=msg.value;
        photos[_id]=_photo;
        emit PhotoTipped(_id,_photo.tipAmount,_photo.hash,_photo.description,_photo.author);

    }

}