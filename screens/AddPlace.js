import PlacesForm from '../component/Places/PlacesForm';
import { insertPlace } from '../util/database';

const AddPlace = ({ navigation }) => {
  const createPlaceHandler = async (place) => {
    await insertPlace(place);
    console.log(place);
    navigation.navigate('AllPlaces');
  };
  return <PlacesForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;
