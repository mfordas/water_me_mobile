import axios from 'axios';

import {TYPES} from './types';
import setHeaders from '../Utils/setHeaders';
import {getData} from '../Utils/asyncStorage';
import apiUrl from '../Utils/apiUrl';

export const addPlantToList = (plantDataFromUser, plantsListId) => async (
  dispatch,
) => {
  try {
    const res = await axios({
      method: 'post',
      url: `${apiUrl()}/api/plants/${plantsListId}`,
      headers: setHeaders(),
      data: plantDataFromUser,
    });

    if (res.status === 200) {
      dispatch({
        type: TYPES.addPlant,
        plantData: res.data,
      });
    }
  } catch (error) {
    console.error('Error:', error.response.data);
    dispatch({
      type: TYPES.addPlant,
      plantData: {},
    });
  }
};

export const deletePlant = (plantId) => async (dispatch) => {
  const userId = await getData('id');
  try {
    const res = await axios({
      method: 'delete',
      url: `${apiUrl()}/api/plants/${userId}/${plantId}`,
      headers: setHeaders(),
    });

    if (res.status === 200) {
      dispatch({
        type: TYPES.deletePlant,
        plantDeleted: true,
      });
    }
  } catch (error) {
    console.error('Error:', error.response.data);
    dispatch({
      type: TYPES.deletePlant,
      plantDeleted: false,
    });
  }
};

export const updateLastWateringDate = (plantId, lastWateringDate) => async (
  dispatch,
) => {
  const userId = await getData('id');
  try {
    const res = await axios({
      method: 'patch',
      url: `${apiUrl()}/api/plants/${userId}/${plantId}`,
      headers: setHeaders(),
      data: {
        lastTimeWatered: lastWateringDate,
      },
    });

    if (res.status === 200) {
      dispatch({
        type: TYPES.updateLastWateringDate,
        wateringDateUpdated: true,
      });
    }
  } catch (error) {
    console.error('Error:', error.response.data);
    dispatch({
      type: TYPES.updateLastWateringDate,
      wateringDateUpdated: false,
    });
  }
};

export const uploadPlantImage = (fileObject) => async (dispatch) => {
  console.log(fileObject);
  try {
    const headers = setHeaders();
    const res = await axios({
      method: 'post',
      url: `${apiUrl()}/api/plants/image`,
      headers: {
        Accept: headers.Accept,
        'x-auth-token': headers['x-auth-token'],
        'Content-Type': header['Content-Type'],
      },
      data: fileObject,
    });

    if (res.status === 200) {
      dispatch({
        type: TYPES.uploadImage,
        imageName: res.data,
      });

      return res.data;
    }
  } catch (error) {
    console.error('Error:', error.response.data);
    dispatch({
      type: TYPES.uploadImage,
      imageName: '',
    });
  }
};
