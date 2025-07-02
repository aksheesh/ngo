import React from 'react';
import './Dashboard.css';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { FaUserEdit, FaHistory, FaGift, FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const data = [
  { month: 'May', amount: 30000 },
  { month: 'Jun', amount: 25000 },
  { month: 'Jul', amount: 43000 },
  { month: 'Aug', amount: 20000 },
  { month: 'Sep', amount: 28000 },
];

const transactions = [
  { name: "YouTube", status: "Pending", amount: -50 },
  { name: "John Doe", status: "Done", amount: -100 },
  { name: "Sans Brothers", status: "Done", amount: 120 },
  { name: "Cinema City", status: "Done", amount: -75 },
  { name: "To USD", status: "Done", amount: -250 },
];

export default function Dashboard() {
  const navigate = useNavigate();

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
          <div className="sidebar-icon" title="More Settings"><FaCog /></div>
          <img src="296fe121-5dfa-43f4-98b5-db50019738a7.jpg" alt="User Avatar" className="avatar" title="User Profile" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="content-wrapper">
        <div className="main-layout">
          {/* Main Dashboard Content */}
          <div className="main-content">
            <div className="dashboard-header">
              <div>
                <h1 className="dashboard-title">FundFlow Dashboard</h1>
                <p className="welcome-message">Welcome back, User</p>
              </div>
            </div>

            {/* Top Row - Balance + Transactions */}
            <div className="top-row">
              <div className="card balance-card">
                <h2>Total Balance</h2>
                <p className="balance">$73,558.00</p>
                <p className="balance-message">
                  Today is {new Date().toLocaleDateString('en-IN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })} – spend wisely.
                </p>
                <div className="health-row">
                  <p className="health-score">85%</p>
                  <div className="button-group">
                    <button className="btn-small" onClick={() => navigate('/transaction')}>
                        VIEW TRANSACTION
                    </button>
                    <button className="btn-small" onClick={() => navigate('/new-transaction')}>
                      ADD TRANSACTION
                    </button>
                  </div>
                </div>
              </div>

              <div className="card recent-transactions-card">
                <div className="dashboard-header">
                  <div>
                    <h1 className="dashboard-title">Recent Transactions</h1>
                    <p className="welcome-message">Latest Transactions</p>
                  </div>
                  <div className="search-container">
                    <img src="/icons/search_3856329.png" alt="Search" className="search-icon" />
                    <input type="text" placeholder="Search transactions..." className="search-input" />
                  </div>
                </div>

                <ul className="transactions-list">
                  {transactions.map((txn, i) => (
                    <li key={i} className="transaction-item">
                      <span>{txn.name}</span>
                      <span className={txn.amount < 0 ? "amount-negative" : "amount-positive"}>
                        {txn.amount < 0 ? '-' : '+'}${Math.abs(txn.amount)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Row - Monthly Stats + Quick Transfer */}
            <div className="bottom-row">
              <div className="card">
                <h3>Monthly Income & Expenses</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={data}>
                    <XAxis dataKey="month" />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#4f46e5" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="card">
                <h3>Financial Health</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={data}>
                    <XAxis dataKey="month" />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#4f46e5" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="card quick-transfer-card">
                <h3>Quick Transfer</h3>
                <div className="contact-list">
                  {['Akshit', 'Binayak', 'Jason', 'Rahul'].map((initials, i) => (
                    <div key={i} className="contact-circle" title={`Contact ${i + 1}`}>
                      {initials}
                    </div>
                  ))}
                </div>
                <div className="transfer-controls">
                  <input type="text" className="transfer-input" placeholder="$ Amount" />
                  <button className="btn-small">Send</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
