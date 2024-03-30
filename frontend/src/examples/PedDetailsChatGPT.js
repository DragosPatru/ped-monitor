import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
//Step 2: Define the Route for PED Details
//In your App component or wherever you define your routes, add a route for the PED details page. You might use a dynamic segment in the path to indicate which PED's details to show.


import { Routes, Route } from 'react-router-dom';
import PEDDetails from './components/PEDDetails'; // Import your PED details component

function App() {
  return (
    <Routes>
      {/* Other routes */}
      <Route path="/ped-details/:pedId" element={<PEDDetails />} />
    </Routes>
  );
}
//Step 3: Update the action to Navigate to the Details Page
//Assuming your action's route prop is meant to navigate to this page, ensure it includes the dynamic segment (e.g., the PED's ID). This might already be set up based on your original component's design.
//
//Step 4: Create the PEDDetails Component
//This component should fetch the PED details from your backend based on the PED ID obtained from the URL.

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // or use fetch API

function PEDDetails() {
  const { pedId } = useParams();
  const [pedData, setPedData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace `your-backend-endpoint` with the actual backend URL
        const response = await axios.get(`your-backend-endpoint/peds/${pedId}`);
        setPedData(response.data);
      } catch (error) {
        console.error('Failed to fetch PED details:', error);
      }
    };

    fetchData();
  }, [pedId]);

  if (!pedData) return <div>Loading...</div>;

  return (
    <div>
      {/* Render your PED details using `pedData` */}
      <h1>{pedData.name}</h1>
      {/* Add more details here */}
    </div>
  );
}
