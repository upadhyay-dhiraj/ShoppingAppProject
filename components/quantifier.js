import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default Quantifier=({quantity,increase,reduce})=>{
    return(
        <View style={{flexDirection:"row",alignItems:"center",flex:1}}>
            <TouchableOpacity onPress={reduce} style={styles.roundcircle}><Text style={{fontSize:22,color:"black"}}>-</Text></TouchableOpacity>
            <Text style={{fontSize: 16,fontFamily:"Manrope-Medium"}}>  {quantity}  </Text>
            <TouchableOpacity onPress={increase} style={styles.roundcircle}><Text style={{fontSize:20,color:"black"}}>+</Text></TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
roundcircle: {
    backgroundColor: "#f8f9fb",
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100}
});