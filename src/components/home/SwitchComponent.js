import { View, Text, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import { Switch } from 'react-native-paper';
import { useTheme } from '../../context/ThemeContext';
import tw from 'twrnc'

const SwitchComponent = ({ isSwitchOn, onToggleSwitch, text }) => {
    const { theme } = useTheme()

    return (
        <TouchableNativeFeedback
            onPress={onToggleSwitch}
            style={tw`py-2`}
        >
            <View
                style={tw`flex flex-row px-2 items-center justify-between bg-[${theme.colors.card}]`}
            >
                <Text style={tw`text-[${theme.colors.text}]`}>
                   {text}
                </Text>

                <Switch
                    value={isSwitchOn}
                    onValueChange={onToggleSwitch}
                    trackColor={theme.colors.accent}
                    color={theme.colors.accent}

                />
            </View>
        </TouchableNativeFeedback>
    )
}

export default SwitchComponent