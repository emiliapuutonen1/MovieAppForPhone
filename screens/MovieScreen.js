
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies } from '../api/moviedb';
import { image500 } from '../api/moviedb';

var { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';
//const topMargin = ios ? '' : 'mt-3';

export default function MovieScreen() {
    const { params: item } = useRoute();
    const [isFavourite, toggleFavourite] = useState(false);
    const navigation = useNavigation();
    const [cast, setCast] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [loading, setLoading]= useState(false);
    const [movie, setMovie] = useState({});
    

    useEffect(() => {
        setLoading(true); 
        getMovieDetails(item.id); 
        getMovieCredits(item.id);
        getSimilarMovies(item.id);
    }, [item]); 

    const getMovieDetails = async id=> {
        const data = await fetchMovieDetails(id);
        if(data) setMovie(data);
        setLoading(false);
    }
    const getMovieCredits = async id=>{
        const data = await fetchMovieCredits(id);
        if(data && data.cast) setCast(data.cast);
    }
    const getSimilarMovies = async id=>{
        const data = await fetchSimilarMovies(id);
        if(data && data.results) setSimilarMovies(data.results);
    }

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }} style={{ flex: 1, backgroundColor: '#111' }}>
            <View style={{ width: '100%' }}>
                <SafeAreaView style={{ position: 'absolute', zIndex: 20, width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} className="rounded-xl p-1">
                        <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                        <HeartIcon size={35} color={isFavourite ? 'red' : 'white'} />
                    </TouchableOpacity>
                </SafeAreaView>
                {
                    loading? (
                        <Loading/>
                    ):(
                        <View>
                            <Image
                                source={{uri: image500(movie?.poster_path)}}
                                style={{ width, height: height * 0.55 }}
                            />
                            <LinearGradient
                                colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']}
                                style={{ width, height: height * 0.40 }}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                                className="absolute bottom-0"
                            />
                        </View>   
                    )
                }
               
            </View>

            <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
                <Text className="text-pink-500 text-center text-3xl font-bold tracking-wider">
                    {movie?.title}
                </Text>

                <Text className="text-white font-semibold text-base text-center">
                    {movie?.status} · {movie?.release_date?.split('-')[0]} · {movie?.runtime} min
                </Text>

                <View className="flex-row justify-center mx-4 space-x-2">
                    {movie?.genres?.map((genre, index)=>{
                        return (
                            <Text key={index} className="text-white font-semibold text-base text-center">
                                {genre?.name} ·
                            </Text>
                        )
                    })}
                </View>
            </View>

            <Text className="text-white mx-4 tracking-wide">
                {movie?.overview}
            </Text>

            <Cast navigation={navigation} cast={cast}/>
            <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />
        </ScrollView>
    );
}

