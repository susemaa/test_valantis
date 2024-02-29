import TableHeader from './TableHeader';
import TableContainer from './TableContainer';
import LoadingBody from './LoadingBody';

export default function Loading() {
  return (
    <TableContainer>
      <TableHeader />
      <LoadingBody />
    </TableContainer>
  );
}
