import axios from 'axios';
import { USER_SERVER } from './misc';

export const loginUser = async userData => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await axios.post(`${USER_SERVER}/login`, userData, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const registerUser = async userData => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await axios.post(
      `${USER_SERVER}/register`,
      userData,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const authenticate = async () => {
  try {
    const response = await axios.get(`${USER_SERVER}/auth`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
