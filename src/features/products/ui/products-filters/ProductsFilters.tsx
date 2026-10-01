import React, { useState, useEffect } from 'react';
import { Checkbox, Input, Slider, Collapse, Typography, Rate, Divider } from 'antd';
import { StyledFilters } from './styles';
import { Product } from '../../api/productsApi.types';
const { Panel } = Collapse;
const { Text } = Typography;
interface FilterProps {
  products: Product[];
  onFilterChange: (filteredProducts: Product[]) => void;
}
export const ProductFilters: React.FC<FilterProps> = ({ products, onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  useEffect(() => {
    applyFilters();
  }, [selectedCategories, selectedBrands, selectedTags, priceRange, selectedRating]);
  const applyFilters = () => {
    let filtered = [...products];
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => p.category && selectedCategories.includes(p.category));
    }
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) => p.brand && selectedBrands.includes(p.brand));
    }
    if (selectedTags.length > 0) {
      filtered = filtered.filter((p) => p.tags && p.tags.some((tag) => selectedTags.includes(tag)));
    }
    filtered = filtered.filter(
      (p) => p.price !== undefined && p.price >= priceRange[0] && p.price <= priceRange[1],
    );
    if (selectedRating > 0) {
      filtered = filtered.filter((p) => p.rating !== undefined && p.rating >= selectedRating);
    }
    onFilterChange(filtered);
  };
  const categories = Array.from(
    new Set(products.map((p) => p.category).filter((c): c is string => !!c)),
  );
  const brands = Array.from(new Set(products.map((p) => p.brand).filter((b): b is string => !!b)));
  const tags = Array.from(
    new Set(products.flatMap((p) => p.tags || []).filter((t): t is string => !!t)),
  );
  const handlePriceChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setPriceRange([value[0], value[1]]);
    }
  };
  return (
    <StyledFilters>
      <Collapse ghost defaultActiveKey={['1']}>
        <Panel header="Категории" key="1">
          <Checkbox.Group
            options={categories.map((c) => ({ label: c, value: c }))}
            value={selectedCategories}
            onChange={(values) => setSelectedCategories(values as string[])}
          />
        </Panel>

        <Panel header="Бренды" key="2">
          <Checkbox.Group
            options={brands.map((b) => ({ label: b, value: b }))}
            value={selectedBrands}
            onChange={(values) => setSelectedBrands(values as string[])}
          />
        </Panel>

        <Panel header="Теги" key="3">
          <Checkbox.Group
            options={tags.map((t) => ({ label: t, value: t }))}
            value={selectedTags}
            onChange={(values) => setSelectedTags(values as string[])}
          />
        </Panel>

        <Panel header="Цена" key="4">
          <div style={{ marginBottom: 16 }}>
            <Slider range min={0} max={1000} value={priceRange} onChange={handlePriceChange} />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Input
              type="number"
              placeholder="От"
              value={priceRange[0]}
              onChange={(e) => {
                const val = Number(e.target.value);
                setPriceRange([val, priceRange[1]]);
              }}
            />
            <Input
              type="number"
              placeholder="До"
              value={priceRange[1]}
              onChange={(e) => {
                const val = Number(e.target.value);
                setPriceRange([priceRange[0], val]);
              }}
            />
          </div>
        </Panel>

        <Panel header="Рейтинг" key="5">
          <Rate value={selectedRating} onChange={setSelectedRating} allowClear />
          {selectedRating > 0 && <Text style={{ marginLeft: 8 }}>{selectedRating}+ звезд</Text>}
        </Panel>
      </Collapse>

      <Divider />
    </StyledFilters>
  );
};
