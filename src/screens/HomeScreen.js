import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, RefreshControl, TouchableNativeFeedback } from 'react-native'
import tw from 'twrnc'
import { fetchAllLeagues } from '../utils/fetch'
import LeagueCard from '../components/home/LeagueCard'
import { date_to_YYYYMMDD, is_same_day } from '../utils/time'
import ModalComponent from '../components/home/ModalComponent'
import { FAB } from 'react-native-paper'
import LoadingCard from '../components/home/LoadingCard'
import HomeButtons from '../components/home/HomeButtons'
import { useTheme } from '../context/ThemeContext'
import SwitchComponent from '../components/home/SwitchComponent'
import { useNavigation } from '@react-navigation/native'


const HomeScreen = () => {
  const [leagues, setLeagues] = useState(false)
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [showOnlyLive, setShowOnlyLive] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onToggleSwitch1 = () => setIsSwitchOn(!isSwitchOn);
  const onToggleSwitch2 = () => setShowOnlyLive(!showOnlyLive);


  const navigation = useNavigation()
  const { theme } = useTheme()

  useEffect(() => {

    _fetchAllLeagues()
    const intervalId = setInterval(() => {
      _fetchAllLeagues()
    }, 1000 * 30)


    !is_same_day(selectedDate, new Date()) && setShowOnlyLive(false)

    return () => clearInterval(intervalId)
 
  }, [selectedDate])

  useEffect(() => {

    // BORRAR:      
    navigation.navigate("Team", { team_id: "5", league_slug: "arg.1", season: "2024" })
    // navigation.navigate("Game",{id:693422}) 


    _fetchAllLeagues()
    _fetchAllLeagues()
    _fetchAllLeagues()

  }, [])


  const _fetchAllLeagues = () => {

    fetchAllLeagues(date_to_YYYYMMDD(selectedDate))
      .then(resp => setLeagues(resp))
      .then(() => setRefreshing(false))
      .finally(() => setLoading(false))

  }

  const onRefresh = () => {
    setLoading(true)
    setRefreshing(true);
    _fetchAllLeagues()

  };





  return (

    <View style={tw` h-[100%]`}>

      <HomeButtons
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setLoading={setLoading}
      />

      {
        loading ?
          <LoadingCard />
 
          :

          <ScrollView
            contentContainerStyle={tw`flex flex-col gap-4 mx-1 pt-3`}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#0000']} enabled />}
          >



            <SwitchComponent isSwitchOn={isSwitchOn} onToggleSwitch={onToggleSwitch1} text={"Contraer todas las competiciones"} />

            {
              is_same_day(selectedDate, new Date()) &&
              <SwitchComponent isSwitchOn={showOnlyLive} onToggleSwitch={onToggleSwitch2} text={"Sólo partidos en vivo"} />
            }  
  



            <View style={tw`flex flex-col  gap-3  mb-30`}>

              {
                leagues?.map((league, i) => (
                  <LeagueCard key={i} league={league} isSwitchOn={isSwitchOn} showOnlyLive={showOnlyLive} />
                ))
              }

            </View>

            <ModalComponent
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              setLoading={setLoading}
            />

          </ScrollView>
      }

      <FAB
        icon="calendar-month"
        color='white'
        mode='elevated'
        style={tw`absolute bottom-5 right-5 bg-[${theme.colors.accent}]`}
        onPress={() => setModalVisible(!modalVisible)}
      />


    </View>
  )
}

export default HomeScreen