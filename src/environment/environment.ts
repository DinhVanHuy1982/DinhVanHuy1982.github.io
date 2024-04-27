// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
const browserWindow: any = window || {};
const browserWindowEnv  = browserWindow['__env'] || {};

const DOMAIN: string = browserWindowEnv['DOMAIN'] || '';
const DOMAIN_SOCKET: string = browserWindowEnv['DOMAIN_SOCKET'] || '';
const DOMAIN_SOCKET_RX: string = browserWindowEnv['DOMAIN_SOCKET_RX'] || '';
const SCHOOL_CODE: string = browserWindowEnv['SCHOOL_CODE'] || '';
const DOMAIN_FILE: string = browserWindowEnv['DOMAIN_FILE'] || '';
const DOMAIN_FILE_LOCAL: string = browserWindowEnv['DOMAIN_FILE_LOCAL'] || '';
const DOMAIN_DELETE_FILE: string = browserWindowEnv['DOMAIN_DELETE_FILE'] || '';
const DOMAIN_ULEARN: string = browserWindowEnv['DOMAIN_ULEARN'] || '';
const CONNECT_SOCKET_USER: string = browserWindowEnv['CONNECT_SOCKET_SELLER'] || '';
const TIME_RECONNECT_SOCKET: string = browserWindowEnv['TIME_RECONNECT_SOCKET'] || '';

export const environment = {
  // API_GATEWAY_ENDPOINT: DOMAIN+'/api/',
  DOMAIN_FILE_LOCAL: 'http://localhost:4211',
  URL_SERVER_SOCKET: DOMAIN_SOCKET + '/websocket',
  authTokenKey: 'authce9d77b308c149d5992a80073637e4d5',
  URL_SERVER_SOCKET_RX: DOMAIN_SOCKET_RX,
  CONNECT_SOCKET_USER: CONNECT_SOCKET_USER,
  URL_IMAGE_LOADING: DOMAIN + '/upload',
  URL_LOGOUT:'logout-mobile.com',
  API_GATEWAY_ENDPOINT: 'http://localhost:8085'+'/api/',
  // SCHOOL_NAME: 'Trường THPT Chuyên Nguyễn Huệ',
  SCHOOL_NAME: 'ໂຮງຮຽນມິດຕະພາບລາວ-ຫວຽດນາມ',
  SCHOOL_CODE: `${SCHOOL_CODE}`,
  timer: 120, // seconds
  MAX_AUDIO_TIME: 9000, // seconds
  ROLE: {
    // admin
    ADMIN: 'ROLE_ADMIN', // quan ly
    GV_CN: 'ROLE_GVCN', // giao vien chu nhiem
    GV_BM: 'ROLE_GVBM', // giao vien bo mon
    HT: 'ROLE_HT', // truong trung tam
    PH: 'ROLE_USER', // phu huynh
    ROLE_MANAGEMENT_COMPANY: 'ROLE_MANAGEMENT_COMPANY', // cong ty quan ly
    ROLE_OTHER: 'ROLE_OTHER', // Khác
    ROLE_SYNDICATION: 'ROLE_SYNDICATION', // nghiệp đoàn
    ROLE_BOARD_MANAGEMENT: 'ROLE_BOARD_MANAGEMENT', // Ban giám đốc
  },
  action: {
    create: 'create',
    update: 'update',
    update_gradebook: 'update_gradebook',
    delete: 'delete',
    search: 'search',
    export: 'export',
    import: 'import',
    approve_score: 'approve_score',
    management_teacher: 'management_teacher',
    update_template_rating_file: 'update_template_rating_file',
    self_assessment: 'self_assessment',
    setup_security_key: 'setup_security_key',
    approve_review: 'approve_review'
  },
  SOCKET:{
    // TIME_CONNECT_ONCE: 15000,
    // TIME_RECONNECT: 5000
    TIME_CONNECT_ONCE: 20000,
    TIME_RECONNECT: TIME_RECONNECT_SOCKET
  }
};
