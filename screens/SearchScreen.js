import { View, Text, Dimensions, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { image185 } from '../api/moviedb';
import { searchMovies } from '../api/moviedb';
const { width, height } = Dimensions.get('window');

export default function SearchScreen() {
    const navigation = useNavigation();
    const [results, setResults] = useState([]);
    let movieName="name";
    const handleSearch = value=>{
        if (value && value.length>2){
            searchMovies({
                query: value,
                include_adult:'false',
                language: 'en-US',
                page: '1'
            }).then(data=>{
                if (data && data.results) setResults(data.results);
            })
        }
    }
    
    return (
        <SafeAreaView className="bg-neutral-800 flex-1">
            <View
            className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
                <TextInput
                    onChangeText={handleSearch}
                    placeholder='Search Movie'
                    placeholderTextColor={'Lightgray'}
                    style="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    style="rounded-full p-3 m-1 bg-neutral-588"
                >
                    <XMarkIcon size={25} color="white" />
                </TouchableOpacity>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 15}}
                className="space-y-3">
                    <Text className="text-white font-semibold ml-1">Results ({results.length})</Text>
                <View className="flex-row justify-between flex-wrap">
                    {
                        results.map((item, index)=>{
                            return(
                                <TouchableWithoutFeedback
                                    key={index}
                                    onPress={()=> navigation.push("Movie", item)}
                                    >
                                        <View className="space-y-2 mb-4">
                                        <Image className="rounded-3xl"
                                        //source={require('../assets/keanu.png')}
                                        source={{uri: image185(item?.poster_path)}}
                                        style ={{width: width*0.44, height: height*0.3}}
                                        />
                                        <Text classname="text-neutral-300 ml-1">
                                            {
                                                item?.title.length>22? item?.title.slice(0,22)+'...' : item?.title
                                            }
                                        </Text>
                                        </View>
                                        
                                    </TouchableWithoutFeedback>
                            )
                        })
                }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
