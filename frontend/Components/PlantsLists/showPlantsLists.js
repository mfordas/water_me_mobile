import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Text, View, ScrollView, StyleSheet} from 'react-native';

import {getPlantsListsForUser} from '../../redux_actions/plantsListsActions';
import DeletePlantsList from './deletePlantsList';

export const ShowPlantsLists = ({getPlantsListsForUser, plantsListsData}) => {
  useEffect(() => {
    const getPlantsLists = async () => {
      await getPlantsListsForUser();
    };
    getPlantsLists();
  }, [getPlantsListsForUser]);

  const generatePlantsLists = (plantsListsArray) => {
    return (
      <ScrollView style={styles.plantsListsContainer}>
        {plantsListsArray.map((plantsList) => {
          return (
            <View style={styles.plantsListContainer} key={plantsList.id}>
              <Text>{plantsList.name}</Text>
              <TouchableOpacity
                style={style.buttonMenu}
                onPress={() =>
                  RootNavigation.navigate(`/plantsLists/${plantsList.name}`)
                }>
                <Text style={style.buttonMenuText}>Przejdź</Text>
              </TouchableOpacity>
              <DeletePlantsList plantsListId={plantsList.id} />
            </View>
          );
        })}
      </ScrollView>
    );
  };

  return <>{generatePlantsLists(plantsListsData.plantsLists)}</>;
};

const styles = StyleSheet.create({
  plantsListsContainer: {
    width: '100%',
  },

  plantsListContainer: {
    justifyContent: 'space-around',
    margin: 0.5,
    padding: 0.5,
    alignItems: 'center',
  },

  link: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderStyle: 'solid',
    borderColor: 'black',
    fontSize: 16,
    paddingVertical: 0.2,
    paddingHorizontal: 5,
  },
});

const mapStateToProps = (state) => ({
  plantsListsData: state.plantsListsData,
});

ShowPlantsLists.propTypes = {
  plantsListsData: PropTypes.object,
};

export default connect(mapStateToProps, {getPlantsListsForUser})(
  ShowPlantsLists,
);
