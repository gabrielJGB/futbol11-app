import { View, Text, ScrollView, Dimensions, Image, TouchableNativeFeedback, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTeam } from '../../../context/TeamContext'
import { useTheme } from '../../../context/ThemeContext'
import tw from 'twrnc'

import { useNavigation } from '@react-navigation/native'
import { fetchArticles } from '../../../utils/fetch'
import { convert_timestamp } from '../../../utils/time'
import { Divider } from 'react-native-paper'

const ArticlesTab = () => {

  const { team } = useTeam()
  const { theme } = useTheme()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()


  useEffect(() => {


    fetchArticles(team.team.id)
      .then(resp => setArticles(resp))
      .finally(() => setLoading(false))

  }, [])




  const Card = ({ article }) => {
    return (
      <TouchableNativeFeedback
        onPress={() => navigation.navigate("Article", { article, team: team.team })}
      >

        <View style={tw`bg-[${theme.colors.card}] flex flex-col gap-2  pb-3 rounded shadow shadow-black`}>

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

  if (loading)
    return <ActivityIndicator color='white' style={{ marginTop: 20 }} size={30} />

  return (
    <ScrollView>
      <View style={tw`mx-1 mt-4s mb-20`}>

        <View style={tw`flex flex-col gap-6`}>
          {
            articles.map((article, i) => (
              <>
                <Card key={i} article={article} />
                {
                  i != articles.length - 1 &&
                  <Divider style={tw`bg-[${theme.colors.border}] h-[1px] w-[90%] mx-auto`} />
                }
              </>
            ))
          }
        </View>

      </View>
    </ScrollView>
  )
}

export default ArticlesTab