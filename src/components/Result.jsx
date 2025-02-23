import React from 'react';
import { GoGoal } from 'react-icons/go';
import { BiSolidError } from 'react-icons/bi';
import { convertBase64ToImage } from '../utils/ImageUtils.ts';

function Result({ org_image, api_res }) {
    console.log('api_rest: ' + api_res);

    if (!api_res) {
        return;
    }

    const noFacesDetected = api_res.every(
        (res) => !res.faces_detection || res.faces_detection === null
    );

    if (noFacesDetected) {
        return (
            <div className="alert alert-warning" role="alert">
                <BiSolidError className="me-2" />
                No faces were detected in the provided image.
            </div>
        );
    }

    return (
        <div>
            {/* TITLE */}
            <h1 className="display-5 fw-bold mb-3">
                <GoGoal className="me-2" />
                Result
            </h1>

            {/* LIST */}
            <ol className="text-start">
                {/* Original Image */}
                <li className="h3">Original Image:</li>
                <img
                    src={org_image}
                    alt="Original"
                    className="m-1 img-original"
                />

                {/* Face Detection */}
                <li className="h3">Face Detection:</li>
                {api_res.map((res, idx) => (
                    <img
                        key={`face-${idx}`}
                        className="m-1 img-square"
                        src={convertBase64ToImage(res.faces_detection)}
                        alt="Detected Face"
                    />
                ))}

                {/* Wavelet Transform */}
                <li className="h3">Wavelet Transform:</li>
                {api_res.map((res, idx) => (
                    <img
                        key={`wavelet-${idx}`}
                        className="m-1 img-square"
                        src={convertBase64ToImage(res.faces_transform)}
                        alt="Transformed Face"
                    />
                ))}

                {/* Classification Table */}
                <li className="h3">Classification:</li>
                <table className="table table-bordered text-center align-middle">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Face Image</th>
                            <th>Prediction</th>
                            <th>Probability for Messi</th>
                            <th>Probability for Ronaldo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {api_res.map((res, idx) => {
                            const faceImgUrl = convertBase64ToImage(
                                res.faces_detection
                            );
                            const [messiProb, ronaldoProb] =
                                res.class_probability[0].map((p) =>
                                    (p * 100).toFixed(2)
                                );

                            return (
                                <tr key={idx}>
                                    <th>{idx + 1}</th>
                                    <td>
                                        <img
                                            src={faceImgUrl}
                                            alt="Face"
                                            className="img-square-small"
                                        />
                                    </td>
                                    <td>{res.class}</td>
                                    <td>{messiProb}%</td>
                                    <td>{ronaldoProb}%</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </ol>
        </div>
    );
}

export default Result;
