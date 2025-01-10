import { useLocation } from 'react-router-dom';

// Function to get the 'id' from query parameters
function useQueryParam(param) {
  const location = useLocation(); // Get the current location
  const queryParams = new URLSearchParams(location.search); // Parse query parameters
  return queryParams.get(param); // Return the value of the specified parameter
}

export default useQueryParam;