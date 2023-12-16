import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import { Product } from '../components/product.js';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import CartIcon from '../components/carticon.js'


export function ProductList ({navigation}) {

    const [productsList,setproductsList] = useState([]);
    const API_URL = 'https://dummyjson.com/products';

    const getProducts = async () => {
      try {
        const response = await fetch(API_URL);
        const resJson = await response.json();
        setproductsList(resJson.products);
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      getProducts();
    },[]);

  return (
    <>
    <StatusBar backgroundColor="#2a4ba0" />
    <View style={{width:'100%',flexDirection:'column',justifyContent: 'space-between',
                      alignItems: 'center',paddingHorizontal:22,backgroundColor:'#2a4ba0'}}>
       <View style={{marginTop:25,flexDirection:"row",alignItems: 'center',justifyContent:"space-between",width:'100%'}}>
       <Text style={{fontSize:26,fontFamily:"Manrope-Bold",color:"#ffffff"}}>Hey, Rahul</Text>
       <CartIcon navigation={navigation}/> 
       </View>
       <View style={{marginBottom:30,marginTop:10}}>
        <TextInput style={{flexDirection:"row",alignItems:"center",borderRadius:25,backgroundColor:"#153075",padding:15,paddingHorizontal:30,marginTop:20}}
        placeholder='                 Search products or store                  '>
          <Icon name="search" size={20} color="white" />
          <Text style={{fontFamily:"Manrope-Medium",color:"white"}}>    Search products or store        </Text>
        </TextInput>
       </View>
      </View>
    <ScrollView contentContainerStyle={{backgroundColor:'#fffff',flexDirection:"row",flexWrap:"wrap",justifyContent:"space-evenly"}}>
    <View style={{width:'100%',marginTop:10,flexDirection:"row",alignItems:"flex-start"}}><Text style={{fontFamily:"Manrope-Medium",fontSize:26,marginLeft:15,color:"#000000"}}>Recommended</Text></View>    
      {productsList.map((product)=>{
            return (
              <Product {...product} key={product.id}
              onPress={() => {
                navigation.navigate('ProductDetails', {
                  productId: product.id
                });
              }}
              />
            );
      })}
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  productsList: {
    backgroundColor: 'white',
  },
  productsListContainer: {
    backgroundColor: 'white',
    paddingVertical: 8,
    marginHorizontal: 8,
  },
});