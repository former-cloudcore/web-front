import { SERVER_URL } from './consts';

export const formatImage = (image: string) => {
    if (image.includes('http')) return image;
    return SERVER_URL + image;
};
