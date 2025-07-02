import React, { useState, useEffect } from 'react';
import './newTransaction.css';

export default function NewTransaction() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({
    date: '',
    description: '',
    amount: '',
    category: '',
    type: 'Expense',
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.description || !formData.amount || !formData.category) return;
    setTransactions((prev) => [...prev, { ...formData, amount: parseFloat(formData.amount) }]);
    setFormData({ date: '', description: '', amount: '', category: '', type: 'Expense' });
  };

  return (
    <div className="transaction-container">
      <div className="transaction-main">
        <div className="transaction-card">
          <h2>Add New Transaction</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="transfer-input"
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="transfer-input"
                placeholder="Enter description"
                required
              />
            </div>

            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="transfer-input"
                placeholder="$"
                required
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="transfer-input"
                required
              >
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Bills">Bills</option>
                <option value="Shopping">Shopping</option>
                <option value="Salary">Salary</option>
              </select>
            </div>

            <div className="form-group">
              <label>Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="transfer-input"
                required
              >
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>

            <button type="submit" className="btn">Add Transaction</button>
          </form>
        </div>

        <div className="transaction-card">
          <h3>Stored Transactions</h3>
          <ul className="transactions-list">
            {transactions.map((txn, index) => (
              <li key={index} className="transaction-item">
                <span>{txn.description} ({txn.category})</span>
                <span className={txn.type === 'Expense' ? 'amount-negative' : 'amount-positive'}>
                  {txn.type === 'Expense' ? '-' : '+'}${txn.amount.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
