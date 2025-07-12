import { StyleSheet, ScrollView, FlatList,TouchableWithoutFeedback, View, Text,Button, SafeAreaView,Alert,Image, TextInput,TouchableOpacity, Modal, ViewStyle } from 'react-native'

/**
 * Component for the search bar
 * @param param0 setSearchText allows us to keep track of what is being typed in the search bar
 * action determines if the filter modal is visible or not
 * @returns a search bar with a filter option
 */
const Search = function Search({setSearchText,searchText,action,extraStyle}:{setSearchText:(item:string)=>void,searchText:string,action:(input:boolean)=>void,extraStyle?:ViewStyle}){
    return(
        <View style = {[styles.container,extraStyle]}>
            <TextInput style={styles.textStyle}
                placeholder='Search by title'
                placeholderTextColor='#B2B2B2'
                value={searchText}
                onChangeText={(input)=>{setSearchText(input)}}></TextInput>
                <TouchableOpacity onPress={()=>action(true)}>
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