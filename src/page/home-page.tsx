import '../styles/home-page.css'
import React, { useEffect, useState } from "react";
import { CustomTable } from "../components/table/table";
import Search from "antd/es/input/Search";
import { Select } from "antd";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../redux/itemsSlice";

const { Option } = Select;

export const HomePage: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const { items, status } = useSelector((state: RootState) => state.items);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchItems({}));
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === 'succeeded') {
      // Получаем уникальные категории из данных
      const uniqueCategories = Array.from(new Set(items.map(item => item.category)));
      setCategories(uniqueCategories);
    }
  }, [items, status]);

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleCategoryChange = (value: string | undefined) => {
    setSelectedCategory(value || null);
  };

  return (
    <div className="home-page">
      <div className="widgets">
        <Search
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onSearch={handleSearch}
          allowClear
          enterButton
          style={{ marginBottom: 16 }}
        />
        <Select
          placeholder="Select category"
          style={{ width: 200, marginBottom: 16 }}
          onChange={handleCategoryChange}
          allowClear
        >
          {categories.map((category) => (
            <Option key={category} value={category}>
              {category}
            </Option>
          ))}
        </Select>
      </div>
      <CustomTable searchText={searchText} selectedCategory={selectedCategory} />
    </div>
  );
};