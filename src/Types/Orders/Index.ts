export interface CustomerDetails {
    name: string;
    phone: string;
    email: string;
}

export interface OrderItem {
    name: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    orderId: string;
    channelId: string; // 'uber' | 'doordash' | 'grubhub'
    storeId: string;
    menuId: string;
    orderStatus: 'new' | 'accepted' | 'completed' | 'rejected';
    preparationStatus?: 'pending' | 'preparing' | 'completed' | 'dispatched';
    totalAmount: number;
    quantity: number;
    pickUpTime: string;
    customerDetails: CustomerDetails;
    items?: OrderItem[]; // Optional for backward compatibility
    timestamp: string; // We'll keep this for sorting/display
}

export type PartnerType = string;