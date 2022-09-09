const ImageUpload = () => {
    const imageResizeAndUpload = (e) => {
        console.log(e.target.files);
    };
    return (
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
    );
};

export default ImageUpload;
