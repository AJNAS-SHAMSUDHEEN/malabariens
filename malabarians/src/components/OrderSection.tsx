"use client";
import { useState } from "react";
import Image from "next/image";
import s from "./OrderSection.module.css";
import { buildWhatsAppURL, PRICE_PER_UNIT } from "@/lib/whatsapp";

const QTY_PRESETS = [1, 5, 10, 20];

const WaIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

interface FormState { name: string; phone: string; address: string; notes: string; }

export default function OrderSection() {
  const [qty, setQty] = useState(1);
  const [form, setForm] = useState<FormState>({ name: "", phone: "", address: "", notes: "" });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [success, setSuccess] = useState(false);

  const total = qty * PRICE_PER_UNIT;

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Please enter your full name";
    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) e.phone = "Enter a valid 10-digit Indian mobile number";
    if (!form.address.trim()) e.address = "Please enter your delivery address";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleOrder = () => {
    if (!validate()) return;
    const url = buildWhatsAppURL({ name: form.name, phone: form.phone, address: form.address, quantity: qty, notes: form.notes || undefined });
    window.open(url, "_blank", "noopener,noreferrer");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 6000);
  };

  return (
    <section id="order" className={s.section}>
      <div className={s.topLine} aria-hidden="true" />
      <div className="container">
        <header className={s.sectionHead}>
          <p className={s.pill}>Place Your Order</p>
          <h2 className={s.h2}>
            Order via <span>WhatsApp</span>
          </h2>
          <div className={s.divider} />
          <p className={s.subtext}>Fill in your details and we confirm your order instantly on WhatsApp</p>
        </header>

        <div className={s.layout}>
          {/* ── Left column: Product + Qty + Total ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-5)" }}>

            {/* Product card */}
            <div className={s.productCard}>
              <div className={s.productHead}>
                <div className={s.productThumb}>
                  <Image src="/product-hero.png" alt="MALABARIANS Avil Milk Mix 80g" fill style={{ objectFit: "contain", padding: "6px" }} />
                </div>
                <div className={s.productMeta}>
                  <p className={s.productBrand}>Malabarians</p>
                  <h3 className={s.productName}>Instant Avil Milk Mix</h3>
                  <p className={s.productVariant}>Banana &amp; Cardamom · 80g</p>
                  <div className={s.productPrice}>
                    <span className={s.priceAmt}>₹{PRICE_PER_UNIT}</span>
                    <span className={s.priceUnit}>/ packet</span>
                  </div>
                </div>
              </div>

              {/* Qty presets */}
              <div className={s.qtySection}>
                <p className={s.qtyLabel}>Select Quantity</p>
                <div className={s.qtyPresets}>
                  {QTY_PRESETS.map(q => (
                    <button
                      key={q}
                      id={`qty-preset-${q}`}
                      className={`${s.qtyBtn} ${qty === q ? s.qtyBtnActive : ""}`}
                      onClick={() => setQty(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>

                <div className={s.qtyStepper}>
                  <button id="qty-minus" className={s.stepBtn} onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity">−</button>
                  <input
                    id="qty-input"
                    type="number"
                    min={1}
                    max={999}
                    value={qty}
                    onChange={e => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                    className={s.stepInput}
                    aria-label="Quantity"
                  />
                  <button id="qty-plus" className={s.stepBtn} onClick={() => setQty(qty + 1)} aria-label="Increase quantity">+</button>
                </div>
              </div>
            </div>

            {/* Total card */}
            <div className={s.totalCard}>
              <div className={s.totalInner}>
                <div className={s.totalRow}>
                  <div>
                    <p className={s.totalLabel}>Order Total</p>
                    <p className={s.totalSub}>{qty} packet{qty > 1 ? "s" : ""} × ₹{PRICE_PER_UNIT}</p>
                  </div>
                  <p className={s.totalAmt}>₹{total}</p>
                </div>
                <div className={s.perks}>
                  {["Free Delivery*", "Tamper-proof Seal", "Natural Ingredients", "Quick Dispatch"].map(p => (
                    <span key={p} className={s.perk}>{p}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Right column: Form ── */}
          <div className={s.formCard}>
            <div className={s.formHead}>
              <div className={s.formHeadIcon}>
                <svg width="18" height="18" fill="none" stroke="white" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <h3 className={s.formHeadTitle}>Delivery Details</h3>
            </div>

            <div className={s.formBody}>
              {/* Name */}
              <div className={s.field}>
                <label htmlFor="order-name" className={s.label}>Full Name *</label>
                <input
                  id="order-name"
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className={`${s.input} ${errors.name ? s.inputError : ""}`}
                  autoComplete="name"
                />
                {errors.name && <p className={s.err}>⚠ {errors.name}</p>}
              </div>

              {/* Phone */}
              <div className={s.field}>
                <label htmlFor="order-phone" className={s.label}>Phone Number *</label>
                <div className={s.phoneRow}>
                  <span className={s.phoneFlag}>🇮🇳 +91</span>
                  <input
                    id="order-phone"
                    type="tel"
                    placeholder="9946605923"
                    maxLength={10}
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })}
                    className={`${s.input} ${errors.phone ? s.inputError : ""}`}
                    autoComplete="tel"
                  />
                </div>
                {errors.phone && <p className={s.err}>⚠ {errors.phone}</p>}
              </div>

              {/* Address */}
              <div className={s.field}>
                <label htmlFor="order-address" className={s.label}>Delivery Address *</label>
                <textarea
                  id="order-address"
                  rows={3}
                  placeholder="House no., Street, Area, District, PIN code"
                  value={form.address}
                  onChange={e => setForm({ ...form, address: e.target.value })}
                  className={`${s.textarea} ${errors.address ? s.inputError : ""}`}
                  autoComplete="street-address"
                />
                {errors.address && <p className={s.err}>⚠ {errors.address}</p>}
              </div>

              {/* Notes */}
              <div className={s.field}>
                <label htmlFor="order-notes" className={s.label}>Special Instructions <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(Optional)</span></label>
                <input
                  id="order-notes"
                  type="text"
                  placeholder="Any special instructions..."
                  value={form.notes}
                  onChange={e => setForm({ ...form, notes: e.target.value })}
                  className={s.input}
                />
              </div>

              {/* Summary */}
              <div className={s.summary}>
                <span className={s.summaryText}>{qty} packet{qty > 1 ? "s" : ""} × ₹{PRICE_PER_UNIT}</span>
                <span className={s.summaryAmt}>₹{total}</span>
              </div>

              {/* Submit */}
              <button id="place-order-btn" className={s.submitBtn} onClick={handleOrder} type="button">
                <WaIcon />
                Send Order on WhatsApp · ₹{total}
              </button>

              <p className={s.submitNote}>
                You&apos;ll be redirected to WhatsApp with your order details pre-filled 📲
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success toast */}
      {success && (
        <div className={s.toast} role="alert" aria-live="polite">
          <span style={{ fontSize: "24px" }}>🎉</span>
          <div>
            <p className={s.toastTitle}>Order Sent Successfully!</p>
            <p className={s.toastSub}>We&apos;ll confirm on WhatsApp shortly</p>
          </div>
        </div>
      )}
    </section>
  );
}
