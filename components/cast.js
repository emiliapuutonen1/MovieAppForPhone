import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { image185 } from '../api/moviedb';

export default function Cast({ cast, navigation }) {
    return (
        <View style={{ paddingTop: 6 }}>
            <Text style={{ color: 'pink', fontSize: 18, marginTop: 4, marginBottom: 10, marginLeft: 20 }}>Top Cast</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
                {cast && cast.map((person, index) => {
                    return (
                        <TouchableOpacity 
                            key={index} 
                            style={{ marginRight: 12, alignItems: 'center' }}
                            onPress={()=> navigation.navigate('Person', person)}
                        >
                            <View style={{ overflow: 'hidden', borderRadius: 20, width: 80, height: 80, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#777' }}>
                                <Image 
                                    style={{ width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: '#777' }} // Adjust width and height as needed
                                    source={{ uri: image185(person?.profile_path) }}
                                />
                            </View>
                            <Text style={{ color: 'pink', fontSize: 12, marginTop: 4 }}>
                                {person?.character.length > 10 ? person?.character.slice(0,10) + '...' : person?.character}
                            </Text>
                            <Text style={{ color: '#ccc', fontSize: 12, marginTop: 4 }}>
                                {person?.original_name.length > 10 ? person?.original_name.slice(0,10) + '...' : person?.original_name}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}
