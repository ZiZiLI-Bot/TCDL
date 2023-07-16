import { Box, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import SearchBar from '../../components/SearchBar';
import styles from './HomePage.module.css';
import { Link } from 'react-router-dom';

const title = [
  { name: 'Trang chủ', link: '/' },
  { name: 'Giới thiệu', link: '/about' },
  { name: 'Liên hệ', link: '/contact' },
];

export default function HomePage() {
  return (
    <Box h='100vh' pos='relative'>
      <HStack mt={2} pos='absolute' zIndex={1} w='100%' justifyContent='center' spacing={32}>
        {title.map((item) => (
          <Link to={item.link} key={item.name}>
            <Text fontSize='20px' _hover={{ color: 'blue', textDecor: 'underline' }}>
              {item.name}
            </Text>
          </Link>
        ))}
      </HStack>
      <Box className={styles.BG_TCDL} w='full' h='80vh'>
        <Text className={styles.BG_TCDL_Title} fontWeight='bold' pos='absolute' bottom='65%'>
          Hệ thống tra cứu dược liệu
        </Text>
        <Box pos='absolute' bottom='55%'>
          <SearchBar size='lg' />
        </Box>
      </Box>
    </Box>
  );
}
