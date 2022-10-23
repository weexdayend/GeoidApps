import React from 'react'
import { View, Text } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Provider } from 'react-redux'
import { store } from './store'

import * as Icons from 'react-native-heroicons/solid'
import * as Icon from 'react-native-heroicons/outline'

import HomeScreen from './screens/HomeScreen'
import SearchScreen from './screens/SearchScreen'
import CategoryScreen from './screens/CategoryScreen'
import ProfileScreen from './screens/ProfileScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import CartScreen from './screens/CartScreen'
import BrandScreen from './screens/BrandScreen'

const Stack = createNativeStackNavigator()
const Tabs  = createBottomTabNavigator()

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName='Home'
    >
      <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

function SearchStack() {
  return(
    <Stack.Navigator
      initialRouteName='Search'
    >
      <Stack.Screen name='Search' component={SearchScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

function CategoryStack() {
  return (
    <Stack.Navigator
      initialRouteName='Category'
    >
      <Stack.Screen name='Category' component={CategoryScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName='Profile'
    >
      <Stack.Screen name='Profile' component={ProfileScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

function BottomNav() {
  return (
    <Tabs.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarStyle: {
          height: 80,
          paddingBottom: 20,
        }
      }}
    >
      <Tabs.Screen
        name='HomeStack'
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <View className='flex items-center top-3'>
              {
                focused?
                <View className='flex items-center'>
                  <Icons.HomeIcon fill={'#009245'} size={24} />
                  <Text className='text-[#009245] text-base'>Home</Text>
                </View>
                :
                <Icon.HomeIcon color={'#bababa'} size={24} />
              }
            </View>
          )
        }}
      />
      <Tabs.Screen
        name='SearchStack'
        component={SearchStack}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <View className='flex items-center top-3'>
              {
                focused?
                <View className='flex items-center'>
                  <Icons.MagnifyingGlassIcon fill={'#009245'} size={24} />
                  <Text className='text-[#009245] text-base'>Search</Text>
                </View>
                :
                <Icons.MagnifyingGlassIcon fill={'#bababa'} size={24} />
              }
            </View>
          )
        }}
      />
      <Tabs.Screen
        name='CategoryStack'
        component={CategoryStack}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <View className='flex items-center top-3'>
              {
                focused?
                <View className='flex items-center'>
                  <Icons.TagIcon fill={'#009245'} size={24} />
                  <Text className='text-[#009245] text-base'>Category</Text>
                </View>
                :
                <Icon.TagIcon color={'#bababa'} size={24} />
              }
            </View>
          )
        }}
      />
      <Tabs.Screen
        name='ProfileStack'
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <View className='flex items-center top-3'>
              {
                focused?
                <View className='flex items-center'>
                  <Icons.UserIcon fill={'#009245'} size={24} />
                  <Text className='text-[#009245] text-base'>Profile</Text>
                </View>
                :
                <Icon.UserIcon color={'#bababa'} size={24} />
              }
            </View>
          )
        }}
      />
    </Tabs.Navigator>
  )
}

function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={BottomNav} options={{headerShown: false}} />
          <Stack.Screen name='Login' component={LoginScreen} options={{ presentation: 'modal', headerShown: false}} />
          <Stack.Screen name='Register' component={RegisterScreen} options={{ presentation: 'modal', headerShown: false}} />
          <Stack.Screen name='Cart' component={CartScreen} options={{ presentation: 'modal', headerShown: false}} />
          <Stack.Screen name='Brand' component={BrandScreen} options={{ presentation: 'fullScreenModal', headerShown: false}} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  )
}

export default App