import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Clock, Package, History, ChefHat, User, Phone, Mail, ChevronDown, Search } from 'lucide-react';
import './OrdersPage.css';
import { showErrorToast, showInfoToast, showSuccessToast } from '../../utils/Toast/Toast';
import { Order } from '../../Types/index';
import { mockOrders } from '../../assets/DummyData/MockOrders';
import OrderStatusModal from './Modals/OrderStatusModal/Index';

const OrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>(mockOrders);
    const [filter, setFilter] = useState<'all' | 'uber' | 'doordash' | 'grubhub'>('all');
    const [view, setView] = useState<'active' | 'history'>('active');
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [showCustomerDetails, setShowCustomerDetails] = useState<string | null>(null);
    const [showPartnerDropdown, setShowPartnerDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showTopScroll, setShowTopScroll] = useState(false);
    const [showBottomScroll, setShowBottomScroll] = useState(true);
    const modalContentRef = useRef<HTMLDivElement>(null);

    // Filter orders for each column
    const newOrders = orders.filter(order => order.orderStatus === 'new' &&
        (filter === 'all' || order.channelId === filter));
    const acceptedOrders = orders.filter(order => order.orderStatus === 'accepted' &&
        (filter === 'all' || order.channelId === filter));

    // Filter history orders with search term
    const historyOrders = orders.filter(order =>
        (order.orderStatus === 'completed' || order.orderStatus === 'rejected') &&
        (filter === 'all' || order.channelId === filter) &&
        (searchTerm === '' ||
            order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerDetails.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (order.items && order.items.some(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            ))
        )
    );

    // Handle order status change
    const handleStatusChange = (orderId: string, status: 'preparing' | 'completed' | 'dispatched') => {
        setOrders(prev =>
            prev.map(order => {
                if (order.orderId === orderId) {
                    const updatedOrder = {
                        ...order,
                        preparationStatus: status,
                    };

                    // If order is dispatched, move it to history
                    if (status === 'dispatched') {
                        updatedOrder.orderStatus = 'completed';
                    }

                    return updatedOrder;
                }
                return order;
            })
        );

        // Show appropriate toast message
        switch (status) {
            case 'preparing':
                showInfoToast(`Order ${orderId} is now being prepared`);
                break;
            case 'completed':
                showSuccessToast(`Order ${orderId} preparation is complete`);
                break;
            case 'dispatched':
                showSuccessToast(`Order ${orderId} has been dispatched`);
                break;
        }
    };

    // Open status modal for an order
    const openStatusModal = (order: any) => {
        setSelectedOrder(order);
        setIsStatusModalOpen(true);
    };

    // Toggle customer details visibility
    const toggleCustomerDetails = (orderId: string) => {
        if (showCustomerDetails === orderId) {
            setShowCustomerDetails(null);
        } else {
            setShowCustomerDetails(orderId);
        }
    };

    // Accept an order
    const handleAccept = (orderId: string) => {
        setOrders(prev =>
            prev.map(order =>
                order.orderId === orderId ? { ...order, orderStatus: 'accepted' } : order
            )
        );

        showSuccessToast(`Order ${orderId} has been accepted.`);
    };

    // Reject an order
    const handleReject = (orderId: string) => {
        setOrders(prev =>
            prev.map(order =>
                order.orderId === orderId ? { ...order, orderStatus: 'rejected' } : order
            )
        );

        showErrorToast(`Order ${orderId} has been rejected`);
    };

    // Calculate time difference
    const getTimeDifference = (dateString: string) => {
        const orderDate = new Date(dateString);
        const now = new Date();
        const diffMinutes = Math.floor((now.getTime() - orderDate.getTime()) / 60000);

        if (diffMinutes < 1) return 'Just now';
        if (diffMinutes === 1) return '1 minute ago';
        if (diffMinutes < 60) return `${diffMinutes} minutes ago`;

        const diffHours = Math.floor(diffMinutes / 60);
        if (diffHours === 1) return '1 hour ago';
        return `${diffHours} hours ago`;
    };

    // Format pickup time
    const formatPickupTime = (dateString: string) => {
        const pickupDate = new Date(dateString);
        const now = new Date();
        const diffMinutes = Math.floor((pickupDate.getTime() - now.getTime()) / 60000);

        if (diffMinutes < 0) return 'ASAP';
        if (diffMinutes < 60) return `${diffMinutes} mins`;

        const diffHours = Math.floor(diffMinutes / 60);
        if (diffHours === 1) return '1 hour';
        return `${diffHours} hours`;
    };

    // Get status tag component
    const getStatusTag = (status: string | undefined) => {
        switch (status) {
            case 'preparing':
                return <span className="status-tag status-preparing">Preparing</span>;
            case 'completed':
                return <span className="status-tag status-completed">Ready for Dispatch</span>;
            case 'dispatched':
                return <span className="status-tag status-dispatched">Dispatched</span>;
            default:
                return <span className="status-tag status-pending">Pending</span>;
        }
    };

    // Simulate receiving new orders
    useEffect(() => {
        const interval = setInterval(() => {
            const partners = ['uber', 'doordash', 'grubhub'] as const;
            const randomPartner = partners[Math.floor(Math.random() * partners.length)];
            const fixedStoreId = 'store-001'; // Using fixed store ID for consistency
            const randomMenu = `menu-00${Math.floor(1 + Math.random() * 3)}`;
            const randomOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

            const items = [
                {
                    name: ['Pizza', 'Burger', 'Sushi', 'Salad', 'Pasta'][Math.floor(Math.random() * 5)],
                    quantity: Math.floor(1 + Math.random() * 3),
                    price: parseFloat((7.99 + Math.random() * 10).toFixed(2))
                },
                {
                    name: ['Fries', 'Wings', 'Breadsticks', 'Rice', 'Soup'][Math.floor(Math.random() * 5)],
                    quantity: Math.floor(1 + Math.random() * 2),
                    price: parseFloat((3.99 + Math.random() * 5).toFixed(2))
                }
            ];

            // Calculate total
            const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

            const firstNames = ['John', 'Jane', 'Michael', 'Emma', 'David', 'Sarah', 'Robert', 'Linda'];
            const lastNames = ['Smith', 'Johnson', 'Brown', 'Wilson', 'Lee', 'Walker', 'Hall', 'Young'];
            const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

            const newOrder: Order = {
                id: randomOrderId,
                orderId: randomOrderId,
                channelId: randomPartner,
                storeId: fixedStoreId,
                menuId: randomMenu,
                orderStatus: 'new',
                totalAmount: parseFloat(totalAmount.toFixed(2)),
                quantity: totalQuantity,
                pickUpTime: new Date(Date.now() + Math.floor(15 + Math.random() * 60) * 60000).toISOString(),
                customerDetails: {
                    name: `${randomFirstName} ${randomLastName}`,
                    phone: `555-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
                    email: `${randomFirstName.toLowerCase()}.${randomLastName.toLowerCase()}@example.com`
                },
                items: items,
                timestamp: new Date().toISOString()
            };

            setOrders(prev => [newOrder, ...prev]);
            showInfoToast(`New Order Received from ${newOrder.channelId.toUpperCase()}`);
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const cardVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
    };

    // Toggle history modal
    const toggleHistoryModal = () => {
        setShowHistoryModal(!showHistoryModal);
        if (!showHistoryModal) {
            setView('history');
        }
    };

    // Toggle partner dropdown
    const togglePartnerDropdown = () => {
        setShowPartnerDropdown(!showPartnerDropdown);
    };

    // Select partner filter
    const selectPartner = (partner: 'all' | 'uber' | 'doordash' | 'grubhub') => {
        setFilter(partner);
        setShowPartnerDropdown(false);
    };

    // Handle modal content scroll
    const handleModalScroll = () => {
        if (modalContentRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = modalContentRef.current;
            setShowTopScroll(scrollTop > 10);
            setShowBottomScroll(scrollTop + clientHeight < scrollHeight - 10);
        }
    };

    // Initialize scroll indicators when modal opens
    useEffect(() => {
        if (showHistoryModal && modalContentRef.current) {
            handleModalScroll();
        }
    }, [showHistoryModal, historyOrders]);

    return (
        <div className="orders-container">
            <header className="orders-header">
                <h1 className="orders-title">Order Management</h1>

                <div className="orders-filters">
                    <button
                        className={`filter-button ${view === 'active' ? 'active' : ''}`}
                        onClick={() => setView('active')}
                    >
                        <ChefHat size={16} style={{ marginRight: '4px', verticalAlign: 'text-bottom' }} />
                        Active Orders
                    </button>
                    <button
                        className={`filter-button ${view === 'history' ? 'active' : ''}`}
                        onClick={toggleHistoryModal}
                    >
                        <History size={16} style={{ marginRight: '4px', verticalAlign: 'text-bottom' }} />
                        Order History
                    </button>

                    {/* Partner dropdown */}
                    <div className="partner-dropdown-container">
                        <button
                            className={`filter-button ${filter !== 'all' ? 'active' : ''}`}
                            onClick={togglePartnerDropdown}
                        >
                            {filter === 'all' ? 'All Partners' :
                                filter === 'uber' ? 'Uber Eats' :
                                    filter === 'doordash' ? 'DoorDash' : 'Grubhub'}
                            <ChevronDown size={16} style={{ marginLeft: '4px', verticalAlign: 'text-bottom' }} />
                        </button>

                        {showPartnerDropdown && (
                            <div className="partner-dropdown">
                                <button
                                    className={`dropdown-item ${filter === 'all' ? 'active' : ''}`}
                                    onClick={() => selectPartner('all')}
                                >
                                    All Partners
                                </button>
                                <button
                                    className={`dropdown-item ${filter === 'uber' ? 'active' : ''}`}
                                    onClick={() => selectPartner('uber')}
                                >
                                    Uber Eats
                                </button>
                                <button
                                    className={`dropdown-item ${filter === 'doordash' ? 'active' : ''}`}
                                    onClick={() => selectPartner('doordash')}
                                >
                                    DoorDash
                                </button>
                                <button
                                    className={`dropdown-item ${filter === 'grubhub' ? 'active' : ''}`}
                                    onClick={() => selectPartner('grubhub')}
                                >
                                    Grubhub
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <div className="orders-content">
                {/* New Orders Column */}
                <div className="orders-column">
                    <div className="column-header">
                        New Orders <span className="count">{newOrders.length}</span>
                    </div>

                    <AnimatePresence>
                        {newOrders.length > 0 ? (
                            newOrders.map(order => (
                                <motion.div
                                    key={order.orderId}
                                    className="order-card"
                                    variants={cardVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    layout
                                >
                                    <div className={`partner-label partner-${order.channelId}`}>
                                        {order.channelId === 'uber' ? 'UBER EATS' :
                                            order.channelId === 'doordash' ? 'DOORDASH' : 'GRUBHUB'}
                                    </div>
                                    <div className="order-id">{order.orderId}</div>

                                    <div className="order-meta">
                                        <div className="order-time">{getTimeDifference(order.timestamp)}</div>
                                        <button
                                            className="customer-details-toggle"
                                            onClick={() => toggleCustomerDetails(order.orderId)}
                                        >
                                            <User size={14} /> {order.customerDetails.name}
                                        </button>
                                    </div>

                                    {showCustomerDetails === order.orderId && (
                                        <div className="customer-details-expanded">
                                            <div className="customer-detail">
                                                <User size={14} />
                                                <span>{order.customerDetails.name}</span>
                                            </div>
                                            <div className="customer-detail">
                                                <Phone size={14} />
                                                <span>{order.customerDetails.phone}</span>
                                            </div>
                                            <div className="customer-detail">
                                                <Mail size={14} />
                                                <span>{order.customerDetails.email}</span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="order-details">
                                        <div className="detail-row">
                                            <span className="detail-label">Items:</span>
                                            <span className="detail-value">{order.quantity}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">Pickup:</span>
                                            <span className="detail-value pickup-time">{formatPickupTime(order.pickUpTime)}</span>
                                        </div>
                                    </div>

                                    {order.items && (
                                        <div className="order-items">
                                            {order.items.map((item, index) => (
                                                <div className="item" key={index}>
                                                    <span className="item-name">{item.name}</span>
                                                    <span className="item-quantity">x{item.quantity}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="order-total">
                                        <span>Total</span>
                                        <span>${order.totalAmount.toFixed(2)}</span>
                                    </div>

                                    <div className="order-actions">
                                        <button
                                            className="action-button accept-button"
                                            onClick={() => handleAccept(order.orderId)}
                                        >
                                            <Check size={16} /> Accept
                                        </button>
                                        <button
                                            className="action-button reject-button"
                                            onClick={() => handleReject(order.orderId)}
                                        >
                                            <X size={16} /> Reject
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="empty-column">
                                <Clock className="empty-icon" />
                                <div className="empty-text">No new orders</div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Accepted Orders Column */}
                <div className="orders-column">
                    <div className="column-header">
                        Accepted Orders <span className="count">{acceptedOrders.length}</span>
                    </div>

                    <AnimatePresence>
                        {acceptedOrders.length > 0 ? (
                            acceptedOrders.map(order => (
                                <motion.div
                                    key={order.orderId}
                                    className="order-card order-card-accepted-order"
                                    variants={cardVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    layout
                                    onClick={() => openStatusModal(order)}
                                >
                                    <div className={`partner-label partner-${order.channelId}`}>
                                        {order.channelId === 'uber' ? 'UBER EATS' :
                                            order.channelId === 'doordash' ? 'DOORDASH' : 'GRUBHUB'}
                                    </div>
                                    <div className="order-id">{order.orderId}</div>

                                    <div className="order-meta">
                                        <div className="order-time">{getTimeDifference(order.timestamp)}</div>
                                        <div className="customer-name">{order.customerDetails.name}</div>
                                    </div>

                                    <div className="order-details">
                                        <div className="detail-row">
                                            <span className="detail-label">Items:</span>
                                            <span className="detail-value">{order.quantity}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">Status:</span>
                                            <span className="detail-value">
                                                {getStatusTag(order.preparationStatus)}
                                            </span>
                                        </div>
                                    </div>

                                    {order.items && (
                                        <div className="order-items">
                                            {order.items.map((item: any, index: number) => (
                                                <div className="item" key={index}>
                                                    <span className="item-name">{item.name}</span>
                                                    <span className="item-quantity">x{item.quantity}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="order-total">
                                        <span>Total</span>
                                        <span>${order.totalAmount.toFixed(2)}</span>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="empty-column">
                                <Package className="empty-icon" />
                                <div className="empty-text">No accepted orders</div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Recent Activity Column */}
                <div className="orders-column recent-activity">
                    <div className="column-header">
                        Recent Activity <span className="count">{historyOrders.slice(0, 3).length}</span>
                    </div>

                    <AnimatePresence>
                        {historyOrders.length > 0 ? (
                            historyOrders.slice(0, 3).map(order => (
                                <motion.div
                                    key={order.orderId}
                                    className="order-card mini-card"
                                    variants={cardVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    layout
                                >
                                    <div className={`partner-label partner-${order.channelId}`}>
                                        {order.channelId === 'uber' ? 'UBER EATS' :
                                            order.channelId === 'doordash' ? 'DOORDASH' : 'GRUBHUB'}
                                    </div>
                                    <div className="order-id">{order.orderId}</div>
                                    <div className="order-meta">
                                        <div className="order-time mini">{getTimeDifference(order.timestamp)}</div>
                                        <div className="mini-total">${order.totalAmount.toFixed(2)}</div>
                                    </div>

                                    <div
                                        className={`completed-label ${order.orderStatus === 'completed' ? 'completed-success' : 'completed-rejected'
                                            }`}
                                    >
                                        {order.orderStatus === 'completed' ? (
                                            <>
                                                <Check size={16} /> Completed
                                            </>
                                        ) : (
                                            <>
                                                <X size={16} /> Rejected
                                            </>
                                        )}
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="empty-column">
                                <History className="empty-icon" />
                                <div className="empty-text">No recent activity</div>
                            </div>
                        )}
                    </AnimatePresence>

                    <button
                        className="view-all-button"
                        onClick={toggleHistoryModal}
                    >
                        View All History
                    </button>
                </div>
            </div>

            {/* History Modal */}
            {showHistoryModal && (
                <div className="history-modal-overlay" onClick={toggleHistoryModal}>
                    <div className="history-modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Order History</h2>

                            <div className="modal-search">
                                <div className="search-input-container">
                                    <Search size={16} className="search-icon" />
                                    <input
                                        type="text"
                                        placeholder="Search orders by ID, customer, or items..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="search-input"
                                    />
                                    {searchTerm && (
                                        <button
                                            className="clear-search"
                                            onClick={() => setSearchTerm('')}
                                        >
                                            <X size={14} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <button className="close-button" onClick={toggleHistoryModal}>
                                <X size={20} />
                            </button>
                        </div>

                        <div className="modal-content-wrapper">
                            <div
                                className={`scroll-indicator scroll-indicator-top ${showTopScroll ? 'visible' : ''}`}
                                aria-hidden="true"
                            />

                            <div
                                ref={modalContentRef}
                                className="modal-content"
                                onScroll={handleModalScroll}
                            >
                                {historyOrders.length > 0 ? (
                                    historyOrders.map(order => (
                                        <motion.div
                                            key={order.orderId}
                                            className="order-card history-card"
                                            variants={cardVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                        >
                                            <div className={`partner-label partner-${order.channelId}`}>
                                                {order.channelId === 'uber' ? 'UBER EATS' :
                                                    order.channelId === 'doordash' ? 'DOORDASH' : 'GRUBHUB'}
                                            </div>
                                            <div className="order-id">{order.orderId}</div>
                                            <div className="order-meta">
                                                <div className="order-time">{getTimeDifference(order.timestamp)}</div>
                                                <div className="customer-name">{order.customerDetails.name}</div>
                                            </div>

                                            <div className="customer-details-expanded">
                                                <div className="customer-detail">
                                                    <User size={14} />
                                                    <span>{order.customerDetails.name}</span>
                                                </div>
                                                <div className="customer-detail">
                                                    <Phone size={14} />
                                                    <span>{order.customerDetails.phone}</span>
                                                </div>
                                                <div className="customer-detail">
                                                    <Mail size={14} />
                                                    <span>{order.customerDetails.email}</span>
                                                </div>
                                            </div>

                                            <div className="order-details">
                                                <div className="detail-row">
                                                    <span className="detail-label">Items:</span>
                                                    <span className="detail-value">{order.quantity}</span>
                                                </div>
                                            </div>

                                            {order.items && (
                                                <div className="order-items">
                                                    {order.items.map((item, index) => (
                                                        <div className="item" key={index}>
                                                            <span className="item-name">{item.name}</span>
                                                            <span className="item-quantity">x{item.quantity}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="order-total">
                                                <span>Total</span>
                                                <span>${order.totalAmount.toFixed(2)}</span>
                                            </div>

                                            <div
                                                className={`completed-label ${order.orderStatus === 'completed' ? 'completed-success' : 'completed-rejected'
                                                    }`}
                                            >
                                                {order.orderStatus === 'completed' ? (
                                                    <>
                                                        <Check size={16} /> Completed
                                                    </>
                                                ) : (
                                                    <>
                                                        <X size={16} /> Rejected
                                                    </>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="empty-history">
                                        <History size={48} />
                                        <p>No order history available</p>
                                    </div>
                                )}
                            </div>

                            <div
                                className={`scroll-indicator scroll-indicator-bottom ${showBottomScroll ? 'visible' : ''}`}
                                aria-hidden="true"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Order Status Modal */}
            {selectedOrder && (
                <OrderStatusModal
                    isOpen={isStatusModalOpen}
                    onClose={() => setIsStatusModalOpen(false)}
                    order={selectedOrder}
                    onStatusChange={handleStatusChange}
                />
            )}
        </div>
    );
};

export default OrdersPage;