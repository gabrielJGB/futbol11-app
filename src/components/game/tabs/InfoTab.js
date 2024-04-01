import { View, Text } from 'react-native'
import { useRoute } from '@react-navigation/native';
import React from 'react'
import { useTheme } from '../../../context/ThemeContext';
import tw from 'twrnc'

const InfoTab = () => {
  const route = useRoute();
  
  const { theme } = useTheme()



  return (
    <View>
      <Text style={tw`text-[${theme.colors.text}]`}>
        
      </Text>
    </View>
  )
}

export default InfoTab
