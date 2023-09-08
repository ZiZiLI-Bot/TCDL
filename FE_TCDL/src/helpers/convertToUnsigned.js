export default function convertToUnsigned(str) {
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
