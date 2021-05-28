import { useNavigation } from '@react-navigation/core';
import AppLoading from 'expo-app-loading';
import React, { useCallback, useState } from 'react';
import { Alert, TextInput } from 'react-native';
import api from '../../services/api';
import { Fonts } from '../../utils/ferramentas';
import { Button, Container, ContainerInput, TextButoon, Title } from './styles';

const Forgot: React.FC = () => {
   const [codigo, setCodigo] = useState('');
   const [senha, setSenha] = useState('');

   const { navigate } = useNavigation();

   const handleSubmit = useCallback(async () => {
      try {
         await api.post('/reset', {
            password: senha,
            token: 'b68e1a6d-d4e6-40d7-a39f-51eb881f2525',
         });

         Alert.alert(
            'Senha cadastrada com sucesso!',
            'Você já pode fazer login na apricação',
         );

         navigate('SignIn');
      } catch (err) {
         Alert.alert('Email incorreto');
      }
   }, [codigo, navigate, senha]);

   console.log(codigo);

   const font = Fonts();
   if (!font) {
      return <AppLoading />;
   }
   return (
      <Container>
         <Title style={{ fontFamily: 'MontBold' }}>
            Digite sua nova senha e o codigo que você rebebeu no seu email
         </Title>

         <ContainerInput>
            <TextInput
               placeholder="Senha"
               value={senha}
               onChangeText={setSenha}
               keyboardType="default"
            />
         </ContainerInput>

         <ContainerInput>
            <TextInput
               placeholder="Codigo"
               value={codigo}
               onChangeText={setCodigo}
               keyboardType="email-address"
            />
         </ContainerInput>

         <Button onPress={handleSubmit}>
            <TextButoon style={{ fontFamily: 'MontBlack' }}>Enviar</TextButoon>
         </Button>
      </Container>
   );
};
export default Forgot;
