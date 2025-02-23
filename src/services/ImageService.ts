import { convertImageToBase64 } from '../utils/ImageUtils.ts';
import AxiosClient from '../configs/AxiosClient.ts';

const ImageService = {
    classifyImage: async (file: File) => {
        try {
            const formData = new FormData();
            var bs64Text = await convertImageToBase64(file);
            formData.append('image_data', bs64Text); // Đặt đúng key "image_data"

            const response = await AxiosClient.post(
                '/classify-image',
                formData
            );

            return response.data;
        } catch (error) {
            console.error('Lỗi khi gửi ảnh:', error);
            throw error;
        }
    },
};

export default ImageService;
