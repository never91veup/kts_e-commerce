import "./ProductPage.scss";
import { useParams } from 'react-router-dom';
import Button from "../../components/Button";
const ProductPage = () => {
    const { id } = useParams();

    return (
        <div>
            <Button>
                ProductPage - {id}
            </Button>
        </div>
    );
};

export default ProductPage;