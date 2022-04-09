pragma solidity >=0.5.0 <0.9.0;

contract Records{
    struct Thermometer{
        address thermometerAddress;
        uint8 readingsInCelsius;
        address patientAddress;
    }

    mapping(address=>Thermometer) public thermoReadings;

    function pushReadings(uint8 readingsInCelsius,address patientAddress) public returns( uint8 ){
        thermoReadings[patientAddress].thermometerAddress=msg.sender;
        thermoReadings[patientAddress].readingsInCelsius=readingsInCelsius;
        thermoReadings[patientAddress].patientAddress=patientAddress;
        return 14;
    }
    
    function getReadings(address patientAddress) public view returns ( uint8 ) {
        return thermoReadings[patientAddress].readingsInCelsius;
    }

}