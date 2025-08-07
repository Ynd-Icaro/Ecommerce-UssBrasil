// Brand Sidebar component
import React from 'react';  
import { cn } from '@/lib/utils';

interface BrandSidebarProps {
  onBrandFilter: (brand: string) => void;
  selectedBrand: string;
}

const BrandSidebar: React.FC<BrandSidebarProps> = ({ onBrandFilter, selectedBrand }) => {
  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="font-semibold mb-4">Marcas</h2>
      <ul>
        {/* Map through your brand list here */}
        <li>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={selectedBrand === 'brand1'}
              onChange={() => onBrandFilter('brand1')}
              className="mr-2"
            />
            Brand 1
          </label>
        </li>
      </ul>
    </div>
  );
};

export default BrandSidebar;
