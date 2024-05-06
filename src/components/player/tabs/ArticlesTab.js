import { View, Text, ScrollView, Dimensions, Image, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import { usePlayer } from '../../../context/PlayerContext'
import { useTheme } from '../../../context/ThemeContext'
import tw from 'twrnc'
import { convert_timestamp } from '../../../utils/time'
import { useNavigation } from '@react-navigation/native'
import { fetchArticle, fetchVideo } from '../../../utils/fetch'

const ArticlesTab = () => {
  const { theme } = useTheme()
  const { player } = usePlayer()
  const navigation = useNavigation()

  const handlePress = (article) => {

    const isText = article.type === "dStory"
    const url = article.links.api.self.href

    if (isText) {
      fetchArticle(url)
        .then(article => { navigation.push("Article", { article }) })

    }
    else {
      fetchVideo(url)
        .then(video => { navigation.push("Video", { video }) })
    }
  }


  const Card = ({ article }) => {
    return (
      <TouchableNativeFeedback
        onPress={() => handlePress(article)}
      >

        <View style={tw`bg-[${theme.colors.card}] flex flex-col gap-2  pb-3 rounded-lg shadow shadow-black`}>

          {
            "images" in article && article.images.length > 0 &&
            <Image source={{ uri: article.images[0].url }} width={Dimensions.get('window').width - 8} height={Dimensions.get('window').width / 2} />
          }

          <View style={tw`flex flex-col gap-2 px-2`}>
            <Text style={tw`text-[${theme.colors.text}] mt-2 text-xs `} >
              {`${convert_timestamp(article.published).dayOfWeek} ${convert_timestamp(article.published).day} de ${convert_timestamp(article.published).month} de ${convert_timestamp(article.published).year}, ${convert_timestamp(article.published).time}hs`}
            </Text>
            <Text style={tw`text-[${theme.colors.text}] text-[23px] `}>{article.headline}</Text>
            <Text style={tw`text-[${theme.colors.text100}] text-sm leading-normal`}>{article.description}</Text>
          </View>

        </View>
      </TouchableNativeFeedback>
    )
  }


  return (
    <ScrollView>
      <View style={tw`flex flex-col gap-6 mx-1 mt-2 mb-60`}>

        {
          player.news.map((article,i) => (
            <Card key={i} article={article} />
          ))
        }

      </View>
    </ScrollView>
  )
}

export default ArticlesTab