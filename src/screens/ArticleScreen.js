import { View, Text, ScrollView, Image, Dimensions, TouchableNativeFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import RenderHtml from 'react-native-render-html';
import tw from 'twrnc'

import { useRoute } from '@react-navigation/native'
import { ActivityIndicator, Divider, Icon } from 'react-native-paper'

import { useTheme } from '../context/ThemeContext'
import { convert_timestamp } from '../utils/time';
import VideoCard from '../components/game/VideoCard';

const ArticleScreen = () => {

    const { article } = useRoute().params
    const { theme } = useTheme()


    const tagsStyles = {
        body: {
            color: theme.colors.text,
            fontSize: 15
        },
        p: {
            color: theme.colors.text,
            textAlign: "justify",
            lineHeight: 23

        },
        h2: {
            color: theme.colors.text,
        },
        a: {
            color: theme.colors.text,
            fontWeight: "600",
            textDecorationLine: "none"
        },
        strong: {
            fontWeight: "400"
        }
    }


    

    return (
        <ScrollView >
            <View style={tw`bg-[${theme.colors.card}] pb-40`}>

                <View style={tw` flex flex-col gap-3 px-2`}>
                    <Text style={tw`text-[${theme.colors.text}] text-[26px]`} >{article.headline}</Text>
                    <Text style={tw`text-[${theme.colors.text100}] text-sm leading-normal`} >{article.description}</Text>

                    <View style={tw`flex flex-col items-center gap-3 `}>
                        {
                            article.images.filter(img => img.type === "header" || img.type === "inline").map((image, i) => (

                                <Image key={i} source={{ uri: image.url }} width={Dimensions.get('window').width - 8} height={Dimensions.get('window').width / 2} />
                            ))
                        }
                    </View>

                    <Text style={tw`text-[${theme.colors.text100}] font`} >
                        
                        {`${convert_timestamp(article.published).dayOfWeek} ${convert_timestamp(article.published).day} de ${convert_timestamp(article.published).month} de ${convert_timestamp(article.published).year}, ${convert_timestamp(article.published).time}hs`}
                    </Text>

                    <RenderHtml
                        contentWidth={Dimensions.get('window').width}
                        source={{
                            html: article.story
                                
                                .replaceAll("<inline1>", "")
                                .replaceAll("<inline2>", "")
                                .replaceAll("<photo1>", "")
                                .replaceAll("<video1>", "")
                                .replaceAll("<alsosee>", "")
                        }}
                        tagsStyles={tagsStyles}
                    />
                </View>


                {
                    "video" in article && article.video.length > 0 &&

                    <View style={tw`flex flex-col gap-3 mt-3`}>
                        <Divider style={tw`bg-[${theme.colors.border}] h-[1px] w-[95%] mx-auto`} />
                        <Text style={tw`text-[${theme.colors.text}] font-semibold  px-2`}>VIDEOS RELACIONADOS </Text>
                        {
                            article.video.map((video, i) => (
                                <View key={i} style={tw`flex flex-col gap-3 `}>
                                    <VideoCard video={video} />
                                    {
                                        i != article.video.length - 1 &&
                                        <Divider style={tw`bg-[${theme.colors.border}] h-[1px] w-[95%] mx-auto`} />
                                    }
                                </View>
                            ))
                        }

                    </View>
                }

                <Text style={tw`text-[${theme.colors.text100}] px-1 mt-4`} > FUENTE: {article.source}</Text>
            </View>
        </ScrollView>
    )
}

export default ArticleScreen