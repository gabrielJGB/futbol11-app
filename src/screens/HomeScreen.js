import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import tw from 'twrnc'
import { fetchAllLeagues } from '../utils/fetch'
import LeagueCard from '../components/home/LeagueCard'
import { date_to_YYYYMMDD } from '../utils/time'
import ModalComponent from '../components/home/ModalComponent'
import { Button } from 'react-native-paper'

const HomeScreen = () => {
  const [leagues, setLeagues] = useState(false)
  const [loading, setLoading] = useState(true)
  const [modalVisible,setModalVisible] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {

    fetchAllLeagues(date_to_YYYYMMDD(selectedDate))
      .then(leagues => setLeagues(leagues))
      .finally(() => setLoading(false))

  }, [])


  if (loading)
    return <Text style={tw`text-white`}>Cargando...</Text>


  return (
    <ScrollView>

      <Button onPress={()=>setModalVisible(!modalVisible)}>Open Modal</Button>

      <View style={tw`flex flex-col gap-4 mt-3 pb-10 mx-1`}>
        {
          leagues.map((league,i) => (
            <LeagueCard key={i} league={league} />
          ))
        }
      </View>

      <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible} />

    </ScrollView>
  )
}

export default HomeScreen