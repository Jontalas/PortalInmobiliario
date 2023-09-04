import Axios from 'axios';

const propertyUrl = `${process.env.BASE_API_URL}/properties`;
export const getPropertyDetails = (id) =>
  Axios.get(`${propertyUrl}/${id}`).then(({ data }) => data);

const equipmentUrl = `${process.env.BASE_API_URL}/equipments`;
export const getEquipmentDetails = () =>
  Axios.get(equipmentUrl).then(({ data }) => data);
