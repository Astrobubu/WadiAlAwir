export default function StorefrontLoading() {
  return (
    <section
      className="route-loading"
      role="status"
      aria-live="polite"
      aria-label="Loading page / جارٍ تحميل الصفحة"
    >
      <div className="route-loading__progress" aria-hidden="true" />
      <div className="route-loading__content container" aria-hidden="true">
        <div className="route-loading__eyebrow" />
        <div className="route-loading__title" />
        <div className="route-loading__copy" />
        <div className="route-loading__grid">
          {Array.from({ length: 4 }, (_, index) => (
            <div className="route-loading__card" key={index} />
          ))}
        </div>
      </div>
      <span className="sr-only">Loading page… جارٍ تحميل الصفحة…</span>
    </section>
  )
}
