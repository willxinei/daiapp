import React, { useCallback, useRef } from 'react';
import { Alert, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';
import { Container, Tilte, BackContainer } from './styles';
import Input from '../../components/Input';
import Logo from '../../assets/Lg.png';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationsErrors';
import Button from '../../components/Button';
import { ImageLogo, LogText } from '../SignIn/styles';
import { cores } from '../../utils/ferramentas';

interface SignUpFormDatea {
   name: string;
   email: string;
   telefone: string;
   password: string;
}

const SingUp: React.FC = () => {
   const formRef = useRef<FormHandles>(null);

   const { goBack } = useNavigation();

   const handleSigUp = useCallback(
      async (data: SignUpFormDatea) => {
         try {
            formRef.current?.setErrors({});

            const shema = Yup.object().shape({
               name: Yup.string().required('Nome obrigatorio'),
               email: Yup.string()
                  .required('E-mail Obrigatorio')
                  .email('Digite um email valido'),
               telefone: Yup.number()
                  .min(11, 'telefone invalido')
                  .required('telefone obrigatorio'),
               password: Yup.string()
                  .required('Senha obrigatoria')
                  .min(6, 'No minimo 6 digitos'),
            });

            await shema.validate(data, {
               abortEarly: false,
            });

            await api.post('/user', {
               name: data.name,
               email: data.email,
               telefone: data.telefone,
               password: data.password,
               prestador: false,
            });

            Alert.alert(
               'Cadastro realizado com sucesso!',
               'Você ja pode fazer login na aplicação',
            );

            goBack();
         } catch (err) {
            if (err instanceof Yup.ValidationError) {
               const errors = getValidationErrors(err);
               formRef.current?.setErrors(errors);

               return;
            }
            Alert.alert(
               'Erro no cadastro',
               'Ocorreu um erro ao tentar fazer o cadastro',
            );
         }
      },
      [goBack],
   );

   return (
      <>
         <ScrollView contentContainerStyle={{ flex: 1 }}>
            <Container>
               <ImageLogo source={Logo} />
               <LogText>DESIGNER</LogText>
               <LogText>DE UNHAS</LogText>
               <Tilte>Criar um conta</Tilte>
               <Form ref={formRef} onSubmit={handleSigUp}>
                  <Input name="name" icon="user" placeholder="Nome" />

                  <Input
                     name="email"
                     icon="mail"
                     placeholder="E-mail"
                     keyboardType="email-address"
                     autoCapitalize="none"
                  />

                  <Input
                     name="telefone"
                     icon="phone"
                     placeholder="telefone"
                     keyboardType="number-pad"
                  />

                  <Input
                     name="password"
                     icon="lock"
                     placeholder="Senha"
                     keyboardType="visible-password"
                     secureTextEntry
                  />

                  <Button
                     onPress={() => {
                        formRef.current?.submitForm();
                     }}
                  >
                     Criar
                  </Button>
               </Form>
            </Container>
         </ScrollView>
         <BackContainer onPress={() => goBack()}>
            <Feather name="log-in" size={20} color={cores.roxo} />
            <Tilte style={{ marginLeft: 15 }}>Voltar para o login</Tilte>
         </BackContainer>
      </>
   );
};

export default SingUp;
