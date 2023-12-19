import { View, Text } from 'react-native'
import React from 'react'
import ExerciceItem from './ExerciceItem'
import { AntDesign } from '@expo/vector-icons';

const Exercice = () => {
  return (
    <View>
         <View className='flex-row items-center justify-between mx-10 mb-3'>
          <Text className='text-xl font-bold'>Exercices</Text>
          <AntDesign name="swapright" size={30} color="black" />
       </View>
       <ExerciceItem />
    </View>
  )
}

export default Exercice