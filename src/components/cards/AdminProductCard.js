//EXTERNAL IMPORT
import { Card } from "antd";

const { Meta } = Card;

const AdminProductCard = ({ product }) => {
    let { title, description, images } = product;
    return (
        <Card
            cover={
                <img
                    alt="product"
                    src={images && images.length ? images[0].url : ""}
                    style={{ height: "150px", objectFit: "cover" }}
                    className="p-1"
                />
            }
        >
            <Meta title={title} description={description} />
        </Card>
    );
};

export default AdminProductCard;
