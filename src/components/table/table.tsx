import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { columns } from "./columns";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../redux/itemsSlice";
import { ModalItemInfo } from "../../components/item/item";

interface CustomTableProps {
  searchText: string;
  selectedCategory: string | null;
}

export const CustomTable: React.FC<CustomTableProps> = ({ searchText, selectedCategory }) => {
  const dispatch: AppDispatch = useDispatch();
  const { items, status } = useSelector((state: RootState) => state.items);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [order, setOrder] = useState<'asc' | 'desc' | null>(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchItems({}));
    }
  }, [status, dispatch]);

  const handleRowClick = (id: number) => {
    setSelectedItemId(id);
  };

  const handleCloseModal = () => {
    setSelectedItemId(null);
  };

  const handleSort = (field: string, order: 'asc' | 'desc') => {
    setSortBy(field);
    setOrder(order);
    dispatch(fetchItems({ sortBy: field, orderBy: field, order }));
  };

  const filteredItems = React.useMemo(() => {
    let result = items;
    if (searchText) {
      result = result.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.category.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (selectedCategory) {
      result = result.filter(item => item.category === selectedCategory);
    }
    return result;
  }, [items, searchText, selectedCategory]);

  const sortedItems = React.useMemo(() => {
    if (!sortBy || !order) return filteredItems;
    return [...filteredItems].sort((a, b) => {
      if (a[sortBy as keyof typeof a] < b[sortBy as keyof typeof b]) {
        return order === 'asc' ? -1 : 1;
      }
      if (a[sortBy as keyof typeof a] > b[sortBy as keyof typeof b]) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredItems, sortBy, order]);

  const tableColumns = columns(handleRowClick, handleSort);

  return (
    <>
      <Table
        rowKey='id'
        dataSource={sortedItems}
        columns={tableColumns}
        scroll={{ x: '80rem' }}
      />
      {selectedItemId && (
        <ModalItemInfo
          itemId={selectedItemId}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};