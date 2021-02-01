import axios from 'axios';

import {TYPES} from './types';
import setHeaders from '../Utils/setHeaders';
import {getData} from '../Utils/asyncStorage';
import apiUrl from '../Utils/apiUrl';

const getApiUrl = apiUrl();

export const getPlantsLists = () => async (dispatch) => {
  try {
    const res = await axios({
      method: 'get',
      url: `${getApiUrl}/api/plantsLists`,
      headers: await setHeaders(),
    });

    if (res.status === 200) {
      dispatch({
        type: TYPES.getPlantsLists,
        plantsLists: res.data,
      });
    } else if (res.status === 404) {
      dispatch({
        type: TYPES.loginExternal,
        plantsLists: [],
      });
    }
  } catch (error) {
    console.error('Error:', error.response.data);
    dispatch({
      type: TYPES.getPlantsLists,
      plantsLists: [],
    });
  }
};

export const addPlantsList = (plantsListName) => async (dispatch) => {
  try {
    const res = await axios({
      method: 'post',
      url: `${getApiUrl}/api/plantsLists`,
      headers: await setHeaders(),
      data: {
        userId: await getData('id'),
        name: plantsListName,
      },
    });

    if (res.status === 200) {
      dispatch({
        type: TYPES.addPlantsList,
        plantsListName: res.data.name,
      });
    }
  } catch (error) {
    console.error('Error:', error.response.data);
    dispatch({
      type: TYPES.addPlantsList,
      plantsListName: '',
    });
  }
};

export const getPlantsListsForUser = () => async (dispatch) => {
  const userId = await getData('id');
  if (!userId) {
    dispatch({
      type: TYPES.getPlantsLists,
      plantsLists: [],
    });
    console.error('User not logged!');
    return;
  }
  try {
    const res = await axios({
      method: 'get',
      url: `${getApiUrl}/api/plantsLists/${userId}`,
      headers: await setHeaders(),
    });

    if (res.status === 200) {
      dispatch({
        type: TYPES.getPlantsLists,
        plantsLists: res.data,
      });
    } else if (res.status === 404) {
      dispatch({
        type: TYPES.loginExternal,
        plantsLists: [],
      });
    }
  } catch (error) {
    console.error('Error:', error.response.data);
    dispatch({
      type: TYPES.getPlantsLists,
      plantsLists: [],
    });
  }
};

export const deletePlantsList = (plantsListId) => async (dispatch) => {
  try {
    const userId = await getData('id');
    const res = await axios({
      method: 'delete',
      url: `${getApiUrl}/api/plantsLists/${userId}/${plantsListId}`,
      headers: await setHeaders(),
      data: {
        userId: userId,
      },
    });

    if (res.status === 200) {
      dispatch({
        type: TYPES.deletePlantsList,
        plantsListDeleted: true,
      });
    } else if (res.status === 404) {
      dispatch({
        type: TYPES.deletePlantsList,
        plantsListDeleted: false,
      });
    }
  } catch (error) {
    console.error('Error:', error.response.data);
    dispatch({
      type: TYPES.deletePlantsList,
      plantsListDeleted: false,
    });
  }
};

export const showPlantsList = (plantsListId) => async (dispatch) => {
  try {
    const userId = await getData('id');
    const res = await axios({
      method: 'get',
      url: `${getApiUrl}/api/plants/${userId}/${plantsListId}`,
      headers: await setHeaders(),
    });

    if (res.status === 200) {
      dispatch({
        type: TYPES.showPlantsList,
        plants: res.data,
      });
    } else if (res.status === 404) {
      dispatch({
        type: TYPES.showPlantsList,
        plants: [],
      });
    }
  } catch (error) {
    console.error('Error:', error.response.data);
    dispatch({
      type: TYPES.showPlantsList,
      plants: [],
    });
  }
};
