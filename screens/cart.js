import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, TouchableOpacity,StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import Quantifier from '../components/quantifier';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

export function Cart ({navigation}) {

  const dispatch = useDispatch();

  //Used for updating the cart page
  const [isChange, setIsChange] = useState(false);
  const cartItems = useSelector((state)=>state.cartReducer.cartProducts);
  let [total, setTotal] = useState(0);

  useEffect(()=>{getTotalPrice()});

  function getTotalPrice(){
    const finalValue = cartItems.reduce((totalvalue,currentValue)=>{
      totalvalue += (currentValue.price * currentValue.quantity);
      return totalvalue;
    },0);
    setTotal(finalValue);
  }

  function increase(item){
    const indexOfItem = cartItems.findIndex(({ id }) => id == item.id);
    const nquantity = cartItems[indexOfItem].quantity+1;
    dispatch({type:'Change-quantity',payload:{id:item.id,nquantity:nquantity}});
    setIsChange(!isChange);
  }

  function reduce(item){
    const indexOfItem = cartItems.findIndex(({ id }) => id == item.id);
    if(cartItems[indexOfItem].quantity==1){
      dispatch({type:'Removefromcart',payload:{id:item.id}});
    }
    else{
    const nquantity = cartItems[indexOfItem].quantity-1;
    dispatch({type:'Change-quantity',payload:{id:item.id,nquantity:nquantity}});}
    setIsChange(!isChange);
  }

  function renderItem({item}) {
    return (
       <View style={styles.cartLine}>
         <Image
        style={styles.thumb}
        source={{uri:item.thumbnail}}
        />
          <View style={{flex:3}}><Text style={{fontFamily:"Manrope-Medium"}}>{item.title}</Text>
          <Text style={{fontFamily:"Manrope-Medium"}}>${item.price}</Text></View>
          <Quantifier quantity={item.quantity} increase={()=>increase(item)} reduce={()=>reduce(item)}/>
       </View>
    );
  }
  const EmptyListMessage = ({item}) => {
    return (
      // Flat List Empty Item
      <Text
        style={styles.emptyListStyle}>
        No Items in cart
      </Text>
    );
  };
  
  return (
    <>
    <StatusBar backgroundColor="#ffffff" />
      <View style={{flexDirection:'row',padding:10,backgroundColor:'#ffffff',paddingHorizontal:20,paddingVertical:10,justifyContent:'space-between',alignItems:'center'}}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Icon name="chevron-left" style={{marginRight:10,padding:10,backgroundColor:"#f8f9fb",borderRadius:50}} size={15} onPress={() => {navigation.goBack() }}/>
          <Text style={{fontSize:16,fontFamily:"Manrope-SemiBold",paddingLeft:10}}>Shopping Cart({cartItems.length})</Text>
        </View>
      </View>
    <View style={{flexDirection:"column",justifyContent:"space-between",backgroundColor:"white"}}>
    <FlatList
      style={styles.itemsList}
      contentContainerStyle={styles.itemsListContainer}
      ItemSeparatorComponent={() => (
        <View style={{ backgroundColor: "#f8f9fb", height: 3 }} />
      )}
      data={cartItems}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={EmptyListMessage}
    />
    <View style={styles.totalContainer}>
    <View style={styles.totalView}><Text style={{fontFamily:"Manrope-SemiBold"}}>Subtotal </Text><Text style={styles.totalViewHeading}>${total}</Text></View>
    <View style={styles.totalView}><Text style={{fontFamily:"Manrope-SemiBold"}}>Delivery </Text><Text style={styles.totalViewHeading}>$5</Text></View>
    <View style={styles.totalView}><Text style={{fontFamily:"Manrope-SemiBold"}}>Total </Text><Text style={styles.totalViewHeading}>${total+5}</Text></View>
    <TouchableOpacity style={{padding:15,backgroundColor:"#2a4ba0",alignItems:"center",borderRadius:20,marginTop:10}}><Text style={{fontSize:14,color:"white",fontFamily:"Manrope-SemiBold"}}>Proceed to Checkout</Text></TouchableOpacity>
   </View>
   </View></>
  );
}

const styles = StyleSheet.create({
  totalViewHeading:{
    fontFamily:"Manrope-Bold",
    fontSize:14
  },
  totalContainer:{
    flexDirection:"column",
    alignItems:"stretch",
    marginHorizontal:10,
    paddingTop:10,
    marginTop:10,
    paddingHorizontal:10,
    backgroundColor: "#f8f9fb",
    height: '20%',
    borderRadius: 12,
    bottom: 28
  },
  totalView:{
    flexDirection:"row",
    justifyContent:"space-between",
    paddingHorizontal: 10
  },
  thumb: {
    height: '60%',
    borderRadius:10,
    width: '10%',
    marginRight: 20
  },
  cartLine: { 
    flexDirection: 'row',
    alignItems:"center",
    justifyContent: "center",
    marginHorizontal: 8,
    height: 70
  },
  itemsList: {
    backgroundColor: '#ffffff',
    height: '72%'
  },
  itemsListContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  emptyListStyle:{
    fontFamily:"Manrope-SemiBold",
    fontSize: 25,
    paddingHorizontal: 10
  }
});