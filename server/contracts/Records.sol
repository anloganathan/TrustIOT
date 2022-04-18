// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;
pragma experimental ABIEncoderV2;


contract Records{
    address public owner;

    constructor() public {
        owner =msg.sender;
    }

   uint256 thermoId=1;
    uint256 pulseOxiId=1;
    uint256 patientId=1;

    struct Patient{
        uint256 patientId;
        Thermometer[] t;
        PulseOximeter[] p;
    }

    mapping(uint256=>Patient) public patient_details;

    uint256[] public patient_list;

    function addPatient() public returns(bool){
        Patient storage p=patient_details[patientId];
        p.patientId=patientId;
        p.t.push(Thermometer(0,0,block.timestamp));
        p.p.push(PulseOximeter(0,0,0,0,block.timestamp));
        patient_list.push(patientId);
        patientId++;
        return true;
    }

    struct Thermometer{
        uint256 thermoId;
        uint256 readingsInCelsius;
        uint256 timestamp;
    }

    Thermometer[] public thermometer_list;
    Thermometer private thermo;

    mapping(uint256=>Thermometer[]) thermoReadings;

    function addThermometer() public returns(bool){
        thermo=Thermometer(thermoId,0,block.timestamp);
        thermoId++;
        thermometer_list.push(thermo);
        return true;
    }

    function thermoExist(uint256 id) internal returns(bool){
        uint256 len=thermometer_list.length;
        return id<=len;
    }

    function patientExist(uint256 id) internal returns(bool){
        uint256 len=patient_list.length;
        return id<=len;
    }

    function pulseOxiExist(uint256 id) internal returns(bool){
        uint256 len=pulseoxi_list.length;
        return id<=len;
    }

    struct PulseOximeter{
        uint256 pulseOxiId;
        uint32 HeartRate;
        uint32 bp_systolic;
        uint32 bp_diastolic;
        uint256 timestamp;
    }
    
    PulseOximeter[] public pulseoxi_list;
    PulseOximeter private pulse;

    mapping(uint256=>PulseOximeter[]) pulseReadings;

    function addPulseOxi() public returns(bool) {
        pulse=PulseOximeter(pulseOxiId,0,0,0,block.timestamp);
        pulseOxiId++;
        pulseoxi_list.push(pulse);
        return true;
    }


    function pushThermoReadings(uint256 id,uint256 readings,uint256 pid) public returns( bool ){
        require(thermoExist(id),"No such device exists!");
        require(patientExist(pid),"No Such Patient Exist!");
        thermo=Thermometer(id,readings,block.timestamp);
        patient_details[pid].t.push(thermo);
        return true;
    }
    
    function pushPulseReadings(uint256 id,uint32 hr,uint32 bp_sys,uint32 bp_dia,uint256 pid) public returns( bool ){
        require(pulseOxiExist(id),"No such device exists");
        require(patientExist(pid),"No Such Patient Exist!");
        pulse=PulseOximeter(id,hr,bp_sys,bp_dia,block.timestamp);
        patient_details[pid].p.push(pulse);
        return true;
    }

   function getListOfPatients() public view returns(uint256[] memory){
       require(patient_list.length>0,"No Patients yet!");
       return patient_list;
   }

   function getThermometerList() public view returns(Thermometer[] memory){
       require(thermometer_list.length>0,"No Therometers in the hospital!");
       return thermometer_list;
   }

   function getPulseOxiList() public view returns(PulseOximeter[] memory){
       require(pulseoxi_list.length>0,"No PulseOximeters in the hospital!");
       return pulseoxi_list;
   }

    function getPatientDetails(uint256 pid) public view returns(Patient memory){
        return patient_details[pid];
    }
}