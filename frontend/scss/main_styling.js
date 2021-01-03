import { StyleSheet } from 'react-native';

const heartRightSideColor =  'rgb(233, 82, 18)';
const heartLeftSideColor = 'rgb(197, 60, 28)';
const humanColor = 'rgb(245, 239, 191)';
const leafRightSideColor = 'rgb(142, 193, 79)';
const leafLeftSideColor = 'rgb(119, 170, 49)';

const mainStyling = StyleSheet.create({

  zakupy: {
    fontSize: 20,
    marginTop: -120,
    marginRight: -150,
    alignSelf: 'center',
    fontFamily: 'Lovelo-Black',
  },
  
  logoContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  
  logo: {
    width: 270,
    height: 300,
    marginTop: -120,
    resizeMode: 'center',
  },

  containerMenu: {
  flexDirection: 'row',
  justifyContent: 'center'
},

  buttonMenu: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'black',
    color: 'black',
    fontSize: 14,
    flex: 2,
    margin: 10,
    borderRadius: 20,
    maxWidth: 120,
  },

  buttonMenuText: {
    paddingVertical: 10,
    paddingHorizontal: 1,
    textAlign: 'center',
    fontFamily: 'Lovelo-Black',
    fontSize: 14,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'black',
    color: 'black',
    fontSize: 14,
    margin: 10,
    borderRadius: 20,
  },

  buttonText: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontFamily: 'Lovelo-Black',
    fontSize: 14,
  },

  container: {
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
},

input: {
  width: 150,
  borderStyle: 'solid',
  borderBottomColor: 'black',
  borderBottomWidth: 2,
  textAlign: 'center',
  fontFamily: "Lovelo-Black",
  alignSelf: 'center',
  paddingVertical: 0,
},

registerCardText: {
  paddingVertical: 2,
  paddingHorizontal: 10,
  textAlign: 'center',
  fontFamily: 'Lovelo-Black',
},

registerCard: {
  maxWidth: 300,
  marginVertical: 20,
  backgroundColor: leafRightSideColor,
  borderStyle: 'solid',
  borderColor: 'black',
  borderWidth: 2,
  alignSelf: 'center',
  flexDirection: 'column',
},

buttonRegisterCard: {
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 2,
  borderStyle: 'solid',
  borderColor: 'black',
  color: 'black',
  fontSize: 16,
  flex: 2,
  margin: 10,
  borderRadius: 20,
  maxWidth: 120,
  backgroundColor: 'white',
},

p: {
  fontSize: 16,
  margin: 10,
  alignItems: 'center',
  fontFamily: "Lovelo-Black",
},

errorMessage: {
  fontSize: 10,
  color: 'red',
  fontFamily: "Lovelo-Black",
  textAlign: 'center',
},

containerShoppingList: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
},

containerShoppingLists: {
  justifyContent: 'center',
  alignItems: 'center',
},

containerProducts: {
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
},

progressBar: {
  backgroundColor: 'white',
  borderRadius: 20,
  textAlign: 'center',
  color: 'black',
  width: 300,
},

progressBarContainer: {
  justifyContent: 'center',
  backgroundColor: 'white',
  borderWidth: 2,
  borderStyle: 'solid',
  borderColor: 'black',
  padding: 0,
  margin: 0,
  borderRadius: 20,
  width: 300,
},

progressBarText: {
  fontFamily: "Lovelo-Black",
  textAlign: 'center',
  maxHeight: 17,
  minWidth: 30,
},

containerProduct: {
  flexDirection: 'row',
  width: 330,
  justifyContent: 'center',
  alignItems: 'center',
},

productName: {
  flex: 3,
  justifyContent: "flex-start",
},

productNumber: {
  flex: 1,
},

productNumberP: {
  textAlign: 'auto',
},

containerAddShoppingList: {
  alignItems: 'center',
},

containerAddShoppingListInput: {
  backgroundColor: 'white',
},

horizontalFormContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
},

productsProposalText: {
  fontSize: 12,
  fontFamily: 'Lovelo-Black',
  margin: 10,
  alignItems: 'center',
},

buttonContainer: {
  flexDirection: 'column',
  textAlign: 'center',
  alignItems: 'center',
  marginBottom: 7,
},

buttonContainerP: {
  margin: 'auto',
  maxWidth: 50,
  fontSize: 10,
  textAlign: 'center',
  fontFamily: 'Lovelo-Black'
},

icon: {
  width: 14,
  height: 14,
  margin: 10,
}

})

export default mainStyling;
