import { ReactNode } from 'react';
import { StyleSheet, ScrollView, FlatList,TouchableWithoutFeedback, View, Text,Button, SafeAreaView,Alert,Image, TextInput,TouchableOpacity, Modal } from 'react-native'

const CustomModal = function CustomModal({children,modalVisible,setModalVisible}:{children:ReactNode,modalVisible:boolean,setModalVisible:(input:boolean)=>void}){
    return(
        <Modal visible = {modalVisible} transparent={true}>
            {children}
        </Modal>
    )
}

export default CustomModal;