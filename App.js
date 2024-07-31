import { ActivityIndicator, Button, StatusBar, StyleSheet, Text, View } from "react-native";
import Header from "./src/Header";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Footer from "./src/footer";
import Mainscreen from "./src/MainScreen";
import NewTodo from "./src/Newtodobutton";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./Store/store";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { All, Done, inprogress, intaldispatch } from "./Store/Cartslice";

function Root() {
  const dispatch = useDispatch();
  const [isloading, setisloading] = useState(true);

  useEffect(function () {
    async function gettingdata() {
     // await AsyncStorage.clear()
     setisloading(true);
      let all
      let Inprogress
      let done
      try {
         all = await AsyncStorage.getItem("Allarray");
         Inprogress = await AsyncStorage.getItem("inprogresssarray");
         done = await AsyncStorage.getItem("Donesarray");
        all= all ? JSON.parse(all):[]
        Inprogress= Inprogress ? JSON.parse(Inprogress):[]
        done= done ? JSON.parse(done):[]

      } catch (err) {
        console.log(err);
      } finally {
        dispatch(intaldispatch({all,Inprogress,done}))
       // console.log(all,Inprogress,done)
        setisloading(false);
      }
    }
    gettingdata();
  }, []);

  if(isloading) return <ActivityIndicator size={24}/>
  return (
    <>
      <Header />
      <Mainscreen />
      <NewTodo />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.container}>
        <Provider store={store}>
          <Root />
        </Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
});
