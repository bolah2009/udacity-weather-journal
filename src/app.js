const apiKey = 'ed33e3ceb71d11a88646b4199155dac1';

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

const getData = async () => {
  const response = await fetch('/data');
  const data = await response.json();
  return data;
};

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

const upDataUI = data => {
  const entryDataElements = document.querySelectorAll('.entry-data');

  entryDataElements.forEach(element => {
    const { id } = element;
    element.textContent = data[id];
  });
};

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
