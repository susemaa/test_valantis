import React from 'react';

interface TableContainerProps {
  children: React.ReactNode;
}

const TableContainer: React.FC<TableContainerProps> = ({ children }) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-18">
      <div className="container mx-auto mt-5">
        <table className="table-auto w-full">
          {children}
        </table>
      </div>
    </main>
  );
}

export default TableContainer;
