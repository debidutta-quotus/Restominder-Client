import React from 'react';
import { X, ChefHat, Package, Truck } from 'lucide-react';
import './OrderStatusModal.css';

interface OrderStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
  onStatusChange: (orderId: string, status: 'preparing' | 'completed' | 'dispatched') => void;
}

const OrderStatusModal: React.FC<OrderStatusModalProps> = ({
  isOpen,
  onClose,
  order,
  onStatusChange,
}) => {
  if (!isOpen) return null;

  const handleStatusChange = (orderId: string, status: 'preparing' | 'completed' | 'dispatched') => {
    onStatusChange(orderId, status);
    onClose(); // Close modal after any status change
  };

  const getStatusButton = () => {
    switch (order.preparationStatus) {
      case 'preparing':
        return (
          <button
            className="order-status-modal-button order-status-modal-button-completed"
            onClick={() => handleStatusChange(order.orderId, 'completed')}
          >
            <Package size={16} />
            Mark as Prepared
          </button>
        );
      case 'completed':
        return (
          <button
            className="order-status-modal-button order-status-modal-button-dispatch"
            onClick={() => handleStatusChange(order.orderId, 'dispatched')}
          >
            <Truck size={16} />
            Dispatch Order
          </button>
        );
      default:
        return (
          <button
            className="order-status-modal-button order-status-modal-button-preparing"
            onClick={() => handleStatusChange(order.orderId, 'preparing')}
          >
            <ChefHat size={16} />
            Start Preparing
          </button>
        );
    }
  };

  const getStatusTag = () => {
    switch (order.preparationStatus) {
      case 'preparing':
        return <span className="order-status-modal-tag order-status-modal-tag-preparing">Preparing</span>;
      case 'completed':
        return <span className="order-status-modal-tag order-status-modal-tag-completed">Preparation Complete</span>;
      case 'dispatched':
        return <span className="order-status-modal-tag order-status-modal-tag-dispatched">Dispatched</span>;
      default:
        return <span className="order-status-modal-tag order-status-modal-tag-pending">Pending</span>;
    }
  };

  return (
    <div className="order-status-modal-overlay" onClick={onClose}>
      <div className="order-status-modal-container" onClick={e => e.stopPropagation()}>
        <div className="order-status-modal-header">
          <h2>Order Status</h2>
          <button className="order-status-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="order-status-modal-content">
          <div className="order-status-modal-info">
            <div className="order-status-modal-order-header">
              <div className={`order-status-modal-partner-label order-status-modal-partner-${order.channelId}`}>
                {order.channelId.toUpperCase()}
              </div>
              <div className="order-status-modal-order-id">{order.orderId}</div>
            </div>

            <div className="order-status-modal-status-section">
              {getStatusTag()}
            </div>

            <div className="order-status-modal-customer">
              <h3>Customer Details</h3>
              <p>{order.customerDetails.name}</p>
              <p>{order.customerDetails.phone}</p>
              <p>{order.customerDetails.email}</p>
            </div>

            <div className="order-status-modal-items">
              <h3>Order Items</h3>
              {order.items.map((item: any, index: number) => (
                <div key={index} className="order-status-modal-item">
                  <span className="order-status-modal-item-name">{item.name}</span>
                  <span className="order-status-modal-item-quantity">x{item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="order-status-modal-total">
              <span>Total Amount</span>
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="order-status-modal-actions">
            {order.preparationStatus !== 'dispatched' && getStatusButton()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusModal;