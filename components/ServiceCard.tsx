
import React from 'react';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { Service } from '../types.ts';

interface ServiceCardProps {
  service: Service;
  onOrder: (service: Service) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onOrder }) => {
  return (
    <div className="group bg-white rounded-2xl border border-gray-200 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
          {service.icon}
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full uppercase tracking-wider">
          {service.category}
        </span>
      </div>
      
      <h3 className="text-lg font-bold text-gray-900 mb-2">{service.name}</h3>
      <p className="text-gray-500 text-sm mb-6 line-clamp-2">
        {service.description}
      </p>
      
      <div className="flex items-center justify-between mt-auto">
        <div>
          <span className="text-2xl font-black text-indigo-600">৳{service.price}</span>
          <span className="text-xs text-gray-400 block">per unit</span>
        </div>
        
        <button 
          onClick={() => onOrder(service)}
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-600 transition-colors"
        >
          Order Now
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
