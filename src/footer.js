import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Activity, inprogress } from "../Store/Cartslice";
import { useEffect } from "react";

function Footer() {
  const dispatch = useDispatch();
  const { Actives,Alls,Dones,inprogresss } = useSelector((state) => state.Cart);

  useEffect(function () {
    dispatch(Activity("Alls"));

  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => dispatch(Activity("Alls"))}>
        <Text style={Actives === "Alls" ? { color: "blue" } : ""}>All ({Alls?.length})</Text>
        <View></View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {

          dispatch(Activity("inprogrss"));
        }}
      >
        <Text style={Actives === "inprogrss" ? { color: "blue" } : ""}>
          inprogress ({inprogresss?.length})
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => dispatch(Activity("Done"))}>
        <Text style={Actives === "Done" ? { color: "blue" } : ""}>
          Done ({Dones?.length})
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    position: "absolute",
    flexDirection: "row",
    backgroundColor: "white",
    padding: 25,
    width: "100%",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
});

export default Footer;
