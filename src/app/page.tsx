'use client';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { md5 } from 'js-md5';
import Loading from '@/components/Loading';
import TableHeader from '@/components/TableHeader';
import TableContainer from '@/components/TableContainer';
import TableFooter from '@/components/TableFooter';
import TableBody from '@/components/TableBody';
import FilterMenu from '@/components/FilterMenu';
import type { FilterType, IdsType } from '@/types';

const fetchFiltered = async (
  setIds: Dispatch<SetStateAction<IdsType>>,
  filter: FilterType | null,
  setLoading: Dispatch<SetStateAction<boolean>>,
  ) => {
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const url = 'http://api.valantis.store:40000/';
    const xAuth = md5(`Valantis_${timestamp}`);
    
    const requestBody = filter
    ? JSON.stringify({
      action: "filter",
      params: {
        product: filter.product,
        price: filter.price ? +filter.price : undefined,
        brand: filter.brand,
      },
    })
    : JSON.stringify({
      action: "get_ids",
      params: {},
    });
    
    setIds(null);
    setLoading(true);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'X-Auth': xAuth,
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });

      const data: { result: Array<string> } = await res.json();
      const uniqueIds = new Set(data.result);
      setIds([...uniqueIds]);
    } catch (error) {
      setIds('error');
      console.error('Error fetching data:', error);
      if (error instanceof Error && error.name) {
        console.error(`Error ID: ${error.name}`);
      }
      fetchFiltered(setIds, filter, setLoading);
    }
};


export default function Home() {
  const [ids, setIds] = useState<IdsType>(null);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<FilterType | null>(null);

  useEffect(() => {
    fetchFiltered(setIds, filter, setLoading);
  }, [filter]);

  if (!ids)
    return (<>
      <FilterMenu setFilter={setFilter} filter={filter} disabled={true} setPage={setPage}/>
      <Loading />
      </>)
  else
    return (
      <>
      <FilterMenu setFilter={setFilter} filter={filter} setPage={setPage}/>
      <TableContainer>
        <TableHeader />
        {typeof ids === 'string'
          ? 'error occured, trying again...'
          : <>
            <TableBody
              ids={ids.slice((page - 1) * 50, page * 50)}
              setLoading={setLoading}
              isLoading={isLoading}/>
            <TableFooter
              currPage={page}
              totalAmount={Math.ceil(ids.length / 50)}
              setPage={setPage}
              setLoading={setLoading}
              isLoading={isLoading}/>
          </>}
      </TableContainer>
      </>
  );
}
