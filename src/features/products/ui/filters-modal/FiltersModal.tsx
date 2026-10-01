import { useEffect, useState } from 'react';
import { Button } from 'antd';
import { ProductFilters } from '../products-filters/ProductsFilters';
import { Product } from '../../api/productsApi.types';
import { StyledModal } from './styles';
interface FiltersModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: Product[]) => void;
  products: Product[];
}
export const FiltersModal = ({ open, onClose, onApply, products }: FiltersModalProps) => {
  const [tempFilters, setTempFilters] = useState<Product[]>(products);
  useEffect(() => {
    setTempFilters(products);
  }, [products]);
  const handleApply = () => {
    onApply(tempFilters);
  };
  return (
    <StyledModal
      title="Фильтры"
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="reset" onClick={() => setTempFilters(products)}>
          Сбросить
        </Button>,
        <Button key="apply" type="primary" onClick={handleApply}>
          Применить
        </Button>,
      ]}
      width={600}
      centered
    >
      <ProductFilters
        products={products}
        onFilterChange={(filterProducts) => setTempFilters(filterProducts)}
      />
    </StyledModal>
  );
};
