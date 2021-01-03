import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addPlantsList, getPlantsListsForUser } from '../../redux_actions/plantsListsActions';
import './scss/plantsLists.scss';

export const AddPlantsList = ({ addPlantsList, getPlantsListsForUser }) => {
    const [plantsListName, setPlantsListName] = useState('');
    const [submitPlantsList, setSubmitPlantsList] = useState(false);

    const verifyPlantsListName = () => !plantsListName && submitPlantsList ? 'Najpierw wpisz nazwę listy!' : null;

    const addNewPlantsList = async (e) => {
        if(e) { e.preventDefault() };
        setSubmitPlantsList(true);
        if (plantsListName) {
            await addPlantsList(plantsListName);
            setSubmitPlantsList(false);
            await getPlantsListsForUser(localStorage.getItem('id'));
        } else return 
    }

    return (
        <div className="addPlantsListContainer" data-test="addPlantListComponent">
            <form className="addPlantsListForm">
                <input data-test="inputAddPlantsList" onChange={e => setPlantsListName(e.target.value)}></input>
                <button data-test="addPlantsListButton" onClick={e => addNewPlantsList(e)}>Dodaj listę roślin</button>
            </form>
            <div>{verifyPlantsListName()}</div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    plantsListsData: state.plantsListsData,
});

AddPlantsList.propTypes = {
    plantsListsData: PropTypes.object
}

export default connect(mapStateToProps, { addPlantsList, getPlantsListsForUser })(AddPlantsList);