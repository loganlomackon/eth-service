pragma solidity >=0.4.22 <0.7.0;

/**
 * @title Storage
 * @dev Store & retreive value in a variable
 */
contract StorageIotOnChain {
    struct SensorData {
        bytes32 recordedAt;
        bytes32 hashedData;
    }

    address public owner;
    mapping(bytes32 => SensorData[]) public dataMap;

    uint8 public testNum;

    constructor() public {
        owner = msg.sender;
        testNum = 0;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function setter(uint8 input) public onlyOwner {
        testNum = input;
    }

    function getter() public view returns (uint8 result) {
        result = testNum;
    }

    function push(
        bytes32 sensorId,
        bytes32 recordedAt,
        bytes32 hashedData
    ) public onlyOwner {
        SensorData[] storage array = dataMap[sensorId];
        SensorData memory data = SensorData(recordedAt, hashedData);

        array.push(data);
    }

    function getRecent(bytes32 sensorId)
        public
        view
        returns (bytes32[] memory resRecordedAt, bytes32[] memory resHashedData)
    {
        uint256 resLength = 10;
        SensorData[] storage array = dataMap[sensorId];

        if (array.length == 0) {
            return (new bytes32[](0), new bytes32[](0));
        } else if (array.length <= resLength) {
            resLength = array.length;
        }

        bytes32[] memory recordedAt = new bytes32[](resLength);
        bytes32[] memory hashedData = new bytes32[](resLength);
        uint8 count = 0;
        for (uint256 i = array.length - resLength; i < array.length; i++) {
            recordedAt[count] = array[i].recordedAt;
            hashedData[count] = array[i].hashedData;

            count++;
        }

        resRecordedAt = recordedAt;
        resHashedData = hashedData;
    }

    function getHashedData(bytes32 sensorId, bytes32 recordedAt)
        public
        view
        returns (bytes32 hashedData)
    {
        hashedData = 0;
        SensorData[] storage array = dataMap[sensorId];

        for (uint256 i = 0; i < array.length; i++) {
            if (array[i].recordedAt == recordedAt) {
                hashedData = array[i].hashedData;
                break;
            }
        }
    }

    function getRecentFromString(string memory sensorId)
        public
        view
        returns (bytes32[] memory resRecordedAt, bytes32[] memory resHashedData)
    {
        (resRecordedAt, resHashedData) = getRecent(stringToBytes32(sensorId));
    }

    // function pushFromString(string sensorId, string recordedAt, string hashedData) onlyOwner public {
    //     push(stringToBytes32(sensorId), stringToBytes32(recordedAt), stringToBytes32(hashedData));
    // }

    function stringToBytes32(string memory input)
        public
        pure
        returns (bytes32 result)
    {
        bytes memory tempInput = bytes(input);
        if (tempInput.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(tempInput, 32))
        }
    }
}
