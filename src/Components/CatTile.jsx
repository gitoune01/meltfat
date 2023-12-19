import { View, Text, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import React from 'react';
import { wkoutData } from '../data';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const CatTile = () => {

const renderItem = ({item}) => (
   <TouchableOpacity>
      <ImageBackground source={item.imgSrc} className='h-36 w-40 rounded-xl overflow-hidden mx-2 bg-yellow-900'>
         <View className='flex-1 justify-between m-3'>
             <View className='flex-row items-center space-x-1'>
             <MaterialCommunityIcons name="dumbbell" size={15} color="white" />
             <Text className='text-white font-bold tracking-widest'>{item.nbOfex}</Text>
             </View>
             <Text className='text-white font-medium tracking-widest'>{item.title}</Text>

         </View>
      </ImageBackground>
   </TouchableOpacity>
   

)



  return (
    <View>
       <FlatList 
         data={wkoutData}
         renderItem={renderItem}
         keyExtractor={(item)=> item.id}
         horizontal={true}
         showsHorizontalScrollIndicator={false}
     

       />
    </View>
  );
};

export default CatTile;
