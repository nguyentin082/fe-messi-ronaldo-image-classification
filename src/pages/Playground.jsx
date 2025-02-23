import { Container } from 'react-bootstrap';
import { IoIosCloudUpload } from 'react-icons/io';
import { IoAnalyticsSharp } from 'react-icons/io5';
import Result from '../components/Result';
import { useState } from 'react';
import ImageService from '../services/ImageService.ts';
import MyToast from '../components/MyToast.jsx';

const Playground = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [orgImagePreview, setOrgImagePreview] = useState(null);
    const [resultData, setResultData] = useState(null);
    const [errors, setErrors] = useState([]);

    // Xử lý khi người dùng chọn file
    const handleFileChange = (event) => {
        const file = event.target.files?.[0]; // Lấy file đầu tiên nếu có
        if (!file) {
            setErrors((prev) => [...prev, 'Please choose a valid image file!']);
            return;
        }
        setSelectedFile(file);
        setOrgImagePreview(URL.createObjectURL(file));
        // console.log(file);
    };

    // Xử lý khi nhấn nút "Analyze"

    const handleAnalyze = async () => {
        if (!selectedFile) {
            setErrors((prev) => [...prev, 'Please choose an image file!']);
            return;
        }

        try {
            const response = await ImageService.classifyImage(selectedFile);
            console.log('Kết quả từ server:', response);
            setResultData(response); // Lưu kết quả vào state để hiển thị
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
            setErrors((prev) => [...prev, 'Having an error when calling API!']);
        }
    };

    return (
        <div
            className="homepage-bgimage d-flex justify-content-center align-items-center"
            style={{ height: '100vh' }}
        >
            {errors.length > 0 && (
                <MyToast errors={errors} setErrors={setErrors} />
            )}
            <Container
                className="glass-container d-flex flex-column align-items-center text-center p-5"
                style={{
                    maxHeight: '85vh',
                    overflowY: 'auto',
                    paddingTop: '20px',
                }}
            >
                <h1 className="display-5 fw-bold mb-3">
                    <IoIosCloudUpload className="me-2" />
                    Upload
                </h1>
                <div className="mb-5">
                    <label htmlFor="formFile" className="form-label">
                        Please upload an image in .jpg, .jpeg, or .png format.
                    </label>
                    <div className="row">
                        <input
                            className="form-control mb-2"
                            type="file"
                            id="formFile"
                            onChange={handleFileChange}
                        />
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={handleAnalyze}
                        >
                            <IoAnalyticsSharp className="me-2" />
                            Analyze
                        </button>
                    </div>
                </div>
                <Result org_image={orgImagePreview} api_res={resultData} />
            </Container>
        </div>
    );
};

export default Playground;
