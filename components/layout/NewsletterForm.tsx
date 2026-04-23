'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 2400);
  }

  return (
    <form className="mt-5 flex flex-col gap-3" onSubmit={onSubmit} noValidate>
      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>
      <input
        id="footer-email"
        name="email"
        type="email"
        placeholder="your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-luxe"
        style={{
          background: 'rgba(250, 246, 240, 0.06)',
          borderColor: 'rgba(250, 246, 240, 0.22)',
          color: 'var(--color-cream)',
        }}
        aria-describedby="newsletter-note"
        required
      />
      <button type="submit" className="btn-primary" aria-live="polite">
        {submitted ? (
          <>
            <Check size={16} strokeWidth={2} aria-hidden="true" />
            Subscribed
          </>
        ) : (
          'Subscribe'
        )}
      </button>
      <span id="newsletter-note" className="sr-only">
        A quarterly letter. Unsubscribe at any time.
      </span>
    </form>
  );
}
