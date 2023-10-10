import React, { useState } from 'react';
import {Container, Row, Col, Button, CloseButton, Image} from 'react-bootstrap';
import {XCircle} from "react-feather";

const ImageUpload = () => {
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleImageChange = (e) => {
        const newImages = [...images];
        const newPreviewImages = [...previewImages];

        for (let i = 0; i < e.target.files.length; i++) {
            const file = e.target.files[i];

            if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
                newImages.push(file);
                const reader = new FileReader();
                reader.onload = (e) => {
                    newPreviewImages.push(e.target.result);
                    setPreviewImages(newPreviewImages);
                    setImages(newImages);
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const handleRemoveImage = (index) => {
        const newImages = [...images];
        const newPreviewImages = [...previewImages];
        newImages.splice(index, 1);
        newPreviewImages.splice(index, 1);
        setImages(newImages);
        setPreviewImages(newPreviewImages);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <input
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        multiple
                        onChange={handleImageChange}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Row className="image-preview-container flex-column overflow-y-auto overflow-x-hidden">
                        {previewImages.map((preview, index) => (
                            <div
                                key={index}
                                className="image-preview p-3"
                            >
                                <div>
                                    <XCircle color='red' onClick={() => handleRemoveImage(index)} />
                                    <Image
                                        src={preview}
                                        alt={`Preview ${index}`}
                                        width={100}
                                        height={100}
                                        className="img-fluid"
                                    />
                                </div>
                            </div>
                        ))}
                    </Row>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <p>
                        {images.length > 0
                            ? `Remaining Images: ${images.length}`
                            : 'No Images Selected'}
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default ImageUpload;
