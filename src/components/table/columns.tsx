import { ColumnProps } from "antd/es/table";
import { Items } from "../../types/redux-types";

export const columns = (handleRowClick: (id: number) => void, handleSort: (field: string, order: 'asc' | 'desc') => void): ColumnProps<Items>[] => [
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
    render: (image: string) => (
      <img src={image} alt="Image" style={{ width: '100px', height: '100px' }} />
    ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    onHeaderCell: () => ({
      onClick: () => handleSort('name', 'asc')
    }),
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    sorter: (a, b) => a.category.localeCompare(b.category),
    onHeaderCell: () => ({
      onClick: () => handleSort('category', 'asc')
    }),
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    sorter: (a, b) => parseFloat(a.price) - parseFloat(b.price),
    onHeaderCell: () => ({
      onClick: () => handleSort('price', 'asc')
    }),
  },
  {
    title: 'Details',
    dataIndex: 'id',
    key: 'details',
    render: (id: number) => (
      <a onClick={() => handleRowClick(id)}>View Details</a>
    ),
  },
];
