import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {launchCamera} from 'react-native-image-picker';
import PropTypes from 'prop-types';

import ErrorMessage from '../ErrorMessage/errorMessage';
import styles from './styles/plantsList';

type AddPlantPicutre = {
  formSubmitted: boolean;
  singleFile: any;
  setSingleFile: React.Dispatch<
    React.SetStateAction<typeof DocumentPicker.types.images | null>
  >;
};

type RNIPResponse = {
  fileName: string;
  fileSize: number;
  uri: string;
  type: string;
};

export const AddPlantPicture = ({
  formSubmitted,
  singleFile,
  setSingleFile,
}: AddPlantPicutre) => {
  const selectFile = async () => {
    try {
      const res: any = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      setSingleFile(res);
    } catch (err) {
      setSingleFile(null);
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const validatePicture = () => {
    if (formSubmitted && !singleFile) {
      return <ErrorMessage errorText="Dodaj zdjęcie" />;
    }
  };

  const adapterForReactNativeImagePicker = (imageObjectFromRNIP: any) => {
    const {fileName, fileSize, uri, type} = imageObjectFromRNIP;
    const pictureObject: any = {
      fileCopyUri: uri,
      name: fileName,
      size: fileSize,
      type: type,
      uri: uri,
    };
    setSingleFile(pictureObject);
  };

  return (
    <>
      <View style={styles.inputContainerPicture}>
        <TouchableOpacity
          style={[styles.button, styles.addPictureButton]}
          onPress={async () => {
            launchCamera(
              {
                mediaType: 'photo',
              },
              (res) => adapterForReactNativeImagePicker(res),
            );
          }}>
          <Text style={styles.text}>Zrób Zdjęcie</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.addPictureButton]}
          onPress={selectFile}>
          <Text style={styles.text}>Dodaj zdjęcie z galerii</Text>
        </TouchableOpacity>
      </View>
      {singleFile ? (
        <Text style={styles.inputContainerPictureConfirmText}>
          Zdjęcie dodane
        </Text>
      ) : (
        <></>
      )}
      {validatePicture()}
    </>
  );
};

AddPlantPicture.propTypes = {
  formSubmitted: PropTypes.bool,
  singleFile: PropTypes.object,
  setSingleFile: PropTypes.func,
};
