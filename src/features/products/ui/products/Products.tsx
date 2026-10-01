import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { paths } from '@/shared/routes';
import { observer } from 'mobx-react-lite';
import { Container, Grid, ProductsColumn } from './styles';
import { Product } from '../../api/productsApi.types';
import { FiltersModal } from '../filters-modal/FiltersModal';
import { ProductAPI } from '../../api/productsApi';
import { productsStore } from '../../model/products-store';
import { Pagination } from '../../../../components/pagination/Pagination';
import { ProductItem } from '../product-item/ProductItem';
export const Products = observer(() => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();
  const [totalElements, setTotalElements] = useState<number>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const loadProducts = async (params?: { skip: number; limit: number }) => {
    await ProductAPI.fetchProducts(params).then((response) => {
      setTotalElements(response.total);
      productsStore.setAllProducts(response?.products || []);
    });
  };
  useEffect(() => {
    void loadProducts({ skip: (page - 1) * pageSize, limit: pageSize });
  }, [page, pageSize]);
  const onClickNavigateProductDetails = (id: number) => {
    navigate(paths.products.detail(id));
  };
  const handleApplyFilters = (filters: Product[]) => {
    productsStore.setFilteredProducts(filters);
    setIsFilterOpen(false);
  };
  return (
    <Container>
      <div onClick={() => setIsFilterOpen(true)}>ОТКРЫТЬ ФИЛЬТРЫ</div>

      <FiltersModal
        open={isFilterOpen}
        onApply={handleApplyFilters}
        onClose={() => setIsFilterOpen(false)}
        products={productsStore.allProducts}
      />

      <ProductsColumn>
        <Grid>
          {productsStore.productsToShow.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onItemClick={onClickNavigateProductDetails}
            />
          ))}
        </Grid>
      </ProductsColumn>

      <Pagination
        total={totalElements}
        onChange={(page, pageSize) => {
          setPageSize(pageSize);
          setPage(page);
        }}
      />
    </Container>
  );
});
