import React from 'react';
import VehicleList from './components/VehicleList';

function App() {
  return (
    <div className="text-center">
      <h1 className="text-2xl text-indigo-400">AutoHub - Vehicle Listings</h1>
      <VehicleList />
    </div>
  );
}

export default App;
