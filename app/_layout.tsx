import 'react-native-gesture-handler';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useCallback, useState } from 'react';
import 'react-native-reanimated';
import { ImageBackground, StyleSheet } from 'react-native';
import { Asset } from 'expo-asset';
import { DealsProvider } from './context/DealsContext';

import { useColorScheme } from '../hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && imageLoaded) {
      console.log('Fonts and image are loaded, hiding splash screen');
      await SplashScreen.hideAsync();
    } else {
      console.log('Fonts or image are not yet loaded');
    }
  }, [fontsLoaded, imageLoaded]);

  useEffect(() => {
    console.log('useEffect is triggered');
    onLayoutRootView();
  }, [onLayoutRootView]);

  useEffect(() => {
    const imageUri = require('../assets/images/background.png');
    const asset = Asset.fromModule(imageUri);
    asset.downloadAsync()
      .then(() => {
        console.log('Image loaded');
        setImageLoaded(true);
      })
      .catch((error) => {
        console.error('Failed to load image', error);
      });
  }, []);

  if (!fontsLoaded || !imageLoaded) {
    console.log('Fonts or image are still loading');
    return null;
  }

  console.log('Fonts and image loaded, rendering app');
  return (
    <ImageBackground source={require('../assets/images/background.png')} style={styles.background}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <DealsProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </DealsProvider>
      </ThemeProvider>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Or 'stretch' to fit the screen
  },
});
