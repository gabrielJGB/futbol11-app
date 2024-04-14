import { View, Text, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import { Switch } from 'react-native-paper';
import { useTheme } from '../../context/ThemeContext';
import tw from 'twrnc'

const SwitchComponent = ({ isSwitchOn, onToggleSwitch }) => {
    const { theme } = useTheme()

    return (
        <TouchableNativeFeedback
            onPress={onToggleSwitch}
        >
            <View
                style={tw`flex flex-row py-2 px-2 items-center justify-between bg-[${theme.colors.card}]`}
            >
                <Text style={tw`text-[${theme.colors.text}]`}>
                   Contraer todas las competiciones
                </Text>

                <Switch
                    value={!isSwitchOn}
                    onValueChange={onToggleSwitch}
                    trackColor={theme.colors.accent}
                    color={theme.colors.accent}

                />
            </View>
        </TouchableNativeFeedback>
    )
}

export default SwitchComponent