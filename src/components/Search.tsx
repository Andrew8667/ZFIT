import { StyleSheet, ScrollView, FlatList,TouchableWithoutFeedback, View, Text,Button, SafeAreaView,Alert,Image, TextInput,TouchableOpacity, Modal } from 'react-native'

const Search = function Search({setSearchText,action}:{setSearchText:(item:string)=>void,action:(input:boolean)=>void}){
    return(
        <View style = {styles.container}>
            <TextInput style={styles.textStyle}
                placeholder='Search by title'
                placeholderTextColor='#B2B2B2'
                onChangeText={(input)=>{setSearchText(input)}}></TextInput>
                <TouchableOpacity onPress={()=>action()}>
                    <Image style={styles.img} source={require('../../assets/Sort.png')}></Image>
                </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        height:34,
        width:250,
        marginTop: 11,
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        flexDirection:'row',
        backgroundColor:'#FFFFFF'
    },
    textStyle:{
        opacity:100,
        height:'100%',
        width:'88%',
        padding:10,
        color:'#000000'
    },
    img:{
        opacity:100,
    }
});

export default Search