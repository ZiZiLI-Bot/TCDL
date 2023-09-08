import { Box, Button, Container, Flex, HStack, Image, SimpleGrid, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../components/SearchBar';
import NAVBAR_NAVIGATION from '../../constants/HomePage.constant';
import styles from './HomePage.module.css';
import { OpenSearchContext } from '../../contexts/Search.context';
import Illustration from '../../assets/images/illustration.png';

export default function HomePage() {
  const { setOpenSearch } = useContext(OpenSearchContext);
  return (
    <Box>
      <Box w='full' height='100vh' className={styles.BG_TCDL}>
        <Container maxW='full' centerContent>
          <Flex w='full' h='5vh' px={28} justifyContent='end' alignItems='end'>
            {NAVBAR_NAVIGATION.map((item) => (
              <Link key={item.title} to={item.navigator}>
                <Text mx={12}>{item.title}</Text>
              </Link>
            ))}
          </Flex>
        </Container>
        <Container maxW='7xl' mt='3%'>
          <Flex justifyContent='center' pos='relative'>
            <SearchBar h='60px' />
          </Flex>
          <Box mt='3%'>
            <SimpleGrid columns={2} spacing={10}>
              <Box>
                <Text fontWeight={700} fontSize={22} my={4} ml={1}>
                  Medicine Search System
                </Text>
                <Text className={styles.BG_TEXT}>Cơ sở dữ liệu các loại dược liệu phổ biến trên thế giới</Text>
                <HStack my={4}>
                  <Button size='lg' colorScheme='teal' onClick={() => setOpenSearch(true)}>
                    Start Searching
                  </Button>
                </HStack>
              </Box>
              <Flex alignItems='center' justifyContent='center'>
                <Image src={Illustration} w='90%' />
              </Flex>
            </SimpleGrid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
