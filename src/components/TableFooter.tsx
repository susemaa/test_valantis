import { Dispatch, SetStateAction } from 'react';

interface TableFooterProps {
	currPage: number,
	totalAmount: number,
	setPage: Dispatch<SetStateAction<number>>,
	setLoading: Dispatch<SetStateAction<boolean>>,
	isLoading: boolean,
}

const TableFooter: React.FC<TableFooterProps> = ({ currPage, totalAmount, setPage, setLoading, isLoading }) => {
	const isDisabled = (btn: 'prev' | 'next'): boolean => {
		if (isLoading)
			return true;
		if (!totalAmount)
			return true;
		if (currPage === 1 && btn === 'prev')
			return true;
		if (currPage === totalAmount && btn == 'next')
			return true;
	
		return false;
	}

	if (!totalAmount)
		return null;
  return (
		<tfoot>
			<tr>
				<td colSpan={4} className="py-3 px-6 text-center">
					<div className="inline-flex items-center">
						<button
							className={isDisabled('prev') ? 'btn-disabled-l' : 'btn-normal-l'}
							disabled={isDisabled('prev')}
							onClick={() => { setLoading(true); setPage(currPage - 1); }}>
							Prev
						</button>
						
						<select
							className={isLoading ? 'select-disabled' : 'select-normal'}
							value={currPage}
							onChange={(e) => { setLoading(true); setPage(Number(e.target.value)); }}
							disabled={isLoading}>
							{Array.from({ length: totalAmount }, (_, index) => (
								<option key={index + 1} value={index + 1}>
									{index + 1}
								</option>
							))}
						</select>

						<button
							className={isDisabled('next') ? 'btn-disabled-r' : 'btn-normal-r'}
							disabled={isDisabled('next')}
							onClick={() => { setLoading(true); setPage(currPage + 1); }}>
							Next
						</button>
					</div>
				</td>
			</tr>
		</tfoot>
	);
}

export default TableFooter;
