import { StyleSheet, View, Text, SafeAreaView,ViewStyle} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'; //Used for filling in background with gradient
import { ReactNode } from 'react';

/**
 * Component used for the background of every screen
 * @param param0 consists of children and extra style
 * -children will be the react nodes in the screen
 * -extra style allows for optional customization of background outside the component
 * @returns 
 */
const Background = function Background({children,extraStyle}:{children:ReactNode|ReactNode[],extraStyle?:ViewStyle}){
    return(
        <LinearGradient
            colors = {['#1E89DD','#E9F5FE']}
            start = {{x:0,y:0}}
            end = {{x:1,y:1}}
            style = {styles.color}>
                <SafeAreaView style = {[styles.container,extraStyle]}>
                    {children}
                </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container:{ //styling for the screen
        flex:1,
    },
    color:{ //styling for the gradient
        flex:1
    }
});

export default Background;