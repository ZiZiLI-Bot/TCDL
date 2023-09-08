/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Divider,
  Flex,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Kbd,
  Modal,
  ModalContent,
  ModalOverlay,
  Spacer,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import _ from 'lodash';
import React, { startTransition, useContext, useEffect, useState } from 'react';
import { BsArrowReturnRight, BsFileEarmarkText, BsSearch, BsTrash, BsStar, BsStarFill } from 'react-icons/bs';
import { MdSearchOff } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import ImageLoading from '../../assets/Image_Loading.svg';
import { OpenSearchContext } from '../../contexts/Search.context';
import axiosClient from '../../helpers/axiosClient';
import convertToUnsigned from '../../helpers/convertToUnsigned';
import MarkdownRender from '../MarkDownRender';

export default function SearchBar({ h }) {
  const { openSearch, setOpenSearch } = useContext(OpenSearchContext);
  const onClose = () => setOpenSearch(false);
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setOpenSearch(true);
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <Flex
      px={10}
      alignItems='center'
      minW='670px'
      h={h}
      border='2px'
      borderColor='gray.600'
      borderRadius={12}
      cursor='text'
      onClick={() => setOpenSearch(true)}
    >
      <Flex w='full' alignItems='center' justifyContent='space-between'>
        <BsSearch size={20} color='#838096' />
        <Text ml={4} color='gray.500'>
          Tìm kiếm:
        </Text>
        <Spacer />
        <Kbd h={6}>ENTER</Kbd>
      </Flex>
      <SearchModal onClose={onClose} isOpen={openSearch} />
    </Flex>
  );
}

const SearchModal = ({ onClose, isOpen }) => {
  const [dataSearch, setDataSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  const handlerNavigate = (slug) => {
    onClose();
    navigation(`/medicine/${slug}`);
  };

  const handlerSearch = _.debounce((e) => {
    startTransition(() => {
      const fetchData = async () => {
        setLoading(true);
        if (e.target.value !== '') {
          const url = `/search/${convertToUnsigned(e.target.value.toLowerCase())}?limit=10`;
          const res = await axiosClient.get(url);
          setDataSearch(res.data);
        } else {
          setDataSearch([]);
        }
        setLoading(false);
      };
      fetchData();
    });
  }, 400);
  return (
    <Modal size='3xl' isCentered onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent overflow='hidden'>
        <Box p={1} px={2}>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <BsSearch color='#838096' size={16} style={{ marginTop: 10 }} />
            </InputLeftElement>
            <Input
              border='none'
              focusBorderColor='white'
              fontSize={17}
              size='lg'
              placeholder='Tìm kiếm ... (VD: Bạch chỉ, Angelica dahurica, ...)'
              onFocus
              onChange={handlerSearch}
            />
            <InputRightElement mt={2} mr={4}>
              <Kbd h={6}>ESC</Kbd>
            </InputRightElement>
          </InputGroup>
        </Box>
        <Divider mt={2} />
        <Box w='full' h='78vh'>
          <Box className='flex space-x-3' h='full'>
            {/* <Box w='20%' m={3} color={'GrayText'}>
              <Text fontWeight='bold' mb={2} ml={4}>
                Lịch sử:
              </Text>
              <VStack alignItems='start' w='full'>
                <Flex className='group/item w-full py-2 px-4 rounded-full items-center justify-between hover:bg-gray-100 cursor-pointer'>
                  <HStack spacing={3}>
                    <BsFileEarmarkText fontSize={18} />
                    <Text>ABC</Text>
                  </HStack>
                  <BsTrash
                    size={26}
                    className='group/edit p-1 rounded-md invisible hover:bg-slate-200 group-hover/item:visible'
                  />
                </Flex>
              </VStack>
            </Box> */}
            <Box flex='1' color='black' className='overflow-y-auto'>
              {loading ? (
                <Center h='full' w='full'>
                  <Spinner color='blue' />
                </Center>
              ) : (
                <>
                  {dataSearch?.length !== 0 ? (
                    <>
                      {dataSearch?.map((item) => (
                        <Card
                          key={item._id}
                          bg='gray.50'
                          direction={{ base: 'column', sm: 'row' }}
                          maxH='200px'
                          overflow='hidden'
                          variant='elevated'
                          my={3}
                          px={3}
                        >
                          <Image
                            objectFit='cover'
                            borderRadius={6}
                            maxW={{ base: '100%', sm: '30%' }}
                            src={item.HinhAnh[0].image}
                            fallbackSrc={ImageLoading}
                          />
                          <Stack w='full'>
                            <CardBody px={6} py={3} w='full'>
                              <Heading size='lg'>{item.DuocLieu}</Heading>
                              <Text noOfLines={2}>
                                <MarkdownRender>{item.TenKhoaHoc}</MarkdownRender>
                              </Text>
                            </CardBody>
                            <CardFooter p={2} justifyContent='end' alignItems='center'>
                              <BsStar size={20} className='mr-3 hover:text-yellow-500 cursor-pointer' />
                              <Button
                                size='sm'
                                rightIcon={<BsArrowReturnRight size={16} />}
                                colorScheme='teal'
                                variant='outline'
                                onClick={() => handlerNavigate(item.Slug)}
                              >
                                Chi tiết
                              </Button>
                            </CardFooter>
                          </Stack>
                        </Card>
                      ))}
                    </>
                  ) : (
                    <Center w='full' h='full'>
                      <VStack>
                        <MdSearchOff size={100} color='#737374' />
                        <Text color='GrayText'>Result Empty</Text>
                      </VStack>
                    </Center>
                  )}
                </>
              )}
            </Box>
            {/* <Box w='20%' m={3} color={'GrayText'}>
              <Text fontWeight='bold' mb={2} ml={4}>
                Follow:
              </Text>
              <VStack alignItems='start' w='full'>
                <Flex className='group/item w-full py-2 px-4 rounded-full items-center justify-between hover:bg-gray-100 cursor-pointer'>
                  <HStack spacing={3}>
                    <BsStarFill fontSize={18} color='#ffcc3f' />
                    <Text>ABC</Text>
                  </HStack>
                  <BsTrash
                    size={26}
                    className='group/edit p-1 rounded-md invisible hover:bg-slate-200 group-hover/item:visible'
                  />
                </Flex>
              </VStack>
            </Box> */}
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  );
};
