import { SERVER_URL } from './consts';
import { UserResponse } from './user-service';

export const formatImage = (image: string) => {
    if (image.includes('http')) return image;
    return SERVER_URL + image;
};

export const isGoogleUser = (user: Omit<UserResponse, '__v'>): boolean => {
    return user.image.includes('googleusercontent');
};
