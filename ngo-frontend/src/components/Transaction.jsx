import React, { useState } from 'react';
import './TransactionHistory.css';
import { FaUserEdit, FaHistory, FaGift, FaCog } from 'react-icons/fa';

const transactions = [
  { name: "Amazon", date: "2025-06-21", amount: -120, category: "Shopping" },
  { name: "Netflix", date: "2025-06-20", amount: -20, category: "Entertainment" },
  { name: "Salary", date: "2025-06-18", amount: 3000, category: "Income" },
  { name: "Starbucks", date: "2025-06-17", amount: -5, category: "Food" },
  { name: "Uber", date: "2025-06-15", amount: -30, category: "Transport" },
  { name: "Spotify", date: "2025-06-13", amount: -10, category: "Entertainment" },
  { name: "Apple Store", date: "2025-06-12", amount: -199, category: "Shopping" },
  { name: "Freelance", date: "2025-06-10", amount: 800, category: "Income" },
  { name: "Dominos", date: "2025-06-08", amount: -15, category: "Food" },
  { name: "Airbnb", date: "2025-06-05", amount: -250, category: "Travel" },
];

export default function TransactionHistory() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch = txn.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === '' || txn.category === category;
    const txnDate = new Date(txn.date);
    const inRange =
      (!startDate || new Date(startDate) <= txnDate) &&
      (!endDate || txnDate <= new Date(endDate));
    return matchesSearch && matchesCategory && inRange;
  });

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-top">
          <div className="sidebar-logo">🌟</div>
          <ul className="sidebar-menu">
            <li title="Edit Profile"><FaUserEdit className="icon" /></li>
            <li title="Transaction History"><FaHistory className="icon" /></li>
            <li title="Refer & Earn"><FaGift className="icon" /></li>
            <li title="Settings"><FaCog className="icon" /></li>
          </ul>
        </div>
        <div className="sidebar-bottom">
          <div className="sidebar-icon"><FaCog /></div>
          <img src="296fe121-5dfa-43f4-98b5-db50019738a7.jpg" alt="User Avatar" className="avatar" />
        </div>
      </div>

      {/* Main Content */}
      <div className="content-wrapper">
        <div className="main-layout">
          <div className="main-content">
            <h1 className="dashboard-title">Transaction History</h1>

            {/* Filters */}
            <div className="filters">
              <input
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">All Categories</option>
                <option value="Shopping">Shopping</option>
                <option value="Food">Food</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Income">Income</option>
                <option value="Travel">Travel</option>
                <option value="Transport">Transport</option>
              </select>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            {/* Table */}
            <div className="transactions-table">
              {filteredTransactions.map((txn, i) => (
                <div key={i} className="txn-row">
                  <div className="txn-name">
                    <strong>{txn.name}</strong>
                    <div className="txn-date">{txn.date}</div>
                  </div>
                  <div className={`txn-amount ${txn.amount < 0 ? 'negative' : 'positive'}`}>
                    {txn.amount < 0 ? '-' : '+'}${Math.abs(txn.amount)}
                  </div>
                  <div className="txn-category">{txn.category}</div>
                </div>
              ))}
              {filteredTransactions.length === 0 && <p>No transactions match your filters.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
