import React, { useContext, useEffect } from 'react';
import Carousel from 'react-native-snap-carousel';

import ImageColors from 'react-native-image-colors';
import {getColores} from '../helpers/getColores';
import { Dimensions, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MoviePoster } from '../components/MoviePoster';
import { useMovies } from '../hooks/useMovies';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { GradientBackground } from '../components/GradientBackground';
import { GradientContext } from '../context/GradientContext';

const {width:windowWidth} = Dimensions.get('window');

export const HomeScreen = () => {

 
    const {nowPlaying, popular, topRated, upcoming } = useMovies();
  
    const { top } = useSafeAreaInsets();
    const {setMainColors} = useContext( GradientContext);

    

    const getPosterColors = async( index :number) => {
      const movie = nowPlaying[index];
      const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`;
      const [primary='green' , secondary='orange' ] = await getColores(uri);

      setMainColors({primary,secondary})
    }

    useEffect(() => {
      if(nowPlaying.length > 0){
         getPosterColors(0)
      }
    }, [nowPlaying])
    

  return (

    <GradientBackground >

        <ScrollView>

        <View style = {{ marginTop: top +20 }}>

            {/*Carrusel principl*/}
            <View style={{height: 440}}>
              <Carousel
                data={ nowPlaying }
                renderItem={ ( {item}: any ) => <MoviePoster movie={ item }/>}
                sliderWidth={ windowWidth }
                itemWidth = { 300 }
                inactiveSlideOpacity={0.9}
                onSnapToItem={index => getPosterColors(index)}/>
                
            </View>

              {/*Peliculas populares*/}
            <HorizontalSlider title='En cine' movies={popular}/>
            <HorizontalSlider title='Top Rated' movies={topRated}/>
            <HorizontalSlider title='Upcoming' movies={upcoming}/>

          </View>
        </ScrollView>
    </GradientBackground>
    )
};
