import React, { useEffect } from 'react'

import tw from 'twrnc'
import { View, Text, ScrollView, Image, Dimensions } from 'react-native'
import { useTheme } from '../../../context/ThemeContext';
import { useGame } from '../../../context/GameContext';
import { Divider, Icon } from 'react-native-paper';
import { convert_timestamp } from '../../../utils/time';
import VideoCard from '../VideoCard';

const InfoTab = () => {


  const { theme } = useTheme()
  const { game } = useGame()

  const x = convert_timestamp(game.data.header.competitions[0].date)
  const date = `${x.dayOfWeek} ${x.day} de ${x.month} de ${x.year}, ${x.time} hs`




  const Card = ({ title, value, icon }) => {


    value = value === "Ida" ? "Partido de Ida" : value

    return (
      <View style={tw`bg-[${theme.colors.card}] flex flex-row items-center gap-2 p-2`}>

        <View style={tw`p-1`}>
          <Icon source={icon} color={theme.colors.text} size={30} />
        </View>
        <View>
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

      <View style={tw`mt-2 mb-10`}>
        <Text style={tw`text-[${theme.colors.text}] bg-[${theme.colors.card}] w-full text-center py-2 text-lg font-semibold`}>INFORMACIÓN DEL PARTIDO</Text>

        <Divider style={tw`bg-[${theme.colors.border}] h-[1px] w-[100%] mx-auto`} />

        <Card title="Fecha" value={date} icon={"calendar-month"} />

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


        {
          "videos" in game.data && game.data.videos.length > 0 &&

          <View style={tw`bg-[${theme.colors.card}] mt-2 `}>
            <VideoCard video={game.data.videos[0]} />
          </View>
        }



        {
          "article" in game.data && "headline" in game.data.article &&

          <Text style={tw`bg-[${theme.colors.card}] mt-2 py-1 w-full pb-3 text-2xl px-2 leading-normal text-[${theme.colors.text}]`}>
            {game.data.article.headline}
          </Text>


        }

        {
          "article" in game.data && "images" in game.data.article &&
          <View style={tw`bg-[${theme.colors.card}] flex flex-col items-center gap-3 `}>
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
    </ScrollView>
  )
}

export default InfoTab
