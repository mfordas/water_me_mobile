import axios from 'axios';

import {
    addPlantsListType,
    getPlantsListsType,
    deletePlantsListType,
    showPlantsListType,
} from './plantsListsTypes';
import {AppThunk} from '../redux_store/reduxStore';
import setHeaders from '../Utils/setHeaders';
import {getData} from '../Utils/asyncStorage';
import apiUrl from '../Utils/apiUrl';

const getApiUrl = apiUrl();

export const addPlantsList = (plantsListName: string): AppThunk => async (
    dispatch,
) => {
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
                type: addPlantsListType,
                plantsListName: res.data.name,
            });
        }
    } catch (error) {
        console.error('Error:', error.response.data);
        dispatch({
            type: addPlantsListType,
            plantsListName: '',
        });
    }
};

export const getPlantsListsForUser = (): AppThunk => async (dispatch) => {
    const userId = await getData('id');
    if (!userId) {
        dispatch({
            type: getPlantsListsType,
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
                type: getPlantsListsType,
                plantsLists: res.data,
            });
        }
    } catch (error) {
        console.error('Error:', error.response.data);
        dispatch({
            type: getPlantsListsType,
            plantsLists: [],
        });
    }
};

export const deletePlantsList = (plantsListId: number): AppThunk => async (
    dispatch,
) => {
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
                type: deletePlantsListType,
                plantsListDeleted: true,
            });
        }
    } catch (error) {
        console.error('Error:', error.response.data);
        dispatch({
            type: deletePlantsListType,
            plantsListDeleted: false,
        });
    }
};

export const showPlantsList = (plantsListId: number): AppThunk => async (
    dispatch,
) => {
    try {
        const userId = await getData('id');
        const res = await axios({
            method: 'get',
            url: `${getApiUrl}/api/plants/${userId}/${plantsListId}`,
            headers: await setHeaders(),
        });

        if (res.status === 200) {
            dispatch({
                type: showPlantsListType,
                plants: res.data,
            });
        }
    } catch (error) {
        console.error('Error:', error.response.data);
        dispatch({
            type: showPlantsListType,
            plants: [],
        });
    }
};
