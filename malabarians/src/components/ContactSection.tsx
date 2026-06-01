import s from "./ContactFooterFloat.module.css";
import { buildSimpleWhatsAppURL } from "@/lib/whatsapp";

const WaIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function ContactSection() {
  return (
    <section id="contact" className={s.section}>
      <div className="container">
        <header className={s.sectionHead}>
          <p className={s.pill}>Get in Touch</p>
          <h2 className={s.h2}>
            Find <span>Us</span>
          </h2>
          <div className={s.divider} />
        </header>

        <div className={s.layout}>
          {/* Info column */}
          <div className={s.infoCol}>
            <div className={s.infoCard}>
              <div className={s.infoIcon} style={{ background: "var(--clr-green-50)" }}>📍</div>
              <div>
                <p className={s.infoTitle}>Our Address</p>
                <address className={s.infoBody} style={{ fontStyle: "normal" }}>
                  MALABARIANS<br />
                  VGR214, TC88/580, PO Vallakkadavu<br />
                  Trivandrum, Kerala — 695008
                </address>
              </div>
            </div>

            <div className={s.infoCard}>
              <div className={s.infoIcon} style={{ background: "#e8fdf0" }}>💬</div>
              <div>
                <p className={s.infoTitle}>WhatsApp</p>
                <p className={s.infoBody}>
                  <a href="https://wa.me/919946605923" target="_blank" rel="noopener noreferrer">
                    +91 99466 05923
                  </a>
                </p>
                <p className={s.infoMeta}>Mon–Sat, 9am–7pm IST</p>
              </div>
            </div>

            <div className={s.infoCard}>
              <div className={s.infoIcon} style={{ background: "var(--clr-gold-50)" }}>🕐</div>
              <div>
                <p className={s.infoTitle}>Order Timing</p>
                <p className={s.infoBody}>Orders placed before 2pm dispatched same day</p>
                <p className={s.infoMeta}>Delivery within Trivandrum: 1–2 hours</p>
              </div>
            </div>

            <a href={buildSimpleWhatsAppURL()} target="_blank" rel="noopener noreferrer" className={s.orderBtn}>
              <WaIcon size={18} /> Order Now on WhatsApp
            </a>
          </div>

          {/* Map */}
          <div className={s.mapWrap}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.9!2d76.9366!3d8.5241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bea5e5d5d5d5%3A0x1234567890!2sVallakkadavu%2C%20Thiruvananthapuram%2C%20Kerala%20695008!5e0!3m2!1sen!2sin!4v1234567890"
              title="MALABARIANS location in Vallakkadavu, Trivandrum"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
