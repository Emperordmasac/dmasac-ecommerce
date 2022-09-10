//EXTERNAL IMPORT
import { useSelector } from "react-redux";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar, Badge } from "antd";

const ImageUpload = ({ productValues, SetProductValues, setLoading }) => {
    const { user } = useSelector((state) => ({ ...state }));

    const imageResizeAndUpload = (e) => {
        let files = e.target.files;
        let uploadedImages = productValues.images;
        if (files) {
            setLoading(true);
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (uri) => {
                        axios
                            .post(
                                `${process.env.REACT_APP_API}/upload_images`,
                                { image: uri },
                                {
                                    headers: {
                                        authToken: user ? user.token : "",
                                    },
                                }
                            )
                            .then((res) => {
                                console.log("cloudinaty chck", res);
                                setLoading(false);
                                uploadedImages.push(res.data);
                                SetProductValues({
                                    ...productValues,
                                    images: uploadedImages,
                                });
                            })
                            .catch((error) => {
                                setLoading(false);
                                console.log("CLOUDINARRY ERROR", error);
                            });
                    },
                    "base64"
                );
            }
        }
    };

    const handleImageRemove = (public_id) => {
        setLoading(true);
        axios
            .post(
                `${process.env.REACT_APP_API}/remove_image`,
                { public_id },
                {
                    headers: {
                        authToken: user ? user.token : "",
                    },
                }
            )
            .then((res) => {
                setLoading(false);
                let { images } = productValues;
                let filteredImages = images.filter((image) => {
                    return image.public_id !== public_id;
                });
                SetProductValues({ ...productValues, images: filteredImages });
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    };

    return (
        <>
            <div>
                <label className="btn btn-raised">
                    Choose Files
                    <input
                        type="file"
                        multiple
                        accept="images/*"
                        onChange={imageResizeAndUpload}
                        hidden
                    />
                </label>
            </div>
            <br />
            <div className="column">
                {productValues.images &&
                    productValues.images.map((image) => (
                        <Badge
                            key={image.public_id}
                            count="X"
                            onClick={() => handleImageRemove(image.public_id)}
                            style={{ cursor: "pointer" }}
                        >
                            <Avatar
                                src={image.url}
                                size={100}
                                className="m-3"
                            />
                        </Badge>
                    ))}
            </div>
        </>
    );
};

export default ImageUpload;
