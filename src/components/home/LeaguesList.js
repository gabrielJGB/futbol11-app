import * as React from 'react';
import { List } from 'react-native-paper';
import tw from 'twrnc'
import { useTheme } from '../../context/ThemeContext';

const LeaguesList = () => {
    const [expanded, setExpanded] = React.useState(true);
    const {theme} = useTheme()

    const handlePress = () => setExpanded(!expanded);

    return (
        <List.Section>
            <List.Accordion title="Ligas" >
                <List.Item title="First item" />
                <List.Item title="Second item" />
            </List.Accordion>
        </List.Section>
    );
};

export default LeaguesList;