/* Contact სექცია */
import React, { useState } from 'react';
import SectionCard from '../ui/SectionCard';
import { contactInfo } from '../../data/portfolioData';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <SectionCard id="contact" title="კონტაქტი">
      <ul className="contact-info">
        <li>📧 ელ-ფოსტა: <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></li>
        <li>🐙 GitHub: <a href={contactInfo.github} target="_blank" rel="noreferrer">{contactInfo.githubLabel}</a></li>
        <li>📍 მდებარეობა: {contactInfo.location}</li>
      </ul>

      <fieldset>
        <legend>📨 შეტყობინების გამოგზავნა</legend>

        {sent && (
          <p style={{ color: 'green', fontWeight: 600 }}>
            ✅ შეტყობინება გაიგზავნა! (სადემო)
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <p>
              <label htmlFor="contact-name">სახელი: *</label>
              <input
                id="contact-name" name="name" type="text"
                value={form.name} onChange={handleChange}
                placeholder="შენი სახელი" required
              />
            </p>
            <p>
              <label htmlFor="contact-email">ელ-ფოსტა: *</label>
              <input
                id="contact-email" name="email" type="email"
                value={form.email} onChange={handleChange}
                placeholder="sheni@email.com" required
              />
            </p>
            <p>
              <label htmlFor="contact-subject">თემა:</label>
              <input
                id="contact-subject" name="subject" type="text"
                value={form.subject} onChange={handleChange}
                placeholder="შეტყობინების თემა"
              />
            </p>
            <p>
              <label htmlFor="contact-message">შეტყობინება: *</label>
              <textarea
                id="contact-message" name="message"
                value={form.message} onChange={handleChange}
                placeholder="შენი შეტყობინება..." required
              />
            </p>
          </div>
          <div className="form-actions">
            <button type="submit">📨 გაგზავნა</button>
            <button type="reset" onClick={() => setForm({ name: '', email: '', subject: '', message: '' })}>
              გასუფთავება
            </button>
          </div>
        </form>
      </fieldset>
    </SectionCard>
  );
}

