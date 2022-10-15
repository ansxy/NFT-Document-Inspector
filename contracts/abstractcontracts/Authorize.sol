// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;
abstract contract Authorize{
    struct account{
        bool isValid;
        uint8 role;
        // Role :
        // 1 SuperAdmin
        // 2 Admin
        // 3 user
    }

    mapping(address => account) public UsersAddress;
    
     // ===> new feat
    event AdminAdded(
        address indexed Caller,
        address indexed NewAdmin
    );

    event AdminDeactivated(
        address indexed Caller,
        address indexed RemovedAdmin
    );

    event Userdeactivated(
        address indexed Caller,
        address indexed RemovedUser
    );

    event UserAdded(
        address indexed Caller,
        address indexed newUser
    );
    // ===

    function addUser(address _address) public AdministratorOnly{
        require(UsersAddress[_address].role != 1 && UsersAddress[_address].role != 2 , "The Wallet Address must not admin or superadmin" );
        UsersAddress[_address].isValid = true;
        UsersAddress[_address].role = 3;
    }

    function deactivateUser(address _address) public AdministratorOnly{
        require(UsersAddress[_address].isValid,"User address not active");
        UsersAddress[_address].isValid = false;
    }

    function addAdmin(address _address) public SuperAdminOnly {
        require(!UsersAddress[_address].isValid,"address already admin active");
        UsersAddress[_address].isValid = true;
        UsersAddress[_address].role = 2;
        // new feat
        emit AdminAdded(msg.sender, _address);
    }

    function deactivateAdmin(address _address) public SuperAdminOnly {
        require(UsersAddress[_address].isValid,"Admin address not active");
        UsersAddress[_address].isValid = false;
        // new feat
        emit AdminDeactivated(msg.sender, _address);
    }

    function isSuperAdmin(address _address) public view returns(bool) {
        return UsersAddress[_address].role == 1 && UsersAddress[_address].isValid;
    }

    function isAdmin(address _address) public view returns(bool) {
        return UsersAddress[_address].role == 2 && UsersAddress[_address].isValid;
    }

    function isUser(address _address) public view returns(bool) {
        return UsersAddress[_address].role == 3 && UsersAddress[_address].isValid;
    }

    // === Modifier

    modifier DocumentOwnerOnly(address _address){
        require(
            (
                UsersAddress[msg.sender].role == 2 ||
                UsersAddress[msg.sender].role == 1 ||
                _address == msg.sender
            ) && UsersAddress[msg.sender].isValid,
            "You are not the document owner"
            );
        _;
    }

    modifier AdministratorOnly(){
        require((UsersAddress[msg.sender].role == 2 ||
        UsersAddress[msg.sender].role == 1) && UsersAddress[msg.sender].isValid,
        "Only admin and Superadmin can interact");
        _;
    }
    modifier SuperAdminOnly(){
        require(UsersAddress[msg.sender].role == 1 && UsersAddress[msg.sender].isValid,
        "Only Superadmin can interact");
        _;
    }
}
