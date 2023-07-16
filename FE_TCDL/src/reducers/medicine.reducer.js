import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  _id: '',
  DuocLieu: '',
  TenNuocNgoai: '',
  TenKhoaHoc: '',
  TenKhac: '',
  HoThucVat: '',
  DacDiemThucVat: '',
  PhanBo: [],
  BoPhanDung: '',
  CongDung: '',
  ThuHai: '',
  CheBien: '',
  ThanhPhanHoaHoc: [],
  TacDungDuocLy: [],
  DocTinh: '',
  LuuYKhiDung: '',
  TaiLieuThamKhao: [],
  HinhAnh: [],
  createdAt: '',
  updatedAt: '',
};

export const medicineSlice = createSlice({
  name: 'medicine',
  initialState,
  reducers: {},
});
