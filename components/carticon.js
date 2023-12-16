import { View,Button,Text } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from "react-redux";

export default CartIcon=({navigation})=>{
    
const cartItems = useSelector((state)=>state.cartReducer.cartProducts);

return(
    <View style={{flexDirection:"row",justifyContent:"flex-end"}}>
        <Icon name="shopping-cart" size={25} color={"#C7BFBD"} onPress={()=>{navigation.navigate('Cart');}} />
        <Text> </Text><Text style={{fontSize:20,fontFamily:"Manrope-Bold",backgroundColor:"#f9b023",paddingHorizontal:8,borderRadius:100}}>{cartItems.length}</Text>
    </View>
)
}