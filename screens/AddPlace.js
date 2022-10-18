import PlacesForm from '../component/Places/PlacesForm';

const AddPlace = ({ navigation }) => {
  const createPlaceHandler = (place) => {
    navigation.navigate('AllPlaces', {
      place: place,
    });
  };
  return <PlacesForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;
