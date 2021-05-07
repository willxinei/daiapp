import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import {
    Header,
    TitleName,
    Container,
    Title,
    Avatar,
    Agendar,
    BodyContainer,
    FirstBox,
    UserAvatar,
    ContainerText,
    Description,
    Desmarcar,
    BoxTwo,
    Box,
    AvatarBox,
    Scroll,
} from './styles';
import { useAuth } from '../../hooks/AuthContext';
import api from '../../services/api';

const Home: React.FC = () => {
    const { user, signOut } = useAuth();

    const [response, seResponse] = useState([]);
    const proximoHour = useMemo(() => {
        const hourNow = new Date(Date.now());

        const hourNex = new Date().setHours(1);
    }, []);

    useEffect(() => {
        async function loadLis() {
            const res = await api.get('/appointment/me', {
                params: {
                    user_id: user.id,
                },
            });

            seResponse(res.data);
        }
        loadLis();
        // signOut();
    }, [user.id]);

    console.log(response);

    return (
        <>
            <Container>
                <Header>
                    <TitleName>
                        Bem vindo (a) {'\n'}
                        <Text>{user.name}</Text>
                    </TitleName>
                    <Avatar source={{ uri: `${user.avatar_url}` }} />
                </Header>

                <Agendar>
                    <Title style={{ color: '#f2f2f2' }}>
                        Agendar um horário
                    </Title>
                </Agendar>

                <Title style={{ color: '#909090', marginTop: 30 }}>
                    Meu horários
                </Title>
                <BodyContainer>
                    <FirstBox>
                        <UserAvatar />
                        <ContainerText>
                            <Title style={{ marginBottom: 10 }}>
                                Proximo horario
                            </Title>
                            <Description>Prestador: Daisy</Description>
                            <Description>Serviço: Mão</Description>
                            <Description>Data: 10/03/2021</Description>
                            <Description>Horário: 10:00</Description>
                        </ContainerText>
                    </FirstBox>
                    <Scroll>
                        <BoxTwo>
                            <Feather name="clock" size={30} />

                            <Box>
                                <AvatarBox />
                                <Title>Daisy </Title>
                            </Box>
                        </BoxTwo>
                    </Scroll>
                </BodyContainer>
            </Container>
        </>
    );
};
export default Home;
