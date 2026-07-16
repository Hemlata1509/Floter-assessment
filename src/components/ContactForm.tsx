import { useState, type FormEvent } from "react";
import { QUERY_TYPES } from "../data/content";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { CachedSubmission, ContactFormData, QueryType } from "../types";
import Reveal from "./Reveal";

const EMPTY_FORM: ContactFormData = {
  name: "",
  email: "",
  queryType: QUERY_TYPES[0],
  message: "",
};

const STORAGE_KEY = "contour.contact.lastSubmission";

export default function ContactForm() {
  const [cached, setCached] = useLocalStorage<CachedSubmission | null>(STORAGE_KEY, null);
  const [form, setForm] = useState<ContactFormData>(cached ?? EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [dismissedWelcome, setDismissedWelcome] = useState(false);

  const update = <K extends keyof ContactFormData>(key: K, value: ContactFormData[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Please tell us your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.message.trim()) next.message = "Add a short message so we know how to help.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setShowConfirm(true);
  };

  const confirmSend = () => {
    const submission: CachedSubmission = { ...form, submittedAt: new Date().toISOString() };
    setCached(submission);
    setShowConfirm(false);
    setShowSuccess(true);
  };

  const startNewMessage = () => {
    setForm(EMPTY_FORM);
    setDismissedWelcome(true);
    setShowSuccess(false);
  };

  return (
    <section id="contact" className="px-5 md:px-8 py-16 md:py-24 border-t border-line">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <h2 className="text-2xl md:text-4xl font-medium mb-2">Got a question?</h2>
          <p className="text-slate mb-8">
            Tell us what you're building! We reply within one working day.
          </p>
        </Reveal>

        {cached && !dismissedWelcome && (
          <div className="mb-6 flex items-center justify-between gap-4 rounded-xl bg-implement-soft text-implement-deep px-5 py-3.5 text-sm animate-fadeIn">
            <span>
              Welcome back, <strong>{cached.name.split(" ")[0]}</strong>! We've restored your last
              message from this device.
            </span>
            <button
              type="button"
              onClick={() => setDismissedWelcome(true)}
              className="text-implement-deep/60 hover:text-implement-deep"
              aria-label="Dismiss"
            >
              ✕
            </button>
          </div>
        )}

        <Reveal delay={100}>
          <form onSubmit={onSubmit} noValidate className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className={`w-full rounded-lg border px-4 py-2.5 bg-white focus:ring-2 focus:ring-implement/30 outline-none transition-colors ${errors.name ? "border-design" : "border-line"
                  }`}
                placeholder="Ada Lovelace"
              />
              {errors.name && <p className="text-design text-xs mt-1">{errors.name}</p>}
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={`w-full rounded-lg border px-4 py-2.5 bg-white focus:ring-2 focus:ring-implement/30 outline-none transition-colors ${errors.email ? "border-design" : "border-line"
                    }`}
                  placeholder="ada@example.com"
                />
                {errors.email && <p className="text-design text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="queryType" className="block text-sm font-medium mb-1.5">
                  Query type
                </label>
                <select
                  id="queryType"
                  value={form.queryType}
                  onChange={(e) => update("queryType", e.target.value as QueryType)}
                  className="w-full rounded-lg border border-line px-4 py-2.5 bg-white focus:ring-2 focus:ring-implement/30 outline-none transition-colors"
                >
                  {QUERY_TYPES.map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                className={`w-full rounded-lg border px-4 py-2.5 bg-white focus:ring-2 focus:ring-implement/30 outline-none transition-colors resize-none ${errors.message ? "border-design" : "border-line"
                  }`}
                placeholder="A few lines about what you're building…"
              />
              {errors.message && <p className="text-design text-xs mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 rounded-lg bg-ink text-paper font-medium hover:bg-implement-deep hover:-translate-y-0.5 active:translate-y-0 hover:shadow-lg hover:shadow-ink/20 transition-all duration-200"
            >
              Send message
            </button>
          </form>
        </Reveal>
      </div>

      {/* Preview / confirmation popup */}
      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 backdrop-blur-sm px-4 animate-fadeIn"
          onClick={() => setShowConfirm(false)}
        >
          <div
            className="bg-paper rounded-2xl w-full max-w-md p-6 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
          >
            <h3 id="confirm-title" className="text-lg font-medium mb-1">
              Confirm your message
            </h3>
            <p className="text-sm text-slate mb-4">Double-check the details before we send this.</p>
            <dl className="text-sm space-y-2 mb-6 rounded-lg bg-white border border-line p-4">
              <div className="flex justify-between gap-4">
                <dt className="text-slate">Name</dt>
                <dd className="font-medium text-right">{form.name}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate">Email</dt>
                <dd className="font-medium text-right">{form.email}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate">Query type</dt>
                <dd className="font-medium text-right">{form.queryType}</dd>
              </div>
              <div className="pt-2 border-t border-line">
                <dt className="text-slate mb-1">Message</dt>
                <dd className="leading-relaxed">{form.message}</dd>
              </div>
            </dl>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2.5 rounded-lg border border-line hover:bg-line/40 active:scale-[0.97] transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmSend}
                className="flex-1 px-4 py-2.5 rounded-lg bg-ink text-paper hover:bg-implement-deep hover:shadow-lg hover:shadow-ink/20 active:scale-[0.97] transition-all duration-200"
              >
                Confirm & send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success popup */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 backdrop-blur-sm px-4 animate-fadeIn">
          <div
            className="bg-paper rounded-2xl w-full max-w-sm p-6 text-center animate-scaleIn"
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-title"
          >
            <div className="w-12 h-12 rounded-full bg-plan-soft text-plan-deep flex items-center justify-center mx-auto mb-4 text-xl animate-scaleIn">
              ✓
            </div>
            <h3 id="success-title" className="text-lg font-medium mb-1.5">
              Message successfully sent
            </h3>
            <p className="text-sm text-slate mb-6">
              Thanks, {form.name.split(" ")[0]}. We'll be in touch within one working day.
            </p>
            <button
              type="button"
              onClick={startNewMessage}
              className="w-full px-4 py-2.5 rounded-lg bg-ink text-paper hover:bg-implement-deep hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </section>
  );
}