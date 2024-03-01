import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FilterType } from '@/types';

interface FilterMenuProps {
	filter: FilterType | null,
	setFilter: Dispatch<SetStateAction<FilterType | null>>,
	setPage: Dispatch<SetStateAction<number>>,
	disabled?: boolean,
}

type Filters = 'price' | 'product' | 'brand' | ''

const FilterMenu : React.FC<FilterMenuProps> = ({ filter, setFilter, disabled, setPage }) => {
	const activeFilter = filter ? ['price', 'product', 'brand', ''].filter((str) => Object.hasOwn(filter, str)).join('') as Filters : '';
  const [isOpen, setIsOpen] = useState(false);
  const [localFilter, setLocalFilter] = useState<FilterType | null>(filter || null);
  const [activeField, setActiveField] = useState<Filters>(activeFilter);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleInputChange = (field: Filters) => (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
	
		if (field === 'price' && !/^\d*$/.test(newValue))
			return;
	
		if ((field === 'product' || field === 'brand') && /^\d+$/.test(newValue))
			return;
	
		if (newValue)
			setLocalFilter({ [field]: newValue });
		else
			setLocalFilter(null);
		setActiveField(newValue ? field : '');
	};
	
	
	

  const applyFilters = () => {
    setFilter(localFilter);
		setPage(1);
    setIsOpen(false);
  };

  return (
    <div className="container mx-auto mt-5">
      <div className="flex justify-between items-center p-4 bg-white border-b border-gray-200">
        <span className="text-lg font-semibold">Фильтры</span>
        <button
					onClick={toggleMenu}
					className={disabled ? "btn-disabled" : "btn-normal"}
					disabled={disabled}>
          {isOpen ? "Скрыть" : "Показать"}
        </button>
      </div>
      {isOpen && (
        <div className="w-full p-4 bg-white shadow-lg">
          <div className={`grid ${activeField ? 'grid-cols-1' : 'grid-cols-3'} gap-4`}>
            {(!activeField || activeField === 'price') && (
              <div className="relative">
                <label className="label-base">Цена</label>
                <input
                  type="text"
                  value={localFilter?.price || ''}
                  onChange={handleInputChange('price')}
                  className="input-base"
                />
              </div>
            )}
            {(!activeField || activeField === 'product') && (
              <div className="relative">
                <label className="label-base">Название</label>
                <input
                  type="text"
                  value={localFilter?.product || ''}
                  onChange={handleInputChange('product')}
                  className="input-base"
                />
              </div>
            )}
            {(!activeField || activeField === 'brand') && (
              <div className="relative">
                <label className="label-base">Бренд</label>
                <input
                  type="text"
                  value={localFilter?.brand || ''}
                  onChange={handleInputChange('brand')}
                  className="input-base"
                />
              </div>
            )}
            <button onClick={applyFilters} className="col-span-3 btn-normal mt-4">
              Применить
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterMenu;
