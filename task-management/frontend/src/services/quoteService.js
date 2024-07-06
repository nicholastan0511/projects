import axios from "axios";

const fetchRandomQuote = async () => {
  const response = await axios.get('https://api.quotable.io/quotes/random?maxLength=50') 
  return response.data
}

export default { 
  fetchRandomQuote
}