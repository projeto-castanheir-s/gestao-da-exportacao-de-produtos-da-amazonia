export default function Card({ title, children, className = '', actions = null }) {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden ${className}`}>
      {title && (
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">{title}</h3>
          {actions && <div>{actions}</div>}
        </div>
      )}
      <div className="px-4 sm:px-6 py-4 sm:py-6">
        {children}
      </div>
    </div>
  );
}
