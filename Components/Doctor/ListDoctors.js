function Stars({ rating }) {
  const full = Math.floor(rating || 0);
  const half = rating - full >= 0.5;
  return (
    <div className="flex items-center gap-0.5 text-amber-500">
      {Array.from({ length: full }).map((_, i) => (
        <span key={i}>★</span>
      ))}
      {half && <span>☆</span>}
      {Array.from({ length: 5 - full - (half ? 1 : 0) }).map((_, i) => (
        <span key={`e-${i}`} className="text-gray-300">
          ★
        </span>
      ))}
    </div>
  );
}

export default function ListDoctors({ doctor, onSelect }) {
  return (
    <div
      onClick={() => onSelect(doctor)}
      className="cursor-pointer group rounded-2xl border border-amber-300/70 bg-white p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center gap-4">
        <div className="size-24 rounded-xl bg-amber-50 flex items-center justify-center text-3xl">
          {"🐾" || <img src={doctor.image} className="h-full w-full object-cover" alt="" />}
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-gray-900">
            {doctor.name}
          </h3>
          <p className="text-sm text-gray-600">{doctor.qualification}</p>
          <p className="text-sm text-gray-500">
            {doctor.experience} year(s) experience
          </p>
          <div className="mt-1 flex items-center gap-2">
            <Stars rating={doctor.premium} />
            {doctor.isAvailable ? (
              <span className="ml-2 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                Available
              </span>
            ) : (
              <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
                Unavailable
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
