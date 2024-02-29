import { Dispatch, SetStateAction, useEffect } from "react";

interface TableFooterProps {
	currPage: number,
	totalAmount: number,
	setPage: Dispatch<SetStateAction<number>>,
	setLoading: Dispatch<SetStateAction<boolean>>,
	isLoading: boolean,
}

const TableFooter: React.FC<TableFooterProps> = ({ currPage, totalAmount, setPage, setLoading, isLoading }) => {
	useEffect(() => {
		console.log(isLoading);
	}, [currPage, isLoading]);
  return (
		<tfoot>
			<tr>
				<td colSpan={4} className="py-3 px-6 text-center">
					<div className="inline-flex items-center">
						<button
							className={currPage === 1 || isLoading ? 'btn-disabled-l' : 'btn-normal-l'}
							disabled={currPage === 1 || isLoading === true}
							onClick={() => { setLoading(true); setPage(currPage - 1); }}
						>
							Prev
						</button>
						
						<select
							className={isLoading ? 'select-disabled' : 'select-normal'}
							value={currPage}
							onChange={(e) => { setLoading(true); setPage(Number(e.target.value)); }}
							disabled={isLoading}
						>
							{Array.from({ length: totalAmount }, (_, index) => (
								<option key={index + 1} value={index + 1}>
									{index + 1}
								</option>
							))}
						</select>
						<button
							className={currPage === totalAmount || isLoading ? 'btn-disabled-r' : 'btn-normal-r'}
							disabled={currPage === totalAmount || isLoading}
							onClick={() => { setLoading(true); setPage(currPage + 1); }}
						>
							Next
						</button>
					</div>
				</td>
			</tr>
		</tfoot>
	);
}

export default TableFooter;
