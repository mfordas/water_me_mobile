import {handleUploadingFile} from '../helpers';

jest.mock('../../../Utils/apiUrl', () => jest.fn());
const testFile = 'public.image';
const emptyFileData = null;

const mockUploadPlantImage = jest.fn(() => Promise.resolve('Image name'));
const mocksetPicture = jest.fn(() => console.log('Image filename set'));

describe('Uploading plant picture', () => {
    it('should log an error if plant picture is not availabe', async () => {
        await handleUploadingFile(
            emptyFileData,
            mockUploadPlantImage,
            mocksetPicture,
        );

        expect(mockUploadPlantImage).toHaveBeenCalledTimes(0);
        expect(mocksetPicture).toHaveBeenCalledTimes(1);
    });
});
