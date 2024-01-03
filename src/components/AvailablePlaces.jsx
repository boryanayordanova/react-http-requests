import { usestate } from "react";

import { useState, useEffect } from "react";
import Places from './Places.jsx';
import Error from "./Error.jsx";

const places = localStorage.getItem('places');

export default function AvailablePlaces({ onSelectPlace }) {

  const [isFetching, setIsFetching] = useState(false);
  const [AvailablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces(){
      setIsFetching(true);

      try{
        const response = await fetch('http://localhost:3000/placesss');
        const resData = await response.json();
  
        if(!response.ok){
          const error = new Error('Failed to Fetch places');
          throw error;
        }
        setAvailablePlaces(resData.places);

      } catch (error){
        setError(error);
      }
      setIsFetching(false);
    }
    fetchPlaces();
  }, []);

  if(error){
    return <Error title="An error occured!" message={error.message}/>
  }

  return (
    <Places
      title="Available Places"
      places={AvailablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
