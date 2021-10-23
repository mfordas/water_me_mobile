import axios from 'axios';

import apiUrl from '../Utils/apiUrl';
import {getData} from '../Utils/asyncStorage';
import setHeaders from '../Utils/setHeaders';
import {AppThunk, AppThunkWithReturn} from '../redux_store/reduxStore';
import {
  addPlantType,
  deletePlantType,
  updateLastWateringDateType,
  uploadImageType,
} from './plantsTypes';

export type PlantData = {
  name: string;
  wateringCycle: number;
  pictureUrl: string;
  wateringCycleBeginingData: string;
  lastTimeWatered: string;
};

export const addPlantToList =
  (plantDataFromUser: PlantData, plantsListId: number): AppThunk =>
  async (dispatch) => {
    try {
      const res = await axios({
        method: 'post',
        url: `${apiUrl()}/api/plants/${plantsListId}`,
        headers: await setHeaders(),
        data: plantDataFromUser,
      });

      if (res.status === 200) {
        dispatch({
          type: addPlantType,
          plantData: res.data,
        });
      }
    } catch (error) {
      console.error('Error:', error.response.data);
      dispatch({
        type: addPlantType,
        plantData: {},
      });
    }
  };

export const deletePlant =
  (plantId: number): AppThunk =>
  async (dispatch) => {
    const userId = await getData('id');
    try {
      const res = await axios({
        method: 'delete',
        url: `${apiUrl()}/api/plants/${userId}/${plantId}`,
        headers: await setHeaders(),
      });

      if (res.status === 200) {
        dispatch({
          type: deletePlantType,
          plantDeleted: true,
        });
      }
    } catch (error) {
      console.error('Error:', error.response.data);
      dispatch({
        type: deletePlantType,
        plantDeleted: false,
      });
    }
  };

export const updateLastWateringDate =
  (plantId: number, lastWateringDate: string): AppThunk =>
  async (dispatch) => {
    const userId = await getData('id');
    try {
      const res = await axios({
        method: 'patch',
        url: `${apiUrl()}/api/plants/${userId}/${plantId}`,
        headers: await setHeaders(),
        data: {
          lastTimeWatered: lastWateringDate,
        },
      });

      if (res.status === 200) {
        dispatch({
          type: updateLastWateringDateType,
          wateringDateUpdated: true,
        });
      }
    } catch (error) {
      console.error('Error:', error.response.data);
      dispatch({
        type: updateLastWateringDateType,
        wateringDateUpdated: false,
      });
    }
  };

export const uploadPlantImage =
  (fileObject: FormData): AppThunkWithReturn =>
  async (dispatch) => {
    try {
      const res = await axios({
        method: 'post',
        url: `${apiUrl()}/api/plants/image`,
        headers: await setHeaders(),
        data: fileObject,
      });

      if (res.status === 200) {
        dispatch({
          type: uploadImageType,
          imageName: res.data,
        });

        return res.data;
      }
    } catch (error) {
      console.error('Error:', error.response.data);
      dispatch({
        type: uploadImageType,
        imageName: '',
      });
    }
  };
