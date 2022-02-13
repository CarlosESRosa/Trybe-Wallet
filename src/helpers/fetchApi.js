const fetchAPI = async () => {
  try {
    const promise = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await promise.json();
    return data;
  } catch (error) {
    return error;
  }
};

export default fetchAPI;
