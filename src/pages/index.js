import { useState, useEffect } from 'react';
import { database } from '../firebaseConfig';
import { ref, onValue } from 'firebase/database';

export default function Home() {
  const [flights, setFlights] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const flightRef = ref(database, 'flight');
    onValue(flightRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const flightArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setFlights(flightArray);
      }
    });
  }, []);

  const handleSearchFlights = () => {
    const results = flights.filter(
      (flight) =>
        flight.from.toLowerCase() === from.toLowerCase() &&
        flight.to.toLowerCase() === to.toLowerCase()
    );
    if (results.length > 0) {
      setFilteredFlights(results);
      setError('');
    } else {
      setFilteredFlights([]);
      setError('No flights found.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Flight Search</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="From"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg mb-2"
          />
          <input
            type="text"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          onClick={handleSearchFlights}
          className="w-full py-2 bg-blue-500 text-white rounded-lg"
        >
          Search Flights
        </button>
        {error && (
          <div className="mt-4 p-4 bg-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        {filteredFlights.length > 0 && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Available Flights</h2>
            <ul className="list-disc list-inside">
              {filteredFlights.map((flight) => (
                <li key={flight.id} className="mb-2">
                  {flight.from} to {flight.to} on {flight.date} at {flight.time}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
