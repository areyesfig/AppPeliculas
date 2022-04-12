import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Movie } from '../interfaces/movieInterfaces';
import {useNavigation} from '@react-navigation/core';
import { RootStackParams } from '../navigation/Navigation';
import { StackNavigationProp } from '@react-navigation/stack';

interface Props {
    movie: Movie;
    height?:number;
    width?: number;
}

type HomeScreenNavigationProp = StackNavigationProp<RootStackParams, 'HomeScreen'>

export const MoviePoster = ({ movie,height= 420,width=300 }: Props) => {
  
  
  const uri = `https://image.tmdb.org/t/p/w500${ movie.backdrop_path }`;

  const navigation = useNavigation<HomeScreenNavigationProp>()
  
    return (
        <TouchableOpacity
        onPress={ () => navigation.navigate('DetailScreen', movie)} 
        activeOpacity={0.8}
        style={{
            width,
            height,
            marginHorizontal:2,
            marginBottom:20,
            paddingHorizontal:5
        }}>
            <View style={styles.imageContainer}>
                <Image
                source = {{uri}}
                style = {styles.image}
                />
            </View>
           
        </TouchableOpacity>
  )
};



const styles = StyleSheet.create({
    image: {
        flex:1,
        borderRadius:18,
    },
    imageContainer:{
        flex:1,
        shadowColor: "#000",
        borderRadius:18,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,

        elevation: 10,
    }
})
