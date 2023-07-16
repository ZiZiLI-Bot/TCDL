import mongoose from 'mongoose';
import Schema from '../helpers/MongoDB';

const MedicineSchema = new Schema(
  {
    id: Schema.Types.ObjectId,
    DuocLieu: String,
    TenNuocNgoai: String,
    TenKhoaHoc: String,
    TenKhac: String,
    HoThucVat: String,
    DacDiemThucVat: String,
    PhanBo: [String],
    BoPhanDung: String,
    CongDung: String,
    ThuHai: String,
    CheBien: String,
    ThanhPhanHoaHoc: [Object],
    TacDungDuocLy: [Object],
    DocTinh: String,
    LuuYKhiDung: String,
    TaiLieuThamKhao: [Object],
    HinhAnh: [Object],
    moreInfo: String,
    SearchKey: String,
    Slug: String,
  },
  {
    timestamps: true,
    collection: 'MedicineData',
  },
);

MedicineSchema.index({ SearchKey: 'text' });
const MedicineModule = mongoose.model('MedicineData', MedicineSchema);

export default MedicineModule;
