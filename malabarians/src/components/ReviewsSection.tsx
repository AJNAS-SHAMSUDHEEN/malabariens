import s from "./ReviewsSection.module.css";

const REVIEWS = [
  { name: "Fathima Noor",     location: "Trivandrum", rating: 5, text: "Absolutely love this! The taste is exactly like the Avil Milk I had at tea shops in Trivandrum. My kids are obsessed with it — we order 10 packs every week.", avatar: "FN", color: "#2d7a18" },
  { name: "Muhammed Rashid",  location: "Kozhikode",  rating: 5, text: "Best quick breakfast on the road. I carry 10 packs when travelling. Ready in 30 seconds and the taste is amazing every single time. Highly recommended!", avatar: "MR", color: "#4a8020" },
  { name: "Sreelakshmi V.",   location: "Thrissur",   rating: 5, text: "Ordered 10 packs on WhatsApp — delivery was super fast. The cardamom flavour is so authentic! No artificial taste at all. Will keep reordering.", avatar: "SV", color: "#c47208" },
  { name: "Anoop K.",         location: "Ernakulam",  rating: 4, text: "Great product for busy mornings. My whole family enjoys it daily. Genuinely natural — you can taste the quality in every sip. Very happy with the purchase.", avatar: "AK", color: "#2d7a18" },
  { name: "Hana Beevi",       location: "Palakkad",   rating: 5, text: "I serve this at my small tea shop. Customers keep coming back specifically for the Avil Milk Mix. Easy to prepare and very cost-effective for my business.", avatar: "HB", color: "#4a8020" },
  { name: "Vineeth S.",       location: "Kollam",     rating: 5, text: "Gifted a pack of 10 to my college friends during a trip. Everyone was surprised by the quality. Incredible value for just ₹50 per pack. A must-try!", avatar: "VS", color: "#c47208" },
];

function StarRow({ n, className }: { n: number; className?: string }) {
  return (
    <div className={s.stars} aria-label={`${n} out of 5 stars`}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} className={`${className || s.star} ${i > n ? s.starEmpty : ""}`} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section id="reviews" className={s.section}>
      <div className="container">
        <header className={s.sectionHead}>
          <p className={s.pill}>Customer Love</p>
          <h2 className={s.h2}>
            Loved Across <span>Kerala</span>
          </h2>
          <div className={s.divider} />

          <div className={s.aggregate}>
            <StarRow n={5} />
            <div className={s.sep} />
            <span className={s.score}>4.9</span>
            <span className={s.count}>· 200+ happy customers</span>
          </div>
        </header>

        <div className={s.grid}>
          {REVIEWS.map(r => (
            <article key={r.name} className={s.card}>
              <span className={s.quoteChar} aria-hidden="true">&ldquo;</span>
              <p className={s.reviewText}>{r.text}</p>
              <div className={s.cardFoot}>
                <div className={s.reviewer}>
                  <div className={s.avatar} style={{ background: r.color }}>
                    {r.avatar}
                  </div>
                  <div>
                    <p className={s.reviewerName}>{r.name}</p>
                    <p className={s.reviewerLoc}>📍 {r.location}</p>
                  </div>
                </div>
                <div className={s.ratingCol}>
                  <div className={s.cardStars} aria-label={`${r.rating} stars`}>
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} className={`${s.cardStar} ${i > r.rating ? s.cardStarE : ""}`} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <span className={s.verified}>✓ Verified</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
