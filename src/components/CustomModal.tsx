import { ReactNode } from 'react';
import { StyleSheet, ScrollView, FlatList,TouchableWithoutFeedback, View, Text,Button, SafeAreaView,Alert,Image, TextInput,TouchableOpacity, Modal } from 'react-native'

/**
 * Component provides a modal that contains other react nodes
 * @param param0 contains children which are the react nodes inside the modal
 * -modal visible which keeps track of whether or not the modal is visible
 * @returns a modal
 */
const CustomModal = function CustomModal({children,modalVisible}:{children:ReactNode,modalVisible:boolean}){
    return(
        <Modal visible = {modalVisible} transparent={true}>
            {children}
        </Modal>
    )
}

export default CustomModal;