import { useEffect, useState } from "react";
import { View,Text,StyleSheet,TouchableOpacity,Image, Button } from "react-native";
import { useDispatch,useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Product=({id, title, price, thumbnail, onPress})=>{

  const dispatch = useDispatch();
  const favouriteList = useSelector((state)=>state.favouriteReducer.favouriteListIds);
 const productId = id;
 const [isInCart,setIsInCart] = useState(false);
 const [isFavourite,setIsFavourite] = useState(false);
 const cartItems = useSelector((state)=>state.cartReducer.cartProducts);

 useEffect(()=>{ 
  const checking = favouriteList.findIndex(({id})=>id==productId);
  const indexOfItem = cartItems.findIndex(({id})=>id==productId);
  if(indexOfItem>=0){
    setIsInCart(true);}else{setIsInCart(false);}    
  if(checking>=0){
  setIsFavourite(true);}else{setIsFavourite(false);}
},[favouriteList,cartItems])

    return (
      id && <TouchableOpacity style={styles.card} onPress={onPress}>
        <View style={{zIndex:22222,position:'absolute',top:10,left:10,paddingHorizontal:5,paddingVertical:5,borderRadius:10}}>
        <Icon name={isFavourite?"heart":"heart-o"} size={20} color={isFavourite?"red":"black"} onPress={()=>{dispatch({type:isFavourite?'Remove-fav':'Add-fav',payload:{id:id}});setIsFavourite(!isFavourite);}} />
        </View>
           <Image
            style={styles.thumb}
            source={{uri:thumbnail}}
          />          
          <View style={styles.infoContainer}>
            <View style={{flex:1,flexDirection:"column",justifyContent:"center"}}><Text style={styles.price}>$ {price}</Text>
            <Text style={styles.name}>{title}</Text></View>
            <View style={{position:'absolute',bottom:10,right:10,paddingHorizontal:10,paddingVertical:10}}>
        <Icon name={isInCart?"trash":"plus-circle"} size={25} color={isInCart?"red":"#2a4ba0"} onPress={()=>{dispatch({type:isInCart?'Removefromcart':'Addtocart',payload:{id:id,title:title,price:price,thumbnail:thumbnail,quantity:1}});setIsInCart(!isInCart);}} />
        </View>
          </View>
        </TouchableOpacity>
      );
    }
    const styles = StyleSheet.create({
      card: {
        backgroundColor: '#f8f9fb',
        borderRadius: 16,
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowColor: 'black',
        height: 200,
        width:'44%',
        shadowOffset: {
          height: 0,
          width: 0,
        },
        elevation: 1,
        marginVertical: 12,
        marginHorizontal: 10
      },
      thumb: {
        height: '70%',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        width: '100%',
      },
      infoContainer: {
        flexDirection:"row",
        padding: 15,
        position:"absolute",
        bottom: 5,
        left: 5,
        paddingVertical: 5
      },
      name: {
        fontSize: 14,
        fontFamily:"Manrope-SemiBold",
      },
      price: {
        fontFamily:"Manrope-Bold",
        fontSize: 16
      },
    });