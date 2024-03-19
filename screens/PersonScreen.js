import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, Platform, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../theme';
import Loading from '../components/loading';
import { fetchPersonDetails, image342 } from '../api/moviedb';

var { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';

export default function PersonScreen() {
    const {params: item} = useRoute();
    const navigation = useNavigation();
    const [isFavourite, toggleFavourite] = useState(false);
    const [loading, setLoading]= useState(false);
    const[person, setPerson]= useState({});
    const [personMovies, setPersonMovies]= useState({});
    useEffect(()=>{
        setLoading(false);
        getPersonDetails(item.id);
    }, [item])

    const getPersonDetails = async id=>{
        const data = await fetchPersonDetails(id);
        if(data) setPerson(data);
        setLoading(false);
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#444' }} contentContainerStyle={{ paddingBottom: 20 }}>
           
            <SafeAreaView style={{ zIndex: 20, width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background}>
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
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                   
                    <View style={{ alignItems: 'center', marginBottom: 20 }}>
                        <View style={{ overflow: 'hidden', borderRadius: width * 0.36, borderColor: '#ccc', borderWidth: 2 }}>
                            <Image source={{uri: image342(person?.profile_path)}} style={{ height: width * 0.72, width: width * 0.72 }} />
                        </View>
                    </View>
    
                 
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>{person?.name}</Text>
                    <Text style={{ fontSize: 16, color: '#ccc', textAlign: 'center' }}>{person?.place_of_birth}</Text>
    
                  
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
    <InfoItem label="Gender" value={person?.gender === 2 ? "Male" : "Female"} />
    <InfoItem label="Birthday" value={person?.birthday} />
    <InfoItem label="Popularity" value={person?.popularity ? person.popularity.toString() : "N/A"} />
    <InfoItem label="Known for" value={person?.known_for_department} />
  
</View>
    
                   
                    <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                        <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>Biography</Text>
                        <Text style={{ color: '#ccc', fontSize: 16, textAlign: 'center', marginTop: 10 }}>
                           {
                            person?.biography
                           }
                        </Text>
                    </View>
                </View>
                )
            }
           
        </ScrollView>
    );
}

const InfoItem = ({ label, value }) => {
    return (
        <View style={{ alignItems: 'center' }}>
            <View style={{ borderWidth: 2, borderColor: '#ccc', borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5, marginBottom: 5 }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>{label}</Text>
            </View>
            <Text style={{ color: '#ccc' }}>{value}</Text>
        </View>
    );
};
