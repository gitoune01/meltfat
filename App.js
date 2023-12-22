import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WorkoutScreen from './src/Screens/WorkoutScreen';
import CalculationScreen from './src/Screens/CalculationScreen';
import TimerScreen from './src/Screens/TimerScreen';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import ExerciseScreen from './src/Screens/ExerciseScreen';






const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    Latob: require('./assets/fonts/Lato-Bold.ttf'),
    Lator: require('./assets/fonts/Lato-Regular.ttf'),
   });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }



  //tab screen

  function TabNavigator() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ color, size }) => {
            let iconName;
            switch (route.name) {
              case 'workout':
                iconName = 'dumbbell';
                return (
                  <FontAwesome5 name={iconName} size={size} color={color} />
                );
              case 'timer':
                iconName = 'timer-outline';
                return <Ionicons name={iconName} size={size} color={color} />;
              case 'calc':
                iconName = 'calculator-outline';
                return <Ionicons name={iconName} size={size} color={color} />;
            }
          },
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'black',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingVertical: 5,
          },
          tabBarActiveTintColor: 'aqua',
          tabBarInactiveTintColor: 'white',
        })}
      >
        <Tab.Screen name="workout" component={WorkoutScreen} />
        <Tab.Screen name="timer" component={TimerScreen} />
        <Tab.Screen name="calc" component={CalculationScreen} />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer onLayout={onLayoutRootView}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="tabs" component={TabNavigator} />
        <Stack.Screen name="exercise" component={ExerciseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
