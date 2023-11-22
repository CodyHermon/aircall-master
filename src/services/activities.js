import axios from 'axios';

// const CORSUrl = 'https://charming-bat-singlet.cyclic.app/';
const baseUrl = 'https://cerulean-marlin-wig.cyclic.app';

const getAllActivities = async () => {
  try {
    const res = await axios.get(`${baseUrl}/activities`);
    return res.data;
  } catch (error) {
    console.error('Error fetching activities');
    throw error;
  }
};

const getSpecificCallDetails = async (id) => {
  try {
    const res = await axios.get(`${baseUrl}/activities/${id}`);

    return res.data;
  } catch (error) {
    console.error('Error fetching activity');
    throw error;
  }
};

const archiveCall = async (id, newObject) => {
  try {
    const res = await axios.patch(`${baseUrl}/activities/${id}`, newObject);

    return res.data;
  } catch (error) {
    console.error('Error fetching activity');
    throw error;
  }
};

const resetAllCalls = async () => {
  try {
    const res = await axios.patch(`${baseUrl}/reset`);
    return res.data;
  } catch (error) {
    console.error('Error resetting');
    throw error;
  }
};

export default {
  getAllActivities,
  getSpecificCallDetails,
  archiveCall,
  resetAllCalls,
};
