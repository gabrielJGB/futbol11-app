import { View, Text, ScrollView, Image, Dimensions, TouchableNativeFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { useLeague } from '../../../context/LeagueContext'
import { useTheme } from '../../../context/ThemeContext'
import { fetchArticle, fetchLeagueArticles, fetchVideo } from '../../../utils/fetch'
import tw from 'twrnc'
import { convert_timestamp } from '../../../utils/time'
import { useNavigation } from '@react-navigation/native'

const ArticlesLeagueTab = () => {


    const { league } = useLeague()
    const { theme } = useTheme()
    const navigation = useNavigation()
    const [error, setError] = useState(false)
    const [articlesList, setArticlesList] = useState(false)
    const [loading, setLoading] = useState(true)



    useEffect(() => {

        setError(false)
        setLoading(true)

        fetchLeagueArticles(league.slug)
            .then(resp => setArticlesList(resp))
            .catch(error => setError(error))
            .finally(() => setLoading(false))

    }, [])


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

                <View style={tw`bg-[${theme.colors.card}] flex flex-col gap-2  pb-3 rounded shadow shadow-black`}>

                    {
                        "images" in article && article.images.length > 0 &&
                        <Image source={{ uri: article.images[0].url }} width={Dimensions.get('window').width - 8} height={Dimensions.get('window').width / 2} />
                    }

                    <View style={tw`flex flex-col gap-2 px-2`}>
                        <Text style={tw`text-[${theme.colors.text}] mt-2 text-xs `} >
                            {`${convert_timestamp(article.published).dayOfWeek} ${convert_timestamp(article.published).day} de ${convert_timestamp(article.published).month} de ${convert_timestamp(article.published).year}, ${convert_timestamp(article.published).time}hs`}
                        </Text>
                        <Text style={tw`text-[${theme.colors.text}] text-[23px] `}>{`${article.type === "Media" ? "[Video]":""} ${article.headline}`}</Text>
                        <Text style={tw`text-[${theme.colors.text100}] text-sm leading-normal`}>{article.description}</Text>
                    </View>

                </View>
            </TouchableNativeFeedback>
        )
    }


    if (loading)
        return <ActivityIndicator color='white' style={{ marginTop: 20 }} />

    if (error)
        return <Text style={{ color: "white", textAlign: "center", padding: 20 }}>{error.message}</Text>


    return (
        <ScrollView>
            <View style={tw`mx-1 mt-2 mb-20`}>

                <View style={tw`flex flex-col gap-8`}>
                    {
                        articlesList.map((article, i) => (
                            <Card key={i} article={article} />
                        ))
                    }
                </View>

            </View>
        </ScrollView>
    )
}

export default ArticlesLeagueTab