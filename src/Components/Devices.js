import React, { useEffect, useState } from "react";

import '../styles/Devices.css';

import { Accordion, Button } from "react-bootstrap";
import api from '../api/index.js';

const Devices = (props) => {

  const [thermoMeters, setThermoMeters] = useState([]);
  const [pulseOxiMeters, setPulseOxiMeters] = useState([]);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    api.getThermometers().then(result => {
      let newThermometers = [];
      for (const [key, value] of Object.entries(result.data)) {
        if (key === "success") continue;
        newThermometers.push({
          id: value[0],
          time: value[2]
        });
      }
      setThermoMeters(newThermometers);
    });
    api.getPulseOximeters().then(result => {
      let newPulseOximeters = [];
      for (const [key, value] of Object.entries(result.data)) {
        if (key === "success") continue;
        newPulseOximeters.push({
          id: value[0],
          time: value[4]
        });
      }
      setPulseOxiMeters(newPulseOximeters);
    });
  }

  const getDateByString = (seconds) => {
    const event = new Date(parseInt(seconds));
    return event.toTimeString();
  }

  return (
    <div className="devices">
      <h2 className="devices-header">Available Devices</h2>
      <Button variant="info" onClick={refresh}
        className="devices-refresh">Refresh</Button>
      <div className="devices-accordion">
        <Accordion defaultActiveKey={['0']} alwaysOpen>
          {thermoMeters && thermoMeters.map((thermometer, index) => (
            <Accordion.Item eventKey={`${index}`} key={`thermo-${index}`}>
              <Accordion.Header>Thermometer {`${thermometer.id}`}</Accordion.Header>
              <Accordion.Body className="devices-accordion-body">
                <span><h4>id:</h4> {`${thermometer.id}`}</span>
                <span><h4>time: </h4> {`${getDateByString(thermometer.time)}`}</span>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
        <div style={{
          width: '100%',
          height: '32px'
        }}></div>
        <Accordion alwaysOpen>
          {pulseOxiMeters && pulseOxiMeters.map((pulseoximeter, index) => (
            <Accordion.Item eventKey={`${index}`} key={`pulse-${index}`}>
              <Accordion.Header>PulseOxiMeter {`${pulseoximeter.id}`}</Accordion.Header>
              <Accordion.Body className="devices-accordion-body">
                <span><h4>id:</h4> {`${pulseoximeter.id}`}</span>
                <span><h4>time: </h4> {`${getDateByString(pulseoximeter.time)}`}</span>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

export default Devices;