import React, { useEffect } from "react";
import './style.css'
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchItemById } from "../../redux/itemsSlice";
import { Modal } from "antd";
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface ModalItemInfoProps {
  itemId: number;
  onClose: () => void;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, 'dd MMMM yyyy HH:mm:ss', { locale: ru });
};

export const ModalItemInfo: React.FC<ModalItemInfoProps> = ({ itemId, onClose }) => {
  const dispatch: AppDispatch = useDispatch();
  const item = useSelector((state: RootState) => state.items.item);

  useEffect(() => {
    dispatch(fetchItemById(itemId));
  }, [itemId, dispatch]);

  return (
    <Modal
      title="Item Details"
      open={true}
      onCancel={onClose}
      footer={null}
    >
      <div className="item-container">
        <div className="img-box">
          <img src={item?.image} alt={item?.name} style={{ width: '15rem', height: '15rem' }} />
        </div>
        <div className="item-details">
          <p><span className="label">id:</span> {item?.id}</p>
          <p><span className="label">Creation Date:</span> {item?.createdAt ? formatDate(item.createdAt) : 'N/A'}</p>
          <p><span className="label">Owner Name:</span> {item?.name}</p>
          <p><span className="label">Description:</span> {item?.description}</p>
          <p><span className="label">Title:</span> {item?.title}</p>
          <p><span className="label">Price:</span> {item?.price}</p>
          <p><span className="label">Old Price:</span> {item?.oldPrice}</p>
          <p><span className="label">Category:</span> {item?.category}</p>
        </div>
      </div>
    </Modal>
  );
};