import { View, Text, ScrollView} from 'react-native'
import React from 'react'
import Welcome from '../Components/Welcome'
import { SafeAreaView } from 'react-native-safe-area-context'
import WorkoutOTD from '../Components/WorkoutOTD'
import Separator from '../Components/Separator'
import Category from '../Components/Category'
import Exercice from '../Components/Exercice'




const WorkoutScreen = () => {
  return (
    <SafeAreaView className="mx-[1%]">
      <Welcome />
      <ScrollView>
        <WorkoutOTD />
        <Separator />
        <Category />
        <Separator />
        <Exercice />
      </ScrollView>
    </SafeAreaView>
  );
}

export default WorkoutScreen