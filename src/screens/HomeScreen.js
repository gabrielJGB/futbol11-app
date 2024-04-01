import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, RefreshControl, TouchableNativeFeedback } from 'react-native'
import tw from 'twrnc'
import { fetchAllLeagues } from '../utils/fetch'
import LeagueCard from '../components/home/LeagueCard'
import { date_to_YYYYMMDD } from '../utils/time'
import ModalComponent from '../components/home/ModalComponent'
import { FAB } from 'react-native-paper'
import LoadingCard from '../components/home/LoadingCard'
import HomeButtons from '../components/home/HomeButtons'
import { useTheme } from '../context/ThemeContext'
import LeaguesList from '../components/home/LeaguesList'


const HomeScreen = () => {
  const [leagues, setLeagues] = useState(false)
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const [refreshing, setRefreshing] = useState(false);
  const { theme } = useTheme()

  useEffect(() => {

    _fetchAllLeagues()

    const intervalId = setInterval(() => {
      _fetchAllLeagues()
    }, 1000 * 120)

    return () => clearInterval(intervalId)

  }, [selectedDate])


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

    <View >
      {/* <Button buttonColor='navy' onPress={() => setModalVisible(!modalVisible)}>Open Modal</Button> */}
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

            {
              leagues &&
              <LeaguesList leagues={leagues}/>
            }

            <View style={tw`flex flex-col gap-4 mb-30`}>

              {
                leagues?.map((league, i) => (
                    <LeagueCard key={i} league={league} />
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
        icon="calendar"
        color='white'
        mode='elevated'
        style={tw`absolute bottom-15 right-5 bg-[${theme.colors.accent}]`}
        onPress={() => setModalVisible(!modalVisible)}
      />

    </View>
  )
}

export default HomeScreen