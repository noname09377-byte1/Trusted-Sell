
import React from 'react';

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  icon: React.ReactNode;
}

export interface Task {
  id: string;
  firstName: string;
  lastName: string;
  gmail: string;
  password: string;
  recovery: string;
  assignedAt: number;
}

export interface Order {
  id: string;
  serviceId: string;
  serviceName: string;
  quantity: number;
  paymentMethod: string;
  customerName: string;
  customerHandle: string;
  details: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: number;
  priceOverride?: number; // Used for admin balance adjustment
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export type ViewState = 'store' | 'admin' | 'order';
