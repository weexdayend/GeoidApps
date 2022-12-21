import React, { useRef } from 'react'
import { View, Text, Dimensions, Animated } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store } from './store'

import * as Icons from 'react-native-heroicons/solid'
import * as Icon from 'react-native-heroicons/outline'
import * as Animatable from 'react-native-animatable'
import { styles } from './fontStyles'
import LinearGradient from 'react-native-linear-gradient';

import HomeScreen from './screens/HomeScreen'
import SearchScreen from './screens/SearchScreen'
import CategoryScreen from './screens/CategoryScreen'
import ProfileScreen from './screens/ProfileScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import CartScreen from './screens/CartScreen'
import BrandScreen from './screens/BrandScreen'
import AddressScreen from './screens/AddressScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlacingScreen from './screens/PlacingScreen'
import OrderScreen from './screens/OrderScreen'
import VoucherScreen from './screens/VoucherScreen'
import AddressFormScreen from './screens/AddressFormScreen'
import HistoryScreen from './screens/HistoryScreen'
import CategoryBrandScreen from './screens/CategoryBrandScreen'

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

function HistoryStack() {
  return(
    <Stack.Navigator
    initialRouteName='History'
    >
      <Stack.Screen name='History' component={HistoryScreen} options={{ headerShown: false }} />
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
const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return (
    <>
    <Tabs.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarStyle: {
          height: 97,
          paddingHorizontal: 15,
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
            <View className='w-full h-full items-center justify-center'>
              <View className='w-20 h-full rounded-xl py-4 items-center'>
                {
                  focused ?
                  <Icons.HomeIcon className='text-[#009245] scale-[1.2]' />
                  :
                  <Icon.HomeIcon className='text-[#bababa] scale-[1]'/>
                }
                <Text className={` mt-1 text-xs ${focused ? "text-[#009245]" : "text-[#bababa]"} `}>Home</Text>
              </View>
            </View>
          )
        }} listeners={({navigation, route}) => ({
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          }
        })}
      />
      <Tabs.Screen
        name='HistoryStack'
        component={HistoryStack}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <View className='w-full h-full items-center justify-center'>
              <View className='w-20 h-full rounded-xl py-4 items-center'>
                {
                  focused ?
                  <Icons.InboxIcon className='text-[#009245] scale-[1.2]' />
                  :
                  <Icon.InboxIcon className='text-[#bababa] scale-[1]' />
                }
                <Text className={` mt-1 text-xs ${focused ? "text-[#009245]" : "text-[#bababa]"} `}>History</Text>
              </View>
            </View>
          )
        }} listeners={({navigation, route}) => ({
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth(),
              useNativeDriver: true
            }).start();
          }
        })}
      />
      <Tabs.Screen
        name='CategoryStack'
        component={CategoryStack}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <View className='w-full h-full items-center justify-center'>
              <View className='w-20 h-full rounded-xl py-4 items-center'>
                {
                  focused ?
                  <Icons.RectangleGroupIcon className='text-[#009245] scale-[1.2]' />
                  :
                  <Icon.RectangleGroupIcon className='text-[#bababa] scale-[1]' />
                }
                <Text className={` mt-1 text-xs ${focused ? "text-[#009245]" : "text-[#bababa]"} `}>Category</Text>
              </View>
            </View>
          )
        }} listeners={({navigation, route}) => ({
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 2,
              useNativeDriver: true
            }).start()
          }
        })}
      />
      <Tabs.Screen
        name='ProfileStack'
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <View className='w-full h-full items-center justify-center'>
              <View className='w-20 h-full rounded-xl py-4 items-center'>
                {
                  focused ?
                  <Icons.UserIcon className='text-[#009245] scale-[1.2]' />
                  :
                  <Icon.UserIcon className='text-[#bababa] scale-[1]' />
                }
                <Text className={` mt-1 text-xs ${focused ? "text-[#009245]" : "text-[#bababa]"} `}>Profile</Text>
              </View>
            </View>
          )
        }} listeners={({navigation, route}) => ({
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 3,
              useNativeDriver: true
            }).start()
          }
        })}
      />
    </Tabs.Navigator>
    <View className='flex h-4 bottom-20 absolute left-7'>
      <Animated.View
        style={{ 
          width: getWidth() - 25,
          height: 3,
          backgroundColor: '#009245',
          transform: [
            { translateX: tabOffsetValue }
          ],
          borderBottomLeftRadius: 60,
          borderBottomRightRadius: 60
        }}
      >
        <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 1}} colors={['rgba(52, 223, 132, 0.1)', 'rgba(0, 146, 69, 0)']} className='p-6'></LinearGradient>
      </Animated.View>
    </View>
    </>
  )
}

function getWidth() {
  let width = Dimensions.get('window').width

  width = width - 30

  return width / 4
}

function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Provider store={store}>
          <Stack.Navigator>
            <Stack.Screen name='Home' component={BottomNav} options={{headerShown: false}} />
            <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false}} />
            <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false}} />
            <Stack.Screen name='Cart' component={CartScreen} options={{ presentation: 'fullScreenModal', headerShown: false}} />
            <Stack.Screen name='Brand' component={BrandScreen} options={{ presentation: 'fullScreenModal', headerShown: false}} />
            <Stack.Screen name='Address' component={AddressScreen} options={{ presentation: 'modal', headerShown: false}} />
            <Stack.Screen name='Payment' component={PaymentScreen} options={{ presentation: 'modal', headerShown: false}} />
            <Stack.Screen name='Placing' component={PlacingScreen} options={{ presentation: 'fullScreenModal', headerShown: false}} />
            <Stack.Screen name='Order' component={OrderScreen} options={{ presentation: 'fullScreenModal', headerShown: false}} />
            <Stack.Screen name='Voucher' component={VoucherScreen} options={{ presentation: 'modal', headerShown: false}} />
            <Stack.Screen name='AddAddress' component={AddressFormScreen} options={{ presentation: 'fullScreenModal', headerShown: false}} />
      <Stack.Screen name='SelectedBrand' component={CategoryBrandScreen} options={{ presentation: 'fullScreenModal', headerShown: false }} />
          </Stack.Navigator>
        </Provider>
      </NavigationContainer>
    </QueryClientProvider>
  )
}

export default App