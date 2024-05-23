// app/admin/page.tsx

'use client';
import React, { useEffect, useState } from 'react';

// Define the Visitor interface
interface Visitor {
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  url: string;
  userAgent: string;
  ipAddress: string;
  screenResolution: string;
  language: string;
  date: string;
}

const AdminPage: React.FC = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const response = await fetch('/api/admin/visitors');
        if (response.ok) {
          const data = await response.json();
          setVisitors(data);
        } else {
          console.error('Failed to fetch visitors');
        }
      } catch (error: any) {
        console.error('Error fetching visitors:', error);
      }
    };

    fetchVisitors();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Visitor Information</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referrer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UTM Source</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UTM Medium</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UTM Campaign</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Agent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Screen Resolution</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {visitors.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-6 py-4 text-center text-gray-500">
                  No visitors found.
                </td>
              </tr>
            ) : (
              visitors.map((visitor, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-4 whitespace-nowrap">{visitor.referrer || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{visitor.utmSource || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{visitor.utmMedium || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{visitor.utmCampaign || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{visitor.url}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{visitor.userAgent}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{visitor.ipAddress || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{visitor.screenResolution || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{visitor.language || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(visitor.date).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
