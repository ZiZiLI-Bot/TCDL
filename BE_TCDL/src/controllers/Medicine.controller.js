import mongoose from 'mongoose';
import { success, error } from '../helpers/Response';
import MedicineModule from '../modules/Medicine.module';

function convertToUnsigned(str) {
  const from = 'àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵ';
  const to = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeediiiiiooooooooooooooooouuuuuuuuuuuyyyyy';

  let result = '';
  for (let i = 0; i < str.length; i++) {
    let charIndex = from.indexOf(str[i]);
    if (charIndex !== -1) {
      result += to[charIndex];
    } else {
      result += str[i];
    }
  }
  return result;
}

const convertToSlug = (text) => {
  return convertToUnsigned(text.toLowerCase())
    .replace(/[^\w\s]/gi, ' ')
    .trim()
    .replace(/\s+/g, '-');
};

const removeNote = (text) => {
  return convertToUnsigned(text.toLowerCase()).replace(/{\w+}/gm, '').trim();
};

const MedicineController = {
  getMedicine: async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return error(res, null, 200, 'Invalid id');
    const medicine = await MedicineModule.findById(id);
    if (!medicine) return error(res, null, 200, 'Medicine not found');
    return success(res, medicine, 200, 'Get medicine successfully');
  },
  getMedicineBySlug: async (req, res) => {
    const { Slug } = req.params;
    const medicine = await MedicineModule.findOne({ Slug });
    if (!medicine) return error(res, null, 200, 'Medicine not found');
    return success(res, medicine, 200, 'Get medicine successfully');
  },
  createMedicine: async (req, res) => {
    const { body } = req;
    const medicine = await MedicineModule.create({
      ...body,
      SearchKey: `${removeNote(body.DuocLieu)} | ${removeNote(body.TenKhoaHoc)} | ${removeNote(
        body.TenKhac,
      )} | ${removeNote(body.TenNuocNgoai)}`.toLowerCase(),
      Slug: convertToSlug(body.DuocLieu),
    });
    return success(res, medicine, 200, 'Create medicine successfully');
  },
  searchMedicine: async (req, res) => {
    const { keyword } = req.params;
    const { limit } = req.query;
    const medicine = await MedicineModule.find({ SearchKey: { $regex: keyword, $options: 'i' } })
      .limit(limit ?? null)
      .select('DuocLieu TenKhoaHoc HinhAnh Slug');
    if (!medicine) return error(res, null, 200, 'Medicine not found');
    return success(res, medicine, 200, 'Search medicine successfully');
  },
  updateMedicine: async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    if (!mongoose.Types.ObjectId.isValid(id)) return error(res, null, 200, 'Invalid id');
    const medicine = MedicineModule.findByIdAndUpdate(id, body);
    if (!medicine) return error(res, null, 200, 'Medicine not found');
    return success(res, medicine, 200, 'Update medicine successfully');
  },
};

export default MedicineController;
