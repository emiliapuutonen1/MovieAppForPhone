
import { View, Text, Platform, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import {styles} from '../theme';
import TrendingMovies from "../components/trendingMovies";
import MovieList from "../components/movieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import { fetchTrendingMovies, fetchUpcomingMovies, fetchTopratedMovies } from "../api/moviedb";

const ios = Platform.OS == 'ios';

export default function Homescreen({item}) {
    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [toprated, setToprated] = useState([]);
    const [loading, setLoading]= useState(false);
    const navigation = useNavigation();

    useEffect(()=> {
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    }, [])

    const getTrendingMovies = async()=>{
        const data = await fetchTrendingMovies();
        if(data && data.results) setTrending(data.results);
        setLoading(false);
    }
    const getUpcomingMovies = async()=>{
        const data = await fetchUpcomingMovies();
        if(data && data.results) setUpcoming(data.results);
        setLoading(false);
    }
    const getTopRatedMovies = async()=>{
        const data = await fetchTopratedMovies();
        if(data && data.results) setToprated(data.results);
        setLoading(false);
    }

    return (
        <View className="flex-1 bg-black text-white">
            <SafeAreaView className={ios ? "-mb-2" : "sb-"}>
                <StatusBar style="light" />
                <View className="flex-row justify-between items-center px-4">
                    <Bars3CenterLeftIcon size={30} strokeWidth={2} color="white" />
                    <Text className="text-white text-xl font-bold">
                        <Text style={styles.text}>M</Text>ovies
                    </Text>
                    { <TouchableOpacity onPress={()=> navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size={38} strokeWidth={2} color="white" />
                    </TouchableOpacity> }
                </View>
            </SafeAreaView>
            {
                loading? (
                    <Loading />
                ):(
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: 10}}
                    >
                        
                        { trending.length>0 && <TrendingMovies item={item} data={trending}/>}

                        
                        <View style={{marginTop: 30}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 10, marginBottom: -20, color: 'pink'}}>Upcoming</Text>
                            <MovieList data={upcoming} />
                        </View>

                        
                        <View style={{marginTop: 20}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 10, marginBottom: -20, color: 'pink'}}>Top Rated</Text>
                            <MovieList data={toprated} />
                        </View>
                    </ScrollView>   
                )
            }
        </View>
    );
}