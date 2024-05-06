import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, RefreshControl, TouchableNativeFeedback } from 'react-native'
import tw from 'twrnc'
import { fetchAllLeagues, fetch_URL } from '../utils/fetch'
import LeagueCard from '../components/home/LeagueCard'
import { convert_timestamp, date_to_YYYYMMDD, is_same_day } from '../utils/time'
import ModalComponent from '../components/home/ModalComponent'
import { FAB } from 'react-native-paper'
import LoadingCard from '../components/home/LoadingCard'
import HomeButtons from '../components/home/HomeButtons'
import { useTheme } from '../context/ThemeContext'
import SwitchComponent from '../components/home/SwitchComponent'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useApp } from '../context/AppContext'


const HomeScreen = () => {
  const [leagues, setLeagues] = useState(false)
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [showOnlyLive, setShowOnlyLive] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { setSofaEvents, setSofaDate } = useApp()

  const onToggleSwitch1 = () => setIsSwitchOn(!isSwitchOn);
  const onToggleSwitch2 = () => setShowOnlyLive(!showOnlyLive);


  const navigation = useNavigation()

  const route = useRoute()
  const { theme } = useTheme()

  useEffect(() => {
    !is_same_day(selectedDate, new Date()) && setShowOnlyLive(false)
    _fetchAllLeagues()
    
    const intervalId = setInterval(()=>{
      _fetchAllLeagues()
      _fetchAllLeagues()
    }, 1000 * 30)
    return () => clearInterval(intervalId)

  }, [selectedDate])




  useEffect(() => {

    const x = convert_timestamp(selectedDate)
    const formatedDate = `${x.year}-${x.monthNum}-${x.day.toString().padStart(2, '0')}`
    setSofaDate(x)

    fetch_URL(`https://api.sofascore.com/api/v1/sport/football/scheduled-events/${formatedDate}`)
      .then(resp => setSofaEvents(resp.events.map(game => { return { id: game.id, homeTeam: game.homeTeam, awayTeam: game.awayTeam } })))
      .catch(error => setSofaEvents(false))


  }, [selectedDate])



  useEffect(() => {
 
    // navigation.navigate("Team", { team_id: "5", league_slug: "arg.1", season: "2017" })
    // navigation.navigate("Game", { id: 702161 })
    // navigation.navigate("League",{id:"arg.copa_lpf"}) 
    // navigation.navigate("Player", { id: 125298 })  c


    _fetchAllLeagues()
    _fetchAllLeagues()
    _fetchAllLeagues() 

  }, [])


  const _fetchAllLeagues = () => {
    console.log("Fetching leagues...")

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

            <View style={tw`flex flex-col gap-[1px]`}>

              <SwitchComponent isSwitchOn={isSwitchOn} onToggleSwitch={onToggleSwitch1} text={"Contraer todas las competiciones"} />

              {
                is_same_day(selectedDate, new Date()) &&
                <SwitchComponent isSwitchOn={showOnlyLive} onToggleSwitch={onToggleSwitch2} text={"Sólo partidos en vivo"} />
              }
            </View>



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