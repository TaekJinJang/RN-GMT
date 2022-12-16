import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

const Btn = ({ onPress, icon, children }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={styles.view}>
        {icon && <Ionicons style={styles.icon} name={icon} size={18} />}
        <Text style={styles.text}>{children}</Text>
      </View>
    </Pressable>
  );
};

export default Btn;

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    backgroundColor: "cornflowerblue",
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    borderRadius: 30,
  },
  pressed: {
    opacity: 0.7,
  },
  locationContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  icon: { marginRight: 6, color: "white", textAlign: "center" },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
    flex: 1,
    flexDirection: "row",
  },
  view: {},
});
