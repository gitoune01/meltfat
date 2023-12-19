import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityBase,
  ImageBackground,
} from 'react-native';
import React from 'react';
import workoutData from '../../exercise_data.json';
import { FlashList } from '@shopify/flash-list';

const exoImg = require('../../assets/images/exercise1.jpg');

const ExerciceItem = () => {
  const renderWorkoutItem = ({ item }) => (
    <TouchableOpacity>
      <ImageBackground
        source={exoImg}
        className="h-44 w-40 rounded-2xl overflow-hidden my-2"
      >
        <View className='justify-between flex-1 m-3'>
          <Text className='text-white font-medium tracking-widest'>{item.category}</Text>
          <Text className='text-white font-medium tracking-widest'>{item.title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  const RenderRow = ({ item, index }) => {
    if (index % 2 === 0) {
      const nextItem = workoutData[index + 1];
      return (
        <View className="flex-row justify-around">
          {renderWorkoutItem({ item })}
          {nextItem && renderWorkoutItem({ item: nextItem })}
        </View>
      );
    }
  };

  return (
    <View className='min-h-screen'>
      <FlashList
        data={workoutData}
        renderItem={RenderRow}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={200}
     
      />
    </View>
  );
};

export default ExerciceItem;
