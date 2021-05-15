/* Global Variables */


// Base URL and API Key for OpenWeatherMap API
let baseURL = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = '55489051fc0340323e3a9d1b47dfe5d7';

//Get the date
let d = new Date();
let newDate = d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);


/* Function called by event listener */
function performAction(e) {
  e.preventDefault();
  // get user input values
  const zip = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;

  if (zip !== '' && content !== '') {
    getWeather(baseURL, zip, apiKey)
      .then(function (userData) {
        if (userData.cod == "404" || userData.cod == "400") {
          alert('Sorry, the zipcode and/or the country code is incorret. Please check it and try again, entering as shown in the examples if it is NOT a US zipcode.');
        }
        // add data to POST request
        postData('/add', {
          location: `${userData.name}, ${userData.sys.country}`,
          date: newDate,
          temp: userData.main.temp,
          icon: userData.weather[0].icon,
          description: userData.weather[0].description,
          content
        })
      }).then(function (newData) {
        // call updateUI to update browser content
        updateUI();
      });
  } else {
    alert('Sorry, you have to fill up all fields. Please enter your zipcode and tell us how you are feeling today :D');
  }
}




/* Function to GET Web API Data*/
const getWeather = async (baseURL, zip, apiKey) => {
  // response equals to the result of fetch function
  const res = await fetch(`${baseURL}?zip=${zip}&appid=${apiKey}&units=metric`);
  try {
    // userData equals to the result of fetch function
    const userData = await res.json();
    return userData;
  } catch (error) {
    console.log("error", error);
  }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  try {
    const newData = await req.json();
    return newData;
  } catch (error) {
    console.log(error);
  }
};


// Update UI
const updateUI = async (url = '') => {
  const req = await fetch('/all');
  try {
    const allData = await req.json();
    // scroll down (in the case to be needed)
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    // show topLine and bottomLine on the page
    document.getElementById('topLine').innerHTML = `<div class="line"></div>`;
    document.getElementById('bottomLine').innerHTML = `<div class="line"></div>`;
    // update new entry values
    document.getElementById('location').innerHTML = `${allData.location}`;
    document.getElementById('date').innerHTML = `${allData.date}`;
    document.getElementById('temp').innerHTML = `${allData.temp}°C`;
    document.getElementById('icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${allData.icon}@2x.png">`;
    document.getElementById('description').innerHTML = `${allData.description}`;
    document.getElementById('content').innerHTML = `>> Today I'm feeling ${allData.content}! <<`;
  } catch (error) {
    console.log("error", error);
  }
};

/*Add an event listener to a reset button*/
function resetInput() {
  window.location.reload();
}