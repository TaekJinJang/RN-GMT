import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

const PlacesItem = ({ place, onSelect }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onSelect.bind(this, place.id)}
    >
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.info}>
        <View style={styles.container}>
          <Text style={styles.title}>{place.title}</Text>
          <Text style={styles.type}>{place.type}</Text>
        </View>
        <Text style={styles.address}>{place.address}</Text>
        <Text style={styles.star}>{place.star}</Text>
        <Text numberOfLines={1} ellipsizeMode="tail">
          후기 : {place.review}
        </Text>
      </View>
    </Pressable>
  );
};

export default PlacesItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.8,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 115,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  container: { flex: 1, flexDirection: 'row' },
  title: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 18,
    color: 'gray',
  },
  type: {
    alignItems: 'flex-end',
    flex: 0.2,
    fontWeight: 'bold',
    fontSize: 13,
    color: 'blue',
  },
  star: { fontWeight: 'bold', fontSize: 13, color: 'red' },
  address: {
    fontSize: 12,
    color: 'gary',
  },
});
