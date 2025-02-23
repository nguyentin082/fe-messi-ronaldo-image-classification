// Convert Image File to Base64
export const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result.split(',')[1]); // Bỏ phần header (data:image/png;base64,)
            } else {
                reject(new Error('Lỗi khi chuyển đổi ảnh sang Base64'));
            }
        };

        reader.onerror = (error) => reject(error);
    });
};

// Convert Base64 to Image (Blob URL)
export const convertBase64ToImage = (
    base64: string,
    mimeType: string = 'image/png'
): string => {
    const byteCharacters = atob(base64);
    const byteArrays: Uint8Array[] = [];

    for (let i = 0; i < byteCharacters.length; i += 512) {
        const slice = byteCharacters.slice(i, i + 512);
        const byteNumbers = new Array(slice.length);

        for (let j = 0; j < slice.length; j++) {
            byteNumbers[j] = slice.charCodeAt(j);
        }

        byteArrays.push(new Uint8Array(byteNumbers)); // 👈 TypeScript sẽ hiểu đúng kiểu
    }

    const blob = new Blob(byteArrays, { type: mimeType });
    return URL.createObjectURL(blob);
};
