import { useNavigation } from '@react-navigation/native';
import React, {useEffect, useState, useContext} from 'react';
import {
  Text, 
  Image, 
  View, 
  ScrollView, 
  SafeAreaView, 
  Button, 
  StyleSheet,Dimensions, TouchableOpacity,
  StatusBar
  } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel from '../components/carousel';
import CartIcon from '../components/carticon.js'

const { width: screenWidth } = Dimensions.get('window');

export function ProductDetails({route}) {
  const navigation = useNavigation();
  const { productId } = route.params;
  const [productDetails, setProductDetails] = useState({});
  const favouriteList = useSelector((state)=>state.favouriteReducer.favouriteListIds);

  const [isFavourite,setIsFavourite] = useState(false);
  const dispatch = useDispatch();
  const API_URL = 'https://dummyjson.com/products';

  const getProductDetails = async () => {
    try {
      const response = await fetch(`${API_URL}/${productId}`);
      const resJson = await response.json();
      if(resJson!=productDetails){
        setProductDetails(resJson);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProductDetails();
  },[]);

  useEffect(() => {
    if(Object.keys(productDetails).length!==0){
      const checking = favouriteList.findIndex(({id})=>id==productDetails.id);
      if(checking>=0){
    setIsFavourite(true);}}
  },[productDetails,favouriteList])

  return (
    <SafeAreaView style={{backgroundColor:"white",height:'100%'}}>
      <StatusBar backgroundColor="#ffffff" />
         <View style={{flexDirection:'row',padding:10,backgroundColor:'#ffffff',paddingHorizontal:20,paddingVertical:10,justifyContent:'space-between',alignItems:'center'}}>
          <Icon name="chevron-left" style={{marginRight:10,padding:10,backgroundColor:"#f8f9fb",borderRadius:50}} size={15} onPress={() => {navigation.goBack() }}/>
        <CartIcon navigation={navigation}/>
      </View>
      <ScrollView
      contentContainerStyle={{flexDirection:"column"}}>
        <View><Text style={styles.title}>{productDetails.title}</Text>
        </View>
        <View>
        <View style={{zIndex:22222,position:'absolute',top:10,right:25,paddingHorizontal:10,paddingVertical:10,backgroundColor:"white",borderRadius:10}}>
        <Icon name={isFavourite?"heart":"heart-o"} size={25} color={isFavourite?"red":"black"} onPress={()=>{dispatch({type:isFavourite?'Remove-fav':'Add-fav',payload:{id:productDetails.id}});setIsFavourite(!isFavourite);}} />
        </View>
        <Carousel slideList={productDetails.images} />
        </View>
        <View style={styles.pricencart}><Text style={styles.price}>$ {productDetails.price}</Text></View>
        <View style={{...styles.pricencart,justifyContent:"space-around"}}>
             <TouchableOpacity
             style={{borderColor:'#2a4ba0',borderWidth:1,padding:15,borderRadius:18,backgroundColor:"#ffffff",paddingHorizontal:30}}
            onPress={()=> {
              dispatch({type:'Addtocart',payload:{id:productDetails.id,title:productDetails.title,price:productDetails.price,thumbnail:productDetails.thumbnail,quantity:1}});
            }}><Text style={{fontSize:14,fontFamily:"Manrope-SemiBold",color:"#2a4ba0"}}>Add to cart</Text>
            </TouchableOpacity> 
            <TouchableOpacity
            style={{padding:15,borderRadius:18,backgroundColor:"#2a4ba0",paddingHorizontal:30}}
            onPress={()=> {
              dispatch({type:'Addtocart',payload:{id:productDetails.id,title:productDetails.title,price:productDetails.price,thumbnail:productDetails.thumbnail,quantity:1}});
              navigation.navigate('Cart')}}
            ><Text style={{fontSize:14,color:"white",fontFamily:"Manrope-SemiBold"}}>Buy now</Text>
            </TouchableOpacity> 
        </View>
        <View style={{...styles.pricencart,flexDirection:"column"}}><Text style={{fontSize:24,fontFamily:"Manrope-SemiBold"}}>Details</Text>
        <Text style={{fontSize:16,fontFamily:"Manrope-Medium"}}>{productDetails.description}</Text></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
  },
  image: {
    height: 300,
    width: '100%'
  },
  pricencart:{
    marginHorizontal: 20,
    marginVertical:5,
    flexDirection:"row"
  },
  title:{
    fontFamily:"Manrope-Bold",
    fontSize: 30,
    marginVertical: 10,
    marginHorizontal: 20
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 22,
    fontFamily:"Manrope-Bold",
    marginBottom: 8,
  },
  description: {
    fontFamily:"Manrope-SemiBold",
    fontSize: 16,
    fontWeight: '400',
    color: '#787878',
    marginBottom: 16,
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  }
});