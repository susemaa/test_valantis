import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { md5 } from 'js-md5';
import LoadingBody from './LoadingBody';
import type { ItemType, IdsType } from '@/types';

interface TableBodyProps {
  ids: IdsType;
  setLoading: Dispatch<SetStateAction<boolean>>,
  isLoading: boolean,
}

const fetchItems = async (
  ids: IdsType,
  ): Promise<ItemType[]> => {
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const url = 'http://api.valantis.store:40000/';
    const xAuth = md5(`Valantis_${timestamp}`);

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'X-Auth': xAuth,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: "get_items",
        params: {
          ids: ids,
        },
      })
    });

    const data: { result: Array<ItemType>} = await res.json();
    const uniqueItems = data.result.reduce((acc: ItemType[], currentItem) => {
      if (!acc.find(item => item.id === currentItem.id)) {
        acc.push(currentItem);
      }
      return acc;
    }, []);

    return uniqueItems;
};

const TableBody: React.FC<TableBodyProps> = ({ ids, setLoading, isLoading }) => {
  const [items, setItems] = useState<Array<ItemType> | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedItems = await fetchItems(ids);
        setItems(fetchedItems);
        // setLoading(false);
      } catch (e) {
        console.error(e);
        loadData();
      }
    };

    loadData();
  }, [ids]);

  useEffect(() => {
    if (items)
      setLoading(false);
  }, [items])

  return (!isLoading
		? <tbody className="text-gray-600 text-sm font-light">
			{ids?.length
      ? items?.map((item: ItemType) => (
          <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
            <td className="py-3 px-6 text-left">{item.id}</td>
            <td className="py-3 px-6 text-left">{item.product}</td>
            <td className="py-3 px-6 text-left">{item.price.toLocaleString('ru-RU')}</td>
            <td className="py-3 px-6 text-left">{item.brand ?? 'Неизвестен'}</td>
          </tr>))
      : <tr>
          <td colSpan={4} className="py-3 px-6 text-center">
              <div>
                Ничего не было найдено, попробуйте изменить фильтры
              </div>
          </td>
        </tr>
      }
		</tbody>
    : <LoadingBody />
  );  
};

export default TableBody;
