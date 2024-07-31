import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import  logo from '../assets/logo.png'

const {width}=Dimensions.get('window')

function Header() {
  return (
    <View style={{paddingLeft:20}}>
      <Image resizeMode='contain' style={styles.Imagestyling} source={logo}/>
      <Text style={styles.Textstyles}>You probably have somthing to do</Text>
    </View>
  );
}

const styles=StyleSheet.create({
Imagestyling:{
  width:width/2.5
},
  Textstyles:{
    fontSize:16,
    fontWeight:'thin',
    color:'grey'
  }
})


export default Header