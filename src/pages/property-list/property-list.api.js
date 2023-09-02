import Axios from 'axios';
const url = `${process.env.BASE_API_URL}/properties`;
export const getPropertyList = () => Axios.get(url).then(({ data }) => data);