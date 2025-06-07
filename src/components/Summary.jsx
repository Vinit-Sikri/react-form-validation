import { useLocation } from 'react-router-dom';

export default function Summary() {
  const { state } = useLocation();
  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Submitted Data:</h2>
      <ul className="space-y-2">
        {Object.entries(state).map(([key, value]) => (
          key !== 'showPassword' && (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          )
        ))}
      </ul>
    </div>
  );
}
