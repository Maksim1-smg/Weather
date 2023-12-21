<template>
  <div>
    <h1>Узнать погоду в городе:</h1>
    <form @submit.prevent="search">
      <input type="text" v-model="$store.state.city" placeholder="Введите город" />
      <button class="search">Найти</button>
    </form>
    <div v-if="info" class="card">
      <div class="card-main">
        <h3> {{ info.location.name }}</h3>
        <div class="card-main-temp">
          <p>Темспература: {{ info.current.temp_c }} </p><img src="/assets/animation-ready/celsius.svg" alt="celsius">
        </div>
        <div class="card-main-temp">
          <p>Ощущается как: {{ info.current.feelslike_c }} </p> <img src="/assets/animation-ready/celsius.svg" alt="celsius">
        </div>

      </div>
      <div class="card-icon">
        <img :src="iconSwap" alt="icon">
      </div>

    </div>
    <div v-else class="card">
      <h3>Город не найден!</h3>
    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'App',

  data() {
    return {
      info: null,

      icon: '',
    }
  },

  created() {
    this.search();
    this.getLocation();
  },

  computed: {
    url() {
      return `${this.$store.state.wither}${this.$store.state.city}`;
    },


    iconSwap() {
      const icon = this.info.current.condition.text;
      const url = '/assets/animation-ready/';

      const dayIcons = {
        'Patchy rain possible': 'partly-cloudy-day-rain.svg',
        'Sunny': 'clear-day.svg',
        'Cloudy': 'partly-cloudy-day.svg',
        'Partly cloudy': 'partly-cloudy-day.svg'
      };

      const nightIcons = {
        'Clear': 'clear-night.svg',
        'Cloudy': 'partly-cloudy-night.svg',
        'Partly cloudy': 'partly-cloudy-night.svg'
      };

      const otherIcons = {
        'Overcast': 'overcast.svg',
        'Light snow': 'snow.svg',
        'Blowing snow': 'snow.svg',
        'Moderate snow': 'snow.svg',
        'Heavy snow': 'snow.svg',
        'Light rain': 'rain.svg'
      };

      if (this.info.current.is_day === 1) {
        return dayIcons[icon] ? url + dayIcons[icon] : otherIcons[icon] ? url + otherIcons[icon] : this.info.current.condition.icon;
      } else {
        return nightIcons[icon] ? url + nightIcons[icon] : otherIcons[icon] ? url + otherIcons[icon] : this.info.current.condition.icon;
      }
    }

  },

  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
              .then(response => {
                this.$store.state.city = response.data.address.city;
                this.search();
              })
              .catch(error => {
                console.log(error);
              });
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    },

    search() {
      axios.get(this.url)
        .then(response => {
          this.info = response.data
        })
        .catch(error => {
          this.info = null
          console.log(error)
        })
    },
  }
}
</script>

<style scoped lang="scss">
form {
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;

  input {
    width: 300px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
}

.card {
  margin: 30px auto 0;
  justify-content: center;
  display: flex;
  border: 1px solid #b7b7b7;
  box-shadow: #b7b7b7 0 0 5px;
  border-radius: 10px;
  padding: 10px;
  max-width: 400px;

  &-main {
    display: flex;
    flex-direction: column;
    text-align: left;

    &-temp {
      display: flex;
      align-items: center;
      justify-content: space-between;

      img {
        width: 60px;
      }
    }
  }

  &-icon {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 150px;
    }
  }
}

.search {
  border: none;
  color: white;
  background-color: #8ec5ff;
  padding: 10px 14px;
  border-radius: 10px;
}
</style>