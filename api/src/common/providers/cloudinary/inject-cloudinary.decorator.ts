import { Inject } from '@nestjs/common';
import { CLOUDINARY_API_KEY } from './cloudinary.module';

export const InjectCloudinary = () => Inject(CLOUDINARY_API_KEY);
