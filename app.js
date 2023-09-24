const container = document.querySelector('.container');
const search = document.querySelector('.search-btn');
const weatherbox = document.querySelector('.weather-box');
const weatherdetail = document.querySelector('.weather-detail');
const error = document.querySelector('.ERROR404');

search.addEventListener('click', () => {
    const APIKey = 'ae1524aa66eb598fcdfd149aa2b971cc' ;
    const city = document.querySelector('.city').value

    if (city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(Response => Response.json())
    .then(json => {
            if(json.cod === '404' ) {
                container.style.height = '70%';
                weatherbox.style.display = 'none';
                weatherdetail.style.display = 'none';
                error.style.display = 'block';
                error.classList.add('fadeIn');
                return;
            }

            error.style.display = 'none';
            error.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-detail .humidity .text span');
            const wind = document.querySelector('.weather-detail .wind .text span');

            switch (json.weather[0].main) {
                case 'Clear' :
                    image.src = 'img/clear.png';
                    break;
                case 'Rain' :
                    image.src = 'img/rain.png';
                    break;
                case 'Snow' :
                    image.src = 'img/snow.png';
                    break;
                case 'Clouds' :
                    image.src = 'img/cloud.png';
                    break;
                case 'Haze' :
                    image.src = 'img/mist.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherbox.style.display = '' ;
            weatherdetail.style.display = '';
            weatherbox.classList.add('fadeIn');
            weatherdetail.classList.add('fadeIn');
            container.style.height= '90%';

        }
        

        )
}
)