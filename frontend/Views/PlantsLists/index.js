import React from 'react';
import {View} from 'react-native';

import PlantsListsComponent from '../../Components/PlantsLists';
import PlantsListComponent from '../../Components/PlantsList';

const PlantsLists = () => {
  return (
    <View>
      <PlantsListsComponent />
      <PlantsListComponent />
    </View>
  );
};

export default PlantsLists;
