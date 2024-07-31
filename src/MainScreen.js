import check from "../assets/check.png";
import {Alert,Dimensions,FlatList,Image,StyleSheet,Text,TouchableOpacity,View} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Activity, All, Delelte, Done } from "../Store/Cartslice";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

function Mainscreen() {
 
  const dispatch=useDispatch()
  const {Dones,currently,Alls,inprogresss,Actives}=useSelector((state)=>state.Cart)
  
 console.log(Dones,inprogresss,Alls)
  useEffect(function () {
    async function storing() {
      console.log('hi')
      await AsyncStorage.setItem("Allarray", JSON.stringify(Alls));
      await AsyncStorage.setItem("inprogresssarray",JSON.stringify(inprogresss));
      await AsyncStorage.setItem("Donesarray", JSON.stringify(Dones));
    }
    storing();
  }, [Alls,inprogresss,Dones]);






  return (
    <View style={styles.container}>
      <FlatList
        data={currently}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.innercontainer}
            onPress={()=>{
              const indone=Dones?.find((el)=>el==item)
              if(indone)return
              dispatch(Done(item))
              dispatch(Activity(Actives))
            }}
            onLongPress={() =>
              Alert.alert("Delete ?", "Delete this Todo?", [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Delete",
                  style: "destructive",
                  onPress: () => {
                    dispatch(Delelte(item))
                    dispatch(Activity(Actives))
                  },
                },
              ])
            }
          >
            <Text
              style={[
                styles.textstyling,
                Dones?.find((el) => el === item) ? styles.done : "",
              ]}
            >
              {item}
            </Text>
            {Dones?.find((el) => el === item) ? (
              <Image
                resizeMode="contain"
                style={{ height: 30, width: 30, marginRight: 12 }}
                source={check}
              />
            ) : (
              ""
            )}
          </TouchableOpacity>
        )}
        keyExtractor={(item,index) => index}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: height / 5.2,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  innercontainer: {
    width: width - width / 20,
    height: height / 8,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "white",
    margin: 5,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textstyling: {
    fontSize: 30,
    padding: 20,
  },
  done: {
    textDecorationLine: "line-through",
  },
});

export default Mainscreen;
