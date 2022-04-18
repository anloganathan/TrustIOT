import axios from 'axios';
import qs from 'qs';

const api = axios.create({
  baseURL: 'http://localhost:3000/'
})

export const getPatient = (patientId) => {
  // var formData = new FormData();
  // formData.append("pid", patientId);
  // return api.get("/getPatientReadings", formData);

  // return api.get("/getPatientReadings", {
  //   data: qs.stringify({
  //     "pid": patientId
  //   })
  // });

  return api.get(`/getPatientReadings/${patientId}`);
}

export const getPatients = () => {
  return api.get("/listOfPatients");
}

export const getThermometers = () => {
  return api.get("/listOfThermometers");
}

export const getPulseOximeters = () => {
  return api.get("/listOfPulseOximeters");
}

const apis = {
  getPatient,
  getPatients,
  getThermometers,
  getPulseOximeters
}

export default apis;