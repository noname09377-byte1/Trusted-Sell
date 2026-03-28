import React, { useState } from 'react';
import { X, Send, CreditCard } from 'lucide-react';
import { Service, Order } from '../types.ts';
import { PAYMENT_METHODS } from '../constants.tsx';

interface OrderFormProps {
  service: Service | null;
  onClose: () => void;
  onSubmit: (order: Order) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ service, onClose, onSubmit }) => {
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerHandle, setCustomerHandle] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0]);
  const [details, setDetails] = useState('');

  if (!service) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      serviceId: service.id,
      serviceName: service.name,
      quantity,
      paymentMethod,
      customerName,
      customerHandle,
      details,
      status: 'pending',
      createdAt: Date.now(),
    };
    onSubmit(newOrder);
  };

  const totalPrice = service.price * quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Confirm Your Order</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="bg-indigo-50 p-4 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-indigo-600">{service.name}</p>
              <p className="text-xs text-indigo-400">৳{service.price} / account</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-indigo-200 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors"
              > - </button>
              <span className="font-bold text-lg w-8 text-center">{quantity}</span>
              <button 
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-indigo-200 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors"
              > + </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                required
                type="text" 
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telegram Handle</label>
              <input 
                required
                type="text" 
                value={customerHandle}
                onChange={(e) => setCustomerHandle(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none"
                placeholder="@username"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
            <div className="grid grid-cols-2 gap-2">
              {PAYMENT_METHODS.map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${paymentMethod === method ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-600'}`}
                >
                  <CreditCard className="w-4 h-4" />
                  {method}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
            <textarea 
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none h-24 resize-none"
              placeholder="Any specific requirements?"
            />
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500 font-medium">Total Price:</span>
              <span className="text-3xl font-black text-gray-900">৳{totalPrice}</span>
            </div>
            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-lg shadow-indigo-200"
            >
              <Send className="w-5 h-5" />
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
