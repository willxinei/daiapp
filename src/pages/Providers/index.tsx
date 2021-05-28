/* eslint-disable camelcase */
import React, { useState, useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Feather, Fontisto } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import {
   Container,
   Header,
   ListContainer,
   ProviderContainer,
   ProviderName,
   ProviderList,
   ProviderInfo,
   ProviderAvatar,
   ProviderMeta,
   ProviderMetaText,
   BackButton,
   HomeContainer,
   Title,
} from './styles';
import api from '../../services/api';
import { Fundo } from '../Home/styles';
import fundo from '../../assets/fundo.png';
import { Fonts } from '../../utils/ferramentas';

export interface Provider {
   id: string;
   name: string;
   avatar_url: string;
}

const Prestadores: React.FC = () => {
   const [provider, setProvider] = useState<Provider[]>([]);
   const { navigate, goBack } = useNavigation();

   const navigaeTotCreateAppointment = useCallback(
      (providerId: string) => {
         navigate('SelectService', { providerId });
      },
      [navigate],
   );

   const handleBackToHome = useCallback(() => {
      navigate('Home');
   }, [navigate]);

   useEffect(() => {
      api.get('agendamento/me/prestador/list').then(respose => {
         setProvider(respose.data);
      });
   }, []);

   const fonstsLoadd = Fonts();
   if (!fonstsLoadd) {
      return <AppLoading />;
   }

   return (
      <Container>
         <Fundo source={fundo} />
         <Header>
            <BackButton onPress={goBack}>
               <AntDesign name="arrowleft" size={40} color="black" />
            </BackButton>

            <HomeContainer onPress={handleBackToHome}>
               <Fontisto name="home" size={40} color="black" />
            </HomeContainer>
         </Header>

         <Title style={{ fontFamily: 'MontBold' }}>
            Escolha um prestador(a)
         </Title>

         <ListContainer>
            <ProviderList
               showsHorizontalScrollIndicator
               data={provider}
               keyExtractor={provider => provider.id}
               renderItem={({ item: provider }) => (
                  <ProviderContainer
                     onPress={() => navigaeTotCreateAppointment(provider.id)}
                  >
                     <ProviderAvatar
                        source={{ uri: `http://${provider.avatar_url}` }}
                     />
                     <ProviderInfo>
                        <ProviderMeta>
                           <ProviderName style={{ fontFamily: 'MontBold' }}>
                              {provider.name}
                           </ProviderName>
                           <ProviderMetaText
                              style={{ fontFamily: 'MontRegular' }}
                           >
                              Designer de unhas
                           </ProviderMetaText>
                        </ProviderMeta>
                     </ProviderInfo>
                  </ProviderContainer>
               )}
            />
         </ListContainer>
      </Container>
   );
};

export default Prestadores;
