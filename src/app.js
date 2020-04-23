const apiKey = 'ed33e3ceb71d11a88646b4199155dac1';

/**
 * @description An asynchronous function that uses the fetch API to get data from Open Weather API.
 *
 * @example fetchWeatherData('94999');
 *
 * @returns {string} String.
 *
 * @param {string} zipCode - Zip code passed into the function in string format.
 */
const fetchWeatherData = async zipCode => {
  const getQuery = zipCode => `zip=${zipCode}&appid=${apiKey}`;
  const uri = `https://api.openweathermap.org/data/2.5/weather?${getQuery(zipCode)}`;
  const response = await fetch(uri);
  const data = await response.json();
  if (data.cod !== 200) {
    throw data.message;
  }

  const {
    main: { temp },
  } = data;
  return temp;
};

/**
 * @description An asynchronous function that uses the fetch API to get data from the server.
 *
 * @example fetchWeatherData();
 *
 * @returns {object} Object.
 *
 */
const getData = async () => {
  const response = await fetch('/data');
  const data = await response.json();
  return data;
};

/**
 * @description An asynchronous function that uses the fetch API to post data to the server.
 *
 * @example postData({ data: 'data' });
 *
 * @returns {object} Object.
 *
 * @param {object} data - An object containing data to be posted.
 */
const postData = async (data = {}) => {
  const response = await fetch('/post', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify(data),
  });
  return response;
};

/**
 * @description A function that takes fetched data and target selected element on the DOM
 * and uses the data to manipulate the selected elements by changing their textContent.
 *
 * @example upDataUI({ data: 'data' });
 *
 * @param {object} data - An object containing data to be posted.
 */
const upDataUI = data => {
  const entryDataElements = document.querySelectorAll('.entry-data');

  entryDataElements.forEach(element => {
    const { id } = element;
    element.textContent = data[id];
  });
};

/**
 * @description Call back function for handling the submit event.
 *
 * @example formElement.addEventListener('submit', handleSubmit);
 *
 * @param {Event} event - The Event object of the event handler.
 */
const handleSubmit = event => {
  event.preventDefault();

  const zipCode = document.querySelector('#zip').value;
  const content = document.querySelector('#feelings').value;
  const date = new Date();

  fetchWeatherData(zipCode)
    .then(temp => postData({ temp, date, content }))
    .then(() => getData())
    .then(data => upDataUI({ ...data }))
    .catch(error => upDataUI({ temp: error, date, content }));

  event.target.reset();
};

const formElement = document.querySelector('#form');
formElement.addEventListener('submit', handleSubmit);
