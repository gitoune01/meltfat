import {
  View,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../Firebase/config';
import { Audio } from 'expo-av';
import BackBtn from '../Components/BackBtn';

const lastsecsaudio = require('../../assets/audio/assets_audio_countdownaudio.mp3');

const ExerciseScreen = () => {
  const route = useRoute();
  const { item } = route.params;
  const initialTime = 15;
  const minTime = 10;

  const [gifUrl, setGifUrl] = useState(null);
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [ctdSound, setCtdsound] = useState();
  // const [isFirstTime, setIsFirstTime] = useState(true);
    console.log(ctdSound)
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(lastsecsaudio);
    setCtdsound(sound);
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        setIsAudioPlaying(false);
      }
    });
    await sound.playAsync().then(() => setIsAudioPlaying(true));
  }

  const fetchGifUrl = async () => {
    try {
      const storageRef = ref(storage, `AllExercices/${item.gif_url}`);
      const url = await getDownloadURL(storageRef);
      setGifUrl(url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGifUrl();
  }, []);

  const handleDecreaseTime = () => {
    if (!isRunning && time > minTime) {
      setTime((prevTime) => prevTime - 10);
    }
  };
  const handleIncreaseTime = () => {
    if (!isRunning) {
      setTime((prevTime) => prevTime + 10);
    }
  };

  const handleReset = () => {
    setIsRunning(false);

    setTime(initialTime);
    if(ctdSound && isAudioPlaying) {
      ctdSound.stopAsync()
      setIsAudioPlaying(false);
    }
  };

  useEffect(() => {
    let countDownInterval;
    console.log('decreasing time');
    if (isRunning && time > 0) {
      countDownInterval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
        if (time === 4 ) {
          playSound();
        }
      }, 1000);
    } else {
      setIsRunning(false);
      clearInterval(countDownInterval);
    }

    return () => {
      clearInterval(countDownInterval);
    };
  }, [isRunning, time]);

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    if (isRunning) {
      setIsRunning(false);
    }
  };

  return (
    <View className="flex-1">
      {gifUrl ? (
        <Image source={{ uri: gifUrl }} className="w-full h-80" />
      ) : (
        <View className="items-center justify-center">
          <ActivityIndicator size={'large'} color={'gray'} />
        </View>
      )}
      <BackBtn />
      <ScrollView>
        <View className="mt-4 mx-3">
          <Text className="text-2xl font-bold text-center mb-1">
            {item.title}
          </Text>
          <Text className="text-gray-500 mt-1">
            {item.category.split(',').map((cat, index) => (
              <View key={index} className="mr-2">
                <View className=" bg-gray-300 rounded-2xl px-1 mr-2 pb-1">
                  <Text className="text-fuchia-500">{cat}</Text>
                </View>
              </View>
            ))}{' '}
          </Text>
          <View className="flex-row items-center space-x-2">
            <Text className="text-blue-400 mt-2 bg-gray-300 rounded-2xl p-1">
              Intensity:
            </Text>
            <Text className="text-cyan-400 italic text-base">
              {item.intensity}
            </Text>
          </View>
          <Text className="text-xl font-semibold">Instructions:</Text>
          <View className="mt-2">
            {item.instructions.map((inst, index) => (
              <View key={index} className="flex-row items-center mb-1">
                <Text className="text-base text-gray-600">{inst.step}</Text>
                <Text className="ml-2 text-base">{inst.text}</Text>
              </View>
            ))}
          </View>
        </View>
        <View className="mt-4 flex-row items-center justify-center space-x-3">
          <TouchableOpacity
            className="items-center p-5 w-14 h-14 justify-center bg-red-500 rounded-full"
            onPress={handleDecreaseTime}
          >
            <Text className="text-white text-3xl z-1000">-</Text>
          </TouchableOpacity>
          <Text className="text-xl font-bold">{time} secs</Text>
          <TouchableOpacity
            className="items-center p-5 w-14 h-14 justify-center bg-green-500 rounded-full"
            onPress={handleIncreaseTime}
          >
            <Text className="text-green-500 text-3xl">+</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-4 flex-row items-center justify-center mb-10 space-x-4">
          <TouchableOpacity onPress={isRunning ? handlePause : handleStart}>
            <Text className="text-blue-500 text-xl py-2 border rounded-lg border-blue-500 px-4">
              {isRunning ? 'PAUSE' : 'START'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleReset}>
            <Text className="text-gray-500 text-xl py-2 border rounded-lg border-gray-500 px-4">
              RESET
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ExerciseScreen;
