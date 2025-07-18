import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  SafeAreaView,
  Alert,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import CustomButton from "./CustomButton";
import CustomText from "./CustomText";

const SuccessfulCreation = function SuccessfulCreation({
  setSuccessModalVisible,
}: {
  setSuccessModalVisible: (input: boolean) => void;
}) {
  return (
    <View style={styles.backdrop}>
      <View style={styles.container}>
        <View style={styles.messageContainer}>
            <CustomText text="Workout Successfully Logged!" textStyle={{color:'#2196F3',fontSize:20,fontWeight:600}}></CustomText>
            <Image source={require('../../assets/celebrate.png')}></Image>
        </View>
        <CustomButton text="Return" extraBtnDesign={{backgroundColor:'#F57C00',width:120,height:35}} extraTxtDesign={{fontSize:14,fontWeight:700}} action={()=>setSuccessModalVisible(false)}></CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    backdrop:{
        flex:1,
        backgroundColor:'rgba(69,69,69,0.5)',
        justifyContent:'center',
        alignItems:'center'
    },
  container: {
    width: 380,
    height: 150,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    justifyContent:'space-evenly',
    alignItems:'center',
    flexDirection:'column'
  },
  messageContainer:{
    width:356,
    height:40,
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row'
  }
});

export default SuccessfulCreation;
