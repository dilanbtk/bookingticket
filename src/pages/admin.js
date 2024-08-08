import { useState, useEffect } from 'react';
import { database } from '../firebaseConfig';
import { ref, set, onValue, push } from 'firebase/database';

export default function Admin() {
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

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

  const handleFlightSelect = (event) => {
    const flightId = event.target.value;
    const flight = flights.find((f) => f.id === flightId);
    if (flight) {
      setSelectedFlight(flightId);
      setFrom(flight.from);
      setTo(flight.to);
      setDate(flight.date);
      setTime(flight.time);
    }
  };

  const handleUpdateFlight = () => {
    const flightRef = ref(database, `flight/${selectedFlight}`);
    set(flightRef, {
      from,
      to,
      date,
      time,
      airplaneId: flights.find((f) => f.id === selectedFlight).airplaneId,
      companyId: flights.find((f) => f.id === selectedFlight).companyId,
    }).then(() => alert('Flight updated successfully!'));
  };

  const handleAddFlight = () => {
    const newFlightRef = ref(database, 'flight');
    const newFlight = {
      from,
      to,
      date,
      time,
      airplaneId: '', // boş bırakın veya gerekli bilgiyi ekleyin
      companyId: ''   // boş bırakın veya gerekli bilgiyi ekleyin
    };
    push(newFlightRef, newFlight).then(() => {
      setFrom('');
      setTo('');
      setDate('');
      setTime('');
      alert('Flight added successfully!');
    });
  };

  return (
    <div className="bg-gray-700 container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Page</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Update Flight</h2>
        <select
          value={selectedFlight}
          onChange={handleFlightSelect}
          className="border p-2 mb-2"
        >
          <option value="">Select a flight</option>
          {flights.map((flight) => (
            <option key={flight.id} value={flight.id}>
              {flight.from} to {flight.to} on {flight.date} at {flight.time}
            </option>
          ))}
        </select>
        {selectedFlight && (
          <div>
            <input
              type="text"
              placeholder="From"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="border p-2 mb-2"
            />
            <input
              type="text"
              placeholder="To"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="border p-2 mb-2"
            />
            <input
              type="date"
              placeholder="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border p-2 mb-2"
            />
            <input
              type="time"
              placeholder="Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="border p-2 mb-2"
            />
            <button onClick={handleUpdateFlight} className="bg-blue-500 text-white p-2">
              Update Flight
            </button>
          </div>
        )}
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Add New Flight</h2>
        <input
          type="text"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border p-2 mb-2"
        />
        <input
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border p-2 mb-2"
        />
        <input
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 mb-2"
        />
        <input
          type="time"
          placeholder="Time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border p-2 mb-2"
        />
        <button onClick={handleAddFlight} className="bg-green-500 text-white p-2">
          Add Flight
        </button>
      </div>
    </div>
  );
}
