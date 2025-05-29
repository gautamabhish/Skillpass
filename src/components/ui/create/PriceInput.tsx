import React, { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import Select from 'react-select';
import { CourseData } from '@/Providers/CreateProvider';
const currencyOptions = [
  { value: 'INR', label: '🇮🇳 INR (₹)', symbol: '₹' },
  // { value: 'USD', label: '🇺🇸 USD ($)', symbol: '$' },
  // { value: 'EUR', label: '🇪🇺 EUR (€)', symbol: '€' },
];

const PriceInput = ({ courseData, handleInputChange }:{courseData:CourseData , handleInputChange:any}) => {
  const [selectedCurrency, setSelectedCurrency] = useState(currencyOptions[0]);
  const [priceError, setPriceError] = useState('');

  const handlePriceChange = (value: string | undefined) => {
    if (!value || parseFloat(value) < 0) {
      setPriceError('Price must be a number greater than 0');
    } else {
      setPriceError('');
    }
    handleInputChange('price', value);
  };

  return (
    <div>
      <p className="font-medium text-gray-700">Price</p>

      <div className="flex items-center gap-3">
        <div className="w-1/3">
          <Select
            options={currencyOptions}
            defaultValue={selectedCurrency}
            onChange={(option) => {
              if (option) setSelectedCurrency(option);
            }}
          />
        </div>

        <div className="flex-1 items-center">
          <CurrencyInput
          title='0 means free'
            className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            name="price"
            placeholder="Enter the price, 0 means free"
            decimalsLimit={2}
            value={courseData.price }
            onValueChange={handlePriceChange}
            prefix={selectedCurrency.symbol}
          />
        
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-1">
        * Price in {selectedCurrency.label}
      </p>

      {priceError && <p className="text-sm text-red-500">{priceError}</p>}
    </div>
  );
};

export default PriceInput;
