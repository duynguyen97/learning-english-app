export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  LOGOUT: '/logout',
  FLASHCARD: '/flashcard',
  USER_ACCOUNT: '/profile',
  WORD: '/add-word',
};

export const UX = {
  DELAY_TIME: 1500,
};

export const MAX = {
  EMAIL_LEN: 100,
  PASSWORD_LEN: 40,
  NAME_LEN: 50,
  USERNAME_LEN: 110,
  WORD_LEN: 50,
  PHONETIC_LEN: 50,
  MEAN_WORD_LEN: 100,
  EXAMPLE_WORD_LEN: 250,
  SYNONYMS_WORD_LEN: 100,
  NOTE_WORD_LEN: 100,
  IMG_SIZE: 2, // 2 MB
};

export const MIN = {
  PASSWORD_LEN: 6,
};

export const REGEX = {
  NAME: /^[^\d~`!@#$%^&*\(\)\\\|\.,\?\/\-\+\=\_]+$/gi,
};

export const PAGE_SIZE = 100;

export const WORD_TYPES = [
  {
    value: 'n',
    label: 'Noun - Danh từ',
  },
  {
    value: 'adj',
    label: 'Adjective - Tính từ',
  },
  {
    value: 'adv',
    label: 'Adverb - Trạng từ',
  },
  {
    value: 'v',
    label: 'Verb - Động từ',
  },
  {
    value: 'pro',
    label: 'Pronoun - Đại từ',
  },
  {
    value: 'con',
    label: 'Conjunction - Liên từ',
  },
  {
    value: 'pre',
    label: 'Preposition - Giới từ',
  },
  {
    value: 'det',
    label: 'Determiners - Hạn định từ',
  },
];

export const WORD_LEVELS = [
  {
    value: '0',
    label: 'Chưa xác định',
  },
  {
    value: 'A1',
    label: 'A1',
  },
  {
    value: 'A2',
    label: 'A2',
  },
  {
    value: 'B1',
    label: 'B1',
  },
  {
    value: 'B2',
    label: 'B2',
  },
  {
    value: 'C1',
    label: 'C1',
  },
  {
    value: 'C2',
    label: 'C2',
  },
];

export const WORD_SPECIALTY = [
  { value: '0', label: 'Không' },
  { value: '1', label: 'Công nghệ sinh học (Biotechnology)' },
  { value: '6', label: 'Công nghệ thông tin (Information Technology)' },
  { value: '14', label: 'Công nghệ thực phẩm (Food Technology)' },
  { value: '20', label: 'Giải trí (Entertainment)' },
  { value: '3', label: 'Kinh tế học (Economics)' },
  { value: '2', label: 'Kế toán (Accounting)' },
  { value: '8', label: 'Kỹ thuật hoá học (Chemical Engineering)' },
  { value: '19', label: 'Mỹ thuật (Fine Arts Industry)' },
  { value: '12', label: 'Ngành Marketing' },
  { value: '18', label: 'Quản trị khách sạn (Hotel Management)' },
  { value: '7', label: 'Quản trị kinh doanh (Business Adminstration)' },
  { value: '5', label: 'Quản trị nhân lực (Human Resource Management)' },
  { value: '13', label: 'Thiết kế (Design UI/UX)' },
  { value: '4', label: 'Thương mại quốc tế (International Trade)' },
  { value: '10', label: 'Thương mại điện tử (E-Commerce)' },
  { value: '9', label: 'Tiếng Anh thương mại (Business English)' },
  { value: '11', label: 'Tài chính ngân hàng (Finance & Banking)' },
  { value: '16', label: 'Văn hoá học (Culturology)' },
  { value: '17', label: 'Xây dựng (Construction Industry)' },
  { value: '15', label: 'Xã hội học (Sociology)' },
];

export const DEFAULTS = {
  VOICE_URI: 'Google US English',
  VOICE_SPEED: 1,
  VOICE_VOLUME: 1,
  IMAGE_SRC: 'https://res.cloudinary.com/dynonary/image/upload/v1625136714/dynonary/default-image.png',
};
