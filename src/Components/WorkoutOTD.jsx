import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'

const WorkoutOTD = () => {
  return (
    <TouchableOpacity className='items-center justify-center'>
        <View className='rounded-3xl overflow-hidden h-40 w-[80%]'>
            <ImageBackground source={require('../../assets/images/wkout01.jpg')} className='flex-1 justify-center items-center'>
                <View >
                   <Text className='text-white/90 text-2xl tracking-tight' style={{fontFamily:'Lator'}}>Workout Of The Day</Text>
                </View>
           </ImageBackground>
        </View>
    </TouchableOpacity>
  )
}

export default WorkoutOTD

