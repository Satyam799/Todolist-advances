import { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Dialog from "react-native-dialog";
import { Activity, All } from "../Store/Cartslice";
import { useDispatch } from "react-redux";

const { height, width } = Dimensions.get("window");

function NewTodo() {
  const dispatch=useDispatch()
  const [visible, setvisdible] = useState(false);
  const [input,setinput]=useState()
  function handelsubmit() {
    dispatch(All(input))
    dispatch(Activity('Alls'))
  }
  return (
    <>
      <View>
        <Dialog.Container visible={visible}>
          <Dialog.Title>New Todo</Dialog.Title>
          <Dialog.Description>Choose a name</Dialog.Description>
          <Dialog.Input onChangeText={(e) => setinput(e)} />
          <Dialog.Button
            label="Save"
            onPress={() => {
              setvisdible(false);
              handelsubmit();
            }}
          />
        </Dialog.Container>
      </View>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setvisdible(true)}>
          <View style={styles.smallbox}>
            <Text style={{ color: "blue" }}>+ New Todo</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: height / 6,
    alignItems:'flex-end',
    marginLeft:width-((width/100)*40)
  },
  smallbox: {
    backgroundColor: "#F0DBF0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
    width: 150,
  },
});
export default NewTodo;
