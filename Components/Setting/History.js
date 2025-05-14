'use client';


import React, { useState } from 'react';

const ordersData = [
  { id: '#96459761', status: 'IN PROGRESS', date: 'Dec 30, 2019 07:52', total: '$80 (5 Products)' },
  { id: '#71667167', status: 'COMPLETED', date: 'Dec 7, 2019 23:26', total: '$70 (4 Products)' },
  { id: '#95214362', status: 'CANCELED', date: 'Dec 7, 2019 23:26', total: '$2,300 (2 Products)' },
  { id: '#71667167', status: 'COMPLETED', date: 'Feb 2, 2019 19:28', total: '$250 (1 Products)' },
  { id: '#51746385', status: 'COMPLETED', date: 'Dec 30, 2019 07:52', total: '$360 (2 Products)' },
  { id: '#51746385', status: 'CANCELED', date: 'Dec 4, 2019 21:42', total: '$220 (7 Products)' },
  { id: '#673971743', status: 'COMPLETED', date: 'Feb 2, 2019 19:28', total: '$80 (1 Products)' },
  { id: '#673971743', status: 'COMPLETED', date: 'Mar 20, 2019 23:14', total: '$160 (1 Products)' },
  { id: '#673971743', status: 'COMPLETED', date: 'Dec 4, 2019 21:42', total: '$1,500 (3 Products)' },
  { id: '#673971743', status: 'COMPLETED', date: 'Dec 30, 2019 07:52', total: '$1,200 (19 Products)' },
  { id: '#673971743', status: 'CANCELED', date: 'Dec 30, 2019 05:18', total: '$1,500 (1 Products)' },
  { id: '#673971743', status: 'COMPLETED', date: 'Dec 30, 2019 07:52', total: '$80 (1 Products)' },
];


const statusClasses = {
  'IN PROGRESS': 'text-orange-500',
  'COMPLETED': 'text-green-600',
  'CANCELED': 'text-red-500'
};

const History = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(ordersData.length / itemsPerPage);

  const paginateData = ordersData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full h-full p-4 overflow-x-auto bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Order History</h2>
      <table className="min-w-full table-auto text-left">
        <thead className="border-b-2">
          <tr className="text-gray-700">
            <th className="py-2 px-4">ORDER ID</th>
            <th className="py-2 px-4">STATUS</th>
            <th className="py-2 px-4">DATE</th>
            <th className="py-2 px-4">TOTAL</th>
            <th className="py-2 px-4">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {paginateData.map((order, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 px-4">{order.id}</td>
              <td className={`py-2 px-4 ${statusClasses[order.status]}`}>{order.status}</td>
              <td className="py-2 px-4">{order.date}</td>
              <td className="py-2 px-4">{order.total}</td>
              <td className="py-2 px-4 text-blue-600 cursor-pointer">View Details →</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-3 py-1 border rounded hover:bg-gray-200"
        >
          ←
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-orange-500 text-white' : 'hover:bg-gray-200'}`}
          >
            {`0${i + 1}`}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-3 py-1 border rounded hover:bg-gray-200"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default History
