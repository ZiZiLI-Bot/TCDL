/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { startTransition, useState } from 'react';
import { ArrayEditorsCreate, EditorsCreate, InputPure, UploadImageComponent } from '../../../components/EditorsCreate';

const initData = {
  DuocLieu: '',
  TenKhac: '',
  TenKhoaHoc: '',
  TenNuocNgoai: '',
  HoThucVat: '',
  PhanBo: [],
  DacDiemThucVat: '',
  BoPhanDung: '',
  CongDung: '',
  ThuHai: '',
  CheBien: '',
  ThanhPhanHoaHoc: [],
  TacDungDuocLy: [],
  HinhAnh: [],
  TaiLieuThamKhao: [],
};

export default function CreateMedicine() {
  const [sourceNumber, setSourceNumber] = useState(0);
  const detectSource = () => {
    let countSource = 0;
    Object.entries(initData).forEach(([key, value]) => {
      switch (key) {
        case 'PhanBo':
          break;
        case 'ThanhPhanHoaHoc':
        case 'TacDungDuocLy': {
          if (value !== '') {
            value?.map((item) => {
              const regex = /\[(\d+)\]/g;
              const found = item.detail?.match(regex);
              if (found) {
                found.map((item) => {
                  const number = item.replace(/\[|\]/g, '');
                  if (parseInt(number) > countSource) countSource = parseInt(number);
                });
              }
            });
          }
          break;
        }
        default: {
          const regex = /\[(\d+)\]/g;
          let found;
          try {
            found = value !== '' ? value?.match(regex) : null;
          } catch (error) {
            console.error(error);
          }
          if (found) {
            found?.map((item) => {
              const number = item.replace(/\[|\]/g, '');
              if (parseInt(number) > countSource) countSource = parseInt(number);
            });
          }
          break;
        }
      }
    });
    console.log(countSource, 'DATA:', initData);
    const tempTaiLieuThamKhao = initData.TaiLieuThamKhao;
    const countLoop = countSource - tempTaiLieuThamKhao.length;
    for (let i = 0; i < countLoop; i++) {
      tempTaiLieuThamKhao.push({ name: '', link: '' });
    }
    initData.TaiLieuThamKhao = tempTaiLieuThamKhao;
    setSourceNumber(countSource);
  };

  const HandleInputTaiLieuThamKhao = (input, index, type) => {
    startTransition(() => {
      initData.TaiLieuThamKhao[index][type] = input;
    });
  };
  return (
    <Box px={20}>
      <Text textAlign='center' fontSize={30} mt={10} fontWeight='bold'>
        Tạo mới dữ liệu dược liệu
      </Text>
      <Flex mt={8}>
        <Box flex={1}>
          <InputPure data={initData} type='DuocLieu' title='Tên dược liệu' />
          <InputPure data={initData} type='TenKhac' title='Tên khác' />
          <EditorsCreate data={initData} type='TenKhoaHoc' title='Tên khoa học' />
          <EditorsCreate data={initData} type='TenNuocNgoai' title='Tên nước ngoài' />
          <EditorsCreate data={initData} type='HoThucVat' title='Họ thực vật' />
          <InputPure
            data={initData}
            type='PhanBo'
            title='Phân bố'
            array={true}
            placeholder='Chỉ tên địa danh, cách nhau bởi dấu ,'
          />
        </Box>
        <Box flex={1}>
          <EditorsCreate data={initData} type='DacDiemThucVat' title='Đặc điểm thực vật' />
          <EditorsCreate data={initData} type='BoPhanDung' title='Bộ phận dùng' />
          <EditorsCreate data={initData} type='CongDung' title='Công dụng' />
          <EditorsCreate data={initData} type='ThuHai' title='Thu Hái' />
          <EditorsCreate data={initData} type='CheBien' title='Chế biến' />
        </Box>
        <Box flex={1}>
          <Box h={40} display='flex' flexDir='column' mb={4}>
            <Text fontSize={16} fontWeight='bold'>
              Hình ảnh minh họa:
            </Text>
            <UploadImageComponent objData={initData} />
          </Box>
          <ArrayEditorsCreate
            data={initData}
            type='ThanhPhanHoaHoc'
            title='Thành phần hóa học'
            objData={{ name: '', detail: '', images: '' }}
          />
          <ArrayEditorsCreate
            data={initData}
            type='TacDungDuocLy'
            title='Tác dụng dược lý'
            objData={{ name: '', detail: '', images: '' }}
          />
        </Box>
      </Flex>
      <Divider my={6} />
      <Flex justifyContent='flex-end'>
        <Button onClick={detectSource}>Liệt kê các nguồn trích</Button>
      </Flex>

      {sourceNumber > 0 && (
        <TableContainer mt={10} borderRadius={5} style={{ border: '1px solid #e2e8f0' }}>
          <Table variant='simple' size='sm'>
            <TableCaption>Bảng liệt kê các trích dẫn từ bên ngoài</TableCaption>
            <Thead>
              <Tr>
                <Th>STT</Th>
                <Th>Tên trích dẫn</Th>
                <Th>URL</Th>
              </Tr>
            </Thead>
            {initData.TaiLieuThamKhao.map((item, index) => (
              <Tbody key={index}>
                <Tr>
                  <Td w='2%'>[{index + 1}]</Td>
                  <Td w='49%'>
                    <Input
                      onChange={(e) => HandleInputTaiLieuThamKhao(e.target.value, index, 'name')}
                      defaultValue={initData.TaiLieuThamKhao[index]?.name}
                    />
                  </Td>
                  <Td w='49%'>
                    <Input
                      onChange={(e) => HandleInputTaiLieuThamKhao(e.target.value, index, 'link')}
                      defaultValue={initData.TaiLieuThamKhao[index]?.link}
                    />
                  </Td>
                </Tr>
              </Tbody>
            ))}
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
