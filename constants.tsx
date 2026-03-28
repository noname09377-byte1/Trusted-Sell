
import React from 'react';
import { Mail, Shield, UserCheck, Smartphone, Zap } from 'lucide-react';
import { Service } from './types';

export const SERVICES: Service[] = [
  {
    id: 'gmail-fresh',
    name: 'Fresh Gmail Account',
    description: 'High quality fresh accounts for daily work. Recovery added.',
    price: 100,
    category: 'Gmail',
    icon: <Mail className="w-6 h-6" />
  },
  {
    id: 'gmail-aged',
    name: 'Aged Gmail (2022+)',
    description: 'Old established accounts with high trust score.',
    price: 150,
    category: 'Premium',
    icon: <Shield className="w-6 h-6" />
  },
  {
    id: 'bulk-deal',
    name: 'Bulk Pack (50x)',
    description: 'Special discounted rate for bulk buyers. Instant delivery.',
    price: 4500,
    category: 'Bulk',
    icon: <Zap className="w-6 h-6" />
  },
  {
    id: 'verify-service',
    name: 'Instant SMS Verify',
    description: 'Verification for any platform globally.',
    price: 80,
    category: 'Tools',
    icon: <Smartphone className="w-6 h-6" />
  }
];

export const PAYMENT_METHODS = [
  'bKash (Personal)',
  'Nagad (Personal)',
  'Rocket',
  'Binance (USDT)'
];
