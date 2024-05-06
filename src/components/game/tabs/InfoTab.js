import React, { useEffect, useState } from 'react'

import tw from 'twrnc'
import { View, Text, ScrollView, Image, Dimensions } from 'react-native'
import { WebView } from 'react-native-webview'
import { useTheme } from '../../../context/ThemeContext';
import { useGame } from '../../../context/GameContext';
import { ActivityIndicator, Button, Divider, Icon } from 'react-native-paper';
import { convert_timestamp, is_same_day } from '../../../utils/time';
import VideoCard from '../VideoCard';
import { fetch_URL } from '../../../utils/fetch';
import { useApp } from '../../../context/AppContext';
import {  useNavigation, useRoute } from '@react-navigation/native';

const InfoTab = () => {


  const { theme, isDarkMode } = useTheme()
  const { game, sofaId, video } = useGame()
  const { sofaDate } = useApp()
  const  navigation  = useNavigation()

  const gameDate = convert_timestamp(game.data.header.competitions[0].date)
  const dateString = `${gameDate.dayOfWeek} ${gameDate.day} de ${gameDate.month} de ${gameDate.year}, ${gameDate.time} hs`



  const Card = ({ title, value, icon }) => {
    

    value = value === "Ida" ? "Partido de Ida" : value

    return (
      <View style={tw` flex flex-row items-center gap-2 p-2`}>

        <View style={tw`p-1`}>
          <Icon source={icon} color={theme.colors.text} size={30} />
        </View>
        <View style={tw`w-[80%]`}>
          {
            title &&
            <Text style={tw`text-[${theme.colors.text200}] font-semibold text-xs`} >{title}</Text>
          }
          <Text style={tw`text-[${theme.colors.text}] `} >{value}</Text>
        </View>
      </View>
    )
  }


  return (
    <ScrollView style={tw`mx-1`}>
      <View style={tw`flex flex-col gap-4 mt-2 mb-20 pt-0`}>


        {/* ATTACK MOMENTUM */}
        {
          sofaId &&
          <View style={tw`bg-[${theme.colors.card}] rounded-lg shadow shadow-black`}>


            <Text style={tw`text-[${theme.colors.text}] w-full text-center py-2 text-lg font-semibold`}>ATTACK MOMENTUM</Text>
            <Text style={tw`text-[${theme.colors.text100}] px-2 pb-2 text-xs `}>Attack Momentum™ te permite seguir el partido en vivo con un algoritmo que muestra la presión de cada equipo a lo largo del tiempo.</Text>

            <WebView
              source={{ uri: `https://widgets.sofascore.com/es-ES/embed/attackMomentum?id=${sofaId}&widgetBackground=${isDarkMode ? "Black" : "Gray"}&v=2` }}
              style={tw`w-[97%] h-[194px] mb-2  mx-auto bg-[${theme.colors.card}]`}
            />

          </View>
        }

        {/* INFORMACION DEL PARTIDO */}
        <View style={tw`bg-[${theme.colors.card}] rounded-lg shadow shadow-black`}>

          <Text style={tw`text-[${theme.colors.text}] w-full text-center py-2 text-lg font-semibold`}>INFORMACIÓN DEL PARTIDO</Text>

          <Divider style={tw`bg-[${theme.colors.border}] h-[1px] w-[100%] mx-auto`} />

          <Card title="Fecha" value={dateString} icon={"calendar-month"} />

          {
            "venue" in game.data.gameInfo && "city" in game.data.gameInfo.venue.address &&

            <Card title="Ciudad" value={`${game.data.gameInfo.venue.address.city}${"country" in game.data.gameInfo.venue.address ? ", " + game.data.gameInfo.venue.address.country : ""}`} icon={"city"} />
          }

          {
            "venue" in game.data.gameInfo && game.data.gameInfo.venue &&

            <Card title={"Estadio"} value={game.data.gameInfo.venue.fullName} icon={"stadium"} />

          }

          {
            "attendance" in game.data.gameInfo && game.data.gameInfo.attendance > 0 &&

            <Card title={"Espectadores"} value={game.data.gameInfo.attendance} icon={"crowd"} />

          }

          {
            "officials" in game.data.gameInfo &&

            <Card title={"Arbitro"} value={game.data.gameInfo.officials[0].fullName} icon={"whistle"} />

          }

          {
            "gameNote" in game.data.header &&

            game.data.header.gameNote.split(" - ").map((note, i) => (
              <Card
                key={i}
                title={false}
                value={note.replace("Juego", "Partido")}
                icon="information"
              />
            ))

          }

          {
            "groups" in game.data.header.competitions[0].competitors[0] &&

            <Card
              title={false}
              value={game.data.header.competitions[0].competitors[0].groups.abbreviation}
              icon="information-outline"
            />


          }



          {
            !"groups" in game.data.header.competitions[0].competitors[0] &&
            game.data.header.competitions[0].groups?.abbreviation.includes("Grupo") &&


            <Card
              title={false}
              value={game.data.header.competitions[0].groups.abbreviation}
              icon="information-outline"
            />

          }


        </View>

        {
          video &&

          <View style={tw`bg-[${theme.colors.card}] rounded-lg shadow shadow-black`}>
            <VideoCard video={video} />
          </View>

        }

        {/* VIDEO DESTACADO */}
        <View style={tw`bg-[${theme.colors.card}] rounded-lg shadow shadow-black`}>
          {
            "videos" in game.data && game.data.videos.length > 0 &&
            <VideoCard video={game.data.videos[0]} />
          }
        </View>

        {/* ARTICULO */}
        <View style={tw`bg-[${theme.colors.card}] rounded-lg shadow shadow-black`}>

          {
            "article" in game.data && "headline" in game.data.article &&

            <Text style={tw`py-1 w-full pb-3 text-2xl px-2  leading-normal text-[${theme.colors.text}]`}>
              {game.data.article.headline}
            </Text>


          }

          {
            "article" in game.data && "images" in game.data.article &&
            <View style={tw`flex flex-col items-center gap-3 `}>
              {
                game.data.article.images.map((image, i) => (

                  <Image key={i} source={{ uri: image.url }} width={Dimensions.get('window').width - 8} height={Dimensions.get('window').width / 2} />
                ))
              }
            </View>

          }

          {
            "article" in game.data &&
            <Text style={tw`bg-[${theme.colors.card}]  text-justify leading-normal text-sm w-full mb-3 px-2 py-3 text-[${theme.colors.text}]`}>{game.data.article.story.replaceAll("<p>", "\n").replaceAll("</p>", "").replaceAll("<strong>", "").replaceAll("</strong>", "").replaceAll("<photo1>", "")} </Text>
          }

        </View>

        <View style={tw`w-[97%] mx-auto`}>
          <Button
            buttonColor='black'
            textColor='white'
            labelStyle={{ fontSize: 14 }}
            mode='outlined'
            onPress={() => navigation.push("League", { id: game.data.header.league.slug })}
          >Ir a {game.data.header.league.name}</Button>
        </View>

      </View>
    </ScrollView>
  )
}

export default InfoTab
