import client from "./clinet";
const endpoint = "/Login?";
const getListings = () => client.get(endpoint);
export default {
  getListings,
};
