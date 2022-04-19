import React, { useEffect, useState } from "react";

import '../styles/Patients.css';

import { Accordion, Button, Table } from "react-bootstrap";
import api from '../api/index.js';

const Patients = (props) => {

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    api.getPatients().then(async (result) => {
      let newPatients = [];
      for (const [key, value] of Object.entries(result.data)) {
        if (key === "success") continue;

        await api.getPatient(value).then(result => {
          if (result.data["success"]) {
            newPatients.push({
              id: result.data.patientId,
              t: result.data.t,
              p: result.data.p
            })
          }
        });

      }
      setPatients(newPatients);
    });
  }

  const getDateByString = (seconds) => {
    const event = new Date(parseInt(seconds));
    return event.toTimeString();
  }

  return (
    <div className="patients">
      <h2 className="patients-header">Patients</h2>
      <Button variant="info" onClick={refresh}
        className="patients-refresh">Refresh</Button>
      <div className="patients-accordion">
        <Accordion defaultActiveKey={['0']} alwaysOpen>
          {patients && patients.map((patient, index) => (
            <Accordion.Item eventKey={`${index}`} key={`patient-${index}`}>
              <Accordion.Header>Patient {`${patient.id}`}</Accordion.Header>
              <Accordion.Body className="patients-accordion-body">
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>#Thermometer Id</th>
                      <th>Reading</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patient.t && patient.t.map((temp) => (
                      <tr>
                        <td>{temp[0]}</td>
                        <td>{temp[1]}</td>
                        <td>{getDateByString(temp[2]).slice(0, 12)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div style={{
                  width: '32px', height: '100%'
                }}></div>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>#PulseOxiMeter Id</th>
                      <th>Heart Rate</th>
                      <th>Systolic BP</th>
                      <th>Diastolic BP</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patient.p && patient.p.map((pulse) => (
                      <tr>
                        <td>{pulse[0]}</td>
                        <td>{pulse[1]}</td>
                        <td>{pulse[2]}</td>
                        <td>{pulse[3]}</td>
                        <td>{getDateByString(pulse[4]).slice(0, 12)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

export default Patients;