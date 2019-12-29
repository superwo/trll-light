import axios from 'axios';
import { USER_SERVER } from './misc';

export const loginUser = async userData => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const response = await axios.post(`${USER_SERVER}/login`, userData, config);
  return response.data;
};
export const registerUser = async userData => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const response = await axios.post(`${USER_SERVER}/signup`, userData, config);
  return response.data;
};
