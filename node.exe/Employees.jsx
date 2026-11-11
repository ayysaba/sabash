/* Employees სექცია — JSONPlaceholder API: GET, POST, DELETE */
import React, { useState, useEffect } from 'react';
import SectionCard from '../ui/SectionCard';
import EmployeeCard from '../ui/EmployeeCard';

const API = 'https://jsonplaceholder.typicode.com/users';

export default function Employees() {
  const [employees, setEmployees]   = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [alert, setAlert]           = useState(null);
  const [search, setSearch]         = useState('');
  const [showForm, setShowForm]     = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm]             = useState({ name: '', email: '', company: '', city: '' });

  /* ---- HTTP GET ---- */
  useEffect(() => {
    fetch(API)
      .then(r => { if (!r.ok) throw new Error('ქსელის შეცდომა'); return r.json(); })
      .then(data => { setEmployees(data); setLoading(false); })
      .catch(() => { setError('ვერ მოხერხდა ჩატვირთვა.'); setLoading(false); });
  }, []);

  /* ---- HTTP DELETE ---- */
  const handleDelete = (id) => {
    if (!window.confirm('ნამდვილად გსურთ წაშლა?')) return;
    fetch(`${API}/${id}`, { method: 'DELETE' })
      .then(() => {
        setEmployees(prev => prev.filter(u => u.id !== id));
        showAlert('თანამშრომელი წაიშალა (HTTP DELETE)!', 'info');
      })
      .catch(() => showAlert('წაშლისას დაფიქსირდა შეცდომა.', 'error'));
  };

  /* ---- HTTP POST ---- */
  const handleAdd = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const payload = {
      name: form.name,
      username: form.name.toLowerCase().replace(/\s+/g, '_'),
      email: form.email,
      company: { name: form.company || 'Tech Studio' },
      address:  { city:  form.city  || 'თბილისი' },
    };
    fetch(API, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
      .then(r => r.json())
      .then(created => {
        created.id = created.id || Date.now();
        setEmployees(prev => [created, ...prev]);
        setForm({ name: '', email: '', company: '', city: '' });
        setShowForm(false);
        showAlert('ახალი თანამშრომელი დაემატა (HTTP POST)!', 'success');
      })
      .catch(() => showAlert('დამატებისას შეცდომა.', 'error'))
      .finally(() => setSubmitting(false));
  };

  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 5000);
  };

  /* ---- ძებნა ---- */
  const filtered = employees.filter(u => {
    const q = search.toLowerCase();
    return (
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.company?.name?.toLowerCase().includes(q)
    );
  });

  return (
    <SectionCard id="employees" title="ჩვენი გუნდი / თანამშრომლები">
      <p>
        თანამშრომელთა სია დინამიკურად იტვირთება <strong>JSONPlaceholder API</strong>-დან
        (HTTP <code>GET</code>). ასევე ინტეგრირებულია დამატება (<code>POST</code>) და
        წაშლა (<code>DELETE</code>).
      </p>

      {/* Controls */}
      <div className="employees-controls">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="მოძებნეთ სახელით, მეილით ან კომპანიით..."
          aria-label="თანამშრომლის ძებნა"
        />
        <button
          type="button"
          className="btn-primary-action"
          onClick={() => setShowForm(o => !o)}
        >
          {showForm ? '✕ ფორმის დახურვა' : '+ თანამშრომლის დამატება (POST)'}
        </button>
      </div>

      {/* POST ფორმა */}
      {showForm && (
        <form id="add-employee-form" className="add-employee-card" onSubmit={handleAdd}>
          <h3>ახალი თანამშრომლის დამატება (POST მეთოდი)</h3>
          <div className="form-grid">
            <p>
              <label>სახელი და გვარი: *
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="მაგ: გიორგი ბერიძე" required />
              </label>
            </p>
            <p>
              <label>ელ-ფოსტა: *
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="giorgi@example.com" required />
              </label>
            </p>
            <p>
              <label>კომპანია / პოზიცია:
                <input value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                  placeholder="მაგ: Romaguera" />
              </label>
            </p>
            <p>
              <label>ქალაქი:
                <input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                  placeholder="მაგ: თბილისი" />
              </label>
            </p>
          </div>
          <div className="form-actions">
            <button type="submit" disabled={submitting}>
              {submitting ? 'იგზავნება...' : 'დამატება (გაგზავნე POST)'}
            </button>
            <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>
              გაუქმება
            </button>
          </div>
        </form>
      )}

      {/* Alert */}
      {alert && (
        <div className={`employees-alert ${alert.type}`} role="status">
          {alert.msg}
        </div>
      )}

      {/* Loading / Error / Grid */}
      {loading && (
        <div className="employees-loading">
          <div className="spinner" />
          <p>თანამშრომლების სია იტვირთება სერვერიდან...</p>
        </div>
      )}
      {error && <p style={{ color: '#c62828' }}>{error}</p>}

      {!loading && !error && (
        <div id="employees-grid" className="employees-grid">
          {filtered.length === 0 ? (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-secondary)', padding: '25px' }}>
              თანამშრომელი ვერ მოიძებნა.
            </p>
          ) : (
            filtered.map(user => (
              <EmployeeCard key={user.id} user={user} onDelete={handleDelete} />
            ))
          )}
        </div>
      )}
    </SectionCard>
  );
}

