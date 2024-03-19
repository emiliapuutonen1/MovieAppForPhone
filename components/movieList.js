import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Dimensions, Image } from 'react-native';
import React from 'react';
import { styles } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { image185 } from '../api/moviedb';

var {width, height} = Dimensions.get('window');
export default function MovieList({title, data}) {
    const navigation= useNavigation();

    return (
        <View style={{ marginBottom: 20 }}>
            <View style={{ marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: 'pink', fontSize: 16, marginTop:10 }}>{title}</Text>
                <TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 16 }}></Text>
                </TouchableOpacity>
            </View>
            {/* movie row */}
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10 }}
            >
                {data.map((item, index) => (
                    <TouchableWithoutFeedback key={index} onPress={() => navigation.push('Movie', item)}>
                        <View style={{ marginRight: 12 }}>
                            <Image
                                source={{ uri: image185(item.poster_path) }}
                                style={{ width: width * 0.33, height: height * 0.22, borderRadius: 20 }}
                            />
                            <Text style={{ color: '#ccc', marginTop: 4, fontSize: 14 }}>
                                {item.title.length > 14 ? item.title.slice(0, 14) + '...' : item.title}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                ))}
            </ScrollView>
        </View>
    );
}
