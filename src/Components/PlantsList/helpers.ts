import DocumentPicker from 'react-native-document-picker';

type FileObject = {
  fileCopyUri: string;
  fileName: string;
  fileSize: number;
  uri: string;
  type: string;
};

export const handleUploadingFile = async (
  singleFile: typeof DocumentPicker.types.images | null,
  uploadPlantImage: (photoData: FormData) => Promise<string>,
  setPicture: React.Dispatch<React.SetStateAction<string>>,
) => {
  if (singleFile) {
    const data = new FormData();
    data.append('image', singleFile);
    const imageName = await uploadPlantImage(data);

    if (imageName) {
      setPicture(imageName);
      return imageName;
    }
  } else {
    setPicture('No picture selected');
  }
};
