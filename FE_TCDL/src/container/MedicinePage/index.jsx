import {
  Box,
  Divider,
  Flex,
  Image,
  Link,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { useLayoutEffect, useState } from 'react';
import Lottie from 'react-lottie';
import { useMatches } from 'react-router-dom';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Swiper, SwiperSlide } from 'swiper/react';
import LoadingAnimate from '../../assets/LoadingAnimate.json';
import Navbar from '../../components/Navbar';
import { RenderText, RenderTextArr, RenderTextHide, RenderTextRaw } from '../../components/RenderText';
import axiosClient from '../../helpers/API/axiosClient';

const colorList = ['green', 'red', 'yellow', 'blue', 'pink', 'purple', 'orange', 'teal', 'cyan', 'gray'];

export default function MedicinePage() {
  const path = useMatches();
  const slug = path[0].params.slug;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useLayoutEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const url = `/medicine/${slug}`;
      const res = await axiosClient.get(url);
      setData(res.data);
      setLoading(false);
    };
    fetchData();
  }, [slug]);
  return (
    <Box px={24} pos='relative'>
      <Navbar />
      {loading ? (
        <Flex h='100vh' direction='column' alignItems='center' justifyContent='center'>
          <Lottie height={200} width={300} options={{ loop: true, autoplay: true, animationData: LoadingAnimate }} />
          <Text mt={2}>Loading ...</Text>
        </Flex>
      ) : (
        <Box>
          <Flex pt={24}>
            <Box flex={7} pr={16}>
              <Text lineHeight='60px' fontWeight='semibold' pb={6} fontSize='5xl' textAlign='center' mb={8}>
                {data.DuocLieu}
              </Text>
              <RenderText title='Tên khoa học' thamKhao={data.TaiLieuThamKhao} text={data.TenKhoaHoc} />
              <RenderText title='Tên khác' thamKhao={data.TaiLieuThamKhao} text={data.TenKhac} />
              <RenderText title='Tên nước ngoài' thamKhao={data.TaiLieuThamKhao} text={data.TenNuocNgoai} />
              {data.DacDiemThucVat && (
                <RenderTextHide title='Đặc điểm thực vật' thamKhao={data.TaiLieuThamKhao} text={data.DacDiemThucVat} />
              )}
              <RenderText title='Bộ phận hay dùng' thamKhao={data.TaiLieuThamKhao} text={data.BoPhanDung} />
              {data.CongDung && (
                <RenderTextHide title='Công dụng' thamKhao={data.TaiLieuThamKhao} text={data.CongDung} />
              )}
              <RenderText title='Thu hái' thamKhao={data.TaiLieuThamKhao} text={data.ThuHai} />
              <RenderText title='Chế biến' thamKhao={data.TaiLieuThamKhao} text={data.CheBien} />
            </Box>
            <Box flex={3}>
              <Box maxW='32rem' mt={24}>
                <Swiper
                  style={{
                    '--swiper-navigation-color': '#888',
                    '--swiper-pagination-color': '#888',
                  }}
                  navigation={true}
                  thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                  modules={[FreeMode, Navigation, Thumbs]}
                  // className='mySwiper'
                >
                  {data.HinhAnh?.map((item, index) => (
                    <SwiperSlide
                      key={item.title + index}
                      style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                      }}
                    >
                      <Image objectFit='cover' maxH='600px' src={item.image} rounded='3xl' />
                      <Text textAlign='center' fontStyle='italic' fontSize={14} lineHeight={4} mt={1}>
                        {item.title}
                      </Text>
                    </SwiperSlide>
                  ))}
                </Swiper>
                {data.HinhAnh?.length > 1 && (
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={2}
                    slidesPerView={5}
                    freeMode={true}
                    watchSlidesProgress={true}
                    style={{ marginTop: 4 }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    // className='mySwiper2'
                  >
                    {data.HinhAnh?.map((item, index) => (
                      <SwiperSlide key={item.title + index}>
                        <Image rounded='lg' objectFit='cover' h='110px' src={item.image} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </Box>
              <Box mt={8}>
                <RenderText title='Họ thực vật' thamKhao={data.TaiLieuThamKhao} text={data.HoThucVat} />
                <Box display='inline' mb={4}>
                  <Text fontWeight='bold' color='red'>
                    • Phân bố sinh thái:{' '}
                  </Text>
                  {data.PhanBo?.map((item) => (
                    <Tag
                      m={1}
                      key={item}
                      variant='solid'
                      colorScheme={colorList[Math.floor(Math.random() * colorList.length)]}
                    >
                      {item}
                    </Tag>
                  ))}
                </Box>
                <RenderText title='Độc tính' thamKhao={data.TaiLieuThamKhao} text={data.DocTinh} />
              </Box>
            </Box>
          </Flex>
          <Box w='94%'>
            {data.ThanhPhanHoaHoc?.length !== 0 && (
              <RenderTextArr title='Thành phần hóa học' thamKhao={data.TaiLieuThamKhao} arr={data.ThanhPhanHoaHoc} />
            )}
            {data.TacDungDuocLy?.length !== 0 && (
              <RenderTextArr title='Tác dụng dược lý' thamKhao={data.TaiLieuThamKhao} arr={data.TacDungDuocLy} />
            )}
            <RenderText title='Lưu ý khi dùng' thamKhao={data.TaiLieuThamKhao} text={data.LuuYKhiDung} />
            {data.moreInfo && <RenderTextRaw thamKhao={data.TaiLieuThamKhao} text={data.moreInfo} />}
            <Divider />
            <Box mt={4}>
              <Text fontWeight='bold'>Tài liệu tham khảo:</Text>
              <TableContainer mt={6}>
                <Table variant='striped'>
                  <Thead>
                    <Tr>
                      <Th>STT</Th>
                      <Th>Tên tài liệu</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.TaiLieuThamKhao?.map((item, index) => (
                      <Tr key={index}>
                        <Td fontSize={13}>{`[${index + 1}]`}</Td>
                        <Td fontSize={13} whiteSpace='normal'>
                          <Link isExternal href={item.link ? item.link : null}>
                            {item.name}
                          </Link>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
