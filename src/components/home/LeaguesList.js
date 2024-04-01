import * as React from 'react';
import { Divider, List } from 'react-native-paper';
import tw from 'twrnc'
import { useTheme } from '../../context/ThemeContext';
import { View } from 'react-native';
import { get_flag } from '../../utils/match';

const LeaguesList = ({ leagues }) => {
    const [expanded, setExpanded] = React.useState(true);
    const { theme } = useTheme()

    const handlePress = () => setExpanded(!expanded);


    const Item = ({ league }) => {
        return (
            <List.Item
                title={league.name}
                titleStyle={tw`text-[${theme.colors.text}]`}
                style={tw`bg-[${theme.colors.card}] px-3 py-[4px]`}
                left={() => get_flag(league, 20)}
                rippleColor={theme.colors.card100}
                onPress={()=>{}}

            />
        )
    }

    return (



        <List.Accordion
            style={tw`bg-[${theme.colors.card}] shadow shadow-black py-0`}
            titleStyle={tw`text-[${theme.colors.text}] `}
            rippleColor={theme.colors.card100}
            title="Competiciones de la fecha"
            
        >

            {
                leagues.map(league => (
                    <>
                        <Divider key={league.id} style={tw`bg-[${theme.colors.border}] h-[1px] w-[100%] mx-auto`} />
                        <Item league={league} />
                    </>
                ))
            }

        </List.Accordion>
    );
};

export default LeaguesList;