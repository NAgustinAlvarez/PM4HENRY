// //CONFIGURACIÓN GLOBAL DE CLOUDINARY, (NO LA ESTOY USANDO)
// import { v2 } from 'cloudinary';
// import { config as dotenvConfig } from 'dotenv';
// import * as path from 'path';
// const envPath = path.resolve(__dirname, '../../.env.development');
// dotenvConfig({ path: envPath });
// export const CloudinaryConfig = {
//   provide: 'CLOUDINARY',
//   useFactory: () => {
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
//     return v2.config({
//       cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//       api_key: process.env.CLOUDINARY_API_KEY,
//       api_secret: process.env.CLOUDINARY_API_SECRET,
//     });
//   },
// };
