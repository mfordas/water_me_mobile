import nock from 'nock';
import configureStore from 'redux-mock-store';
import thunk, {ThunkDispatch} from 'redux-thunk';

import apiUrl from '../../Utils/apiUrl';
import {getData} from '../../Utils/asyncStorage';
import {
  addPlantToList,
  deletePlant,
  updateLastWateringDate,
  uploadPlantImage,
} from '../plantsActions';
import {
  addPlantType,
  deletePlantType,
  updateLastWateringDateType,
  uploadImageType,
  PlantsState,
} from '../plantsTypes';

const middlewares = [thunk];
const mockStore =
  configureStore<PlantsState, ThunkDispatch<PlantsState, any, any>>(
    middlewares,
  );

jest.mock('jwt-decode', () => () => ({}));
jest.mock('../../Utils/apiUrl', () => () => 'http://localhost');
jest.mock('../../Utils/asyncStorage', () => {
  const asyncStorage = jest.requireActual('../../Utils/asyncStorage');
  return {
    ...asyncStorage,
    removeValue: jest.fn(),
    storeData: jest.fn(),
    getData: jest.fn(),
  };
});

const getApiUrl = apiUrl();

describe('Add plant action', () => {
  const store = mockStore({
    plantData: {},
    plantDeleted: false,
    wateringDateUpdated: false,
    imageName: '',
  });

  afterEach(() => {
    store.clearActions();
  });
  it('Action is sended with correct payload', async () => {
    const expectedPayload = {
      test: 'testData',
    };

    const testPlantListId = 1;

    const plantDataFromUser = {
      name: 'TestName',
      wateringCycle: 1,
      pictureUrl: 'TestPicture',
      wateringCycleBeginingData: '2022-01-01',
      lastTimeWatered: '2022-01-01',
    };

    nock(`${getApiUrl}/api`).post(`/plants/${testPlantListId}`).reply(200, {
      test: 'testData',
    });

    await store.dispatch(addPlantToList(plantDataFromUser, testPlantListId));

    expect(store.getActions()[0].type).toBe(addPlantType);
    expect(store.getActions()[0].plantData).toEqual(expectedPayload);
  });

  it('Action is sended with correct payload when there is an error', async () => {
    const expectedPayload = {};

    const testPlantListId = 1;

    const plantDataFromUser = {
      name: 'TestName',
      wateringCycle: 1,
      pictureUrl: 'TestPicture',
      wateringCycleBeginingData: '2022-01-01',
      lastTimeWatered: '2022-01-01',
    };

    nock(`${getApiUrl}/api`).post(`/plants/${testPlantListId}`).reply(400);

    await store.dispatch(addPlantToList(plantDataFromUser, testPlantListId));

    expect(store.getActions()[0].type).toBe(addPlantType);
    expect(store.getActions()[0].plantData).toEqual(expectedPayload);
  });
});

describe('Delete plant action', () => {
  const testUserId = '1';
  const testPlantId = 1;
  (getData as jest.Mock).mockImplementation(() => Promise.resolve(testUserId));

  const store = mockStore({
    plantData: {},
    plantDeleted: false,
    wateringDateUpdated: false,
    imageName: '',
  });

  afterEach(() => {
    store.clearActions();
  });

  it('Action is sended with correct payload', async () => {
    const expectedPayload = {
      plantDeleted: true,
    };

    nock(`${getApiUrl}/api`)
      .delete(`/plants/${testUserId}/${testPlantId}`)
      .reply(200, {
        test: 'testData',
      });

    await store.dispatch(deletePlant(testPlantId));

    expect(store.getActions()[0].type).toBe(deletePlantType);
    expect(store.getActions()[0].plantDeleted).toEqual(
      expectedPayload.plantDeleted,
    );
  });

  it('Action is sended with correct payload when error occures', async () => {
    const expectedPayload = {
      plantDeleted: false,
    };

    nock(`${getApiUrl}/api`)
      .delete(`/plants/${testUserId}/${testPlantId}`)
      .reply(400);

    await store.dispatch(deletePlant(testPlantId));

    expect(store.getActions()[0].type).toBe(deletePlantType);
    expect(store.getActions()[0].plantDeleted).toEqual(
      expectedPayload.plantDeleted,
    );
  });
});

describe('Update watering action', () => {
  const testUserId = '1';
  const testPlantId = 1;
  const testLastWateringDate = '2022-11-11';
  (getData as jest.Mock).mockImplementation(() => Promise.resolve(testUserId));

  const store = mockStore({
    plantData: {},
    plantDeleted: false,
    wateringDateUpdated: false,
    imageName: '',
  });

  afterEach(() => {
    store.clearActions();
  });

  it('Action is sended with correct payload', async () => {
    const expectedPayload = {
      wateringDateUpdated: true,
    };

    nock(`${getApiUrl}/api`)
      .patch(`/plants/${testUserId}/${testPlantId}`)
      .reply(200);

    await store.dispatch(
      updateLastWateringDate(testPlantId, testLastWateringDate),
    );

    expect(store.getActions()[0].type).toBe(updateLastWateringDateType);
    expect(store.getActions()[0].wateringDateUpdated).toEqual(
      expectedPayload.wateringDateUpdated,
    );
  });

  it('Action is sended with correct payload when error occures', async () => {
    const expectedPayload = {
      wateringDateUpdated: false,
    };

    nock(`${getApiUrl}/api`)
      .patch(`/plants/${testUserId}/${testPlantId}`)
      .reply(400);

    await store.dispatch(
      updateLastWateringDate(testPlantId, testLastWateringDate),
    );

    console.log(store.getActions());

    expect(store.getActions()[0].type).toBe(updateLastWateringDateType);
    expect(store.getActions()[0].wateringDateUpdated).toEqual(
      expectedPayload.wateringDateUpdated,
    );
  });
});

describe('Upload image action', () => {
  const testImageName = 'TestImage';

  const photoData: FormData = {
    append: jest.fn(),
    get: jest.fn(),
    getAll: jest.fn(),
    delete: jest.fn(),
    has: jest.fn(),
    set: jest.fn(),
    forEach: jest.fn(),
  };

  const store = mockStore({
    plantData: {},
    plantDeleted: false,
    wateringDateUpdated: false,
    imageName: '',
  });

  afterEach(() => {
    store.clearActions();
  });

  it('Action is sended with correct payload', async () => {
    const expectedPayload = {
      imageName: testImageName,
    };

    nock(`${getApiUrl}/api`).post('/plants/image').reply(200, testImageName);

    await store.dispatch(uploadPlantImage(photoData));

    expect(store.getActions()[0].type).toBe(uploadImageType);
    expect(store.getActions()[0].imageName).toEqual(expectedPayload.imageName);
  });

  it('Action is sended with correct payload when error occures', async () => {
    const expectedPayload = {
      imageName: '',
    };

    nock(`${getApiUrl}/api`).post('/plants/image').reply(400);

    await store.dispatch(uploadPlantImage(photoData));

    expect(store.getActions()[0].type).toBe(uploadImageType);
    expect(store.getActions()[0].imageName).toEqual(expectedPayload.imageName);
  });
});
