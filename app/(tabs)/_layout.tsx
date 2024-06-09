import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import CustomTabIcon from '@/components/navigation/CustomTabIcon';
import icons from '@/constants/icons';
import { useGlobalContext } from '@/context/GlobalProvider';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { isLoading, isLoggedIn } = useGlobalContext()

  if (!isLoading && !isLoggedIn) return <Redirect href="/sign-in" />;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: '#CDCDE0',
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#161622',
          borderTopWidth: 1,
          borderTopColor: '#232533',
          height: 86,

        }

      }}>

      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <CustomTabIcon icon={icons.home} name={'Home'} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <CustomTabIcon name={'Profile'} color={color} icon={icons.profile} focused={focused} />
          )
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color, focused }) => (
            <CustomTabIcon
              icon={icons.plus}
              color={color}
              name={"Create"}
              focused={focused}

            />
          )
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          title: 'Bookmarks',
          tabBarIcon: ({ color, focused }) => (
            <CustomTabIcon icon={icons.bookmark} name={'Bookmarks'} color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
