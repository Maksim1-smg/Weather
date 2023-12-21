<template>
<div class="dogs-card">
  <h1>Картинки собачек</h1>
  <div class="dogs-image">
    <img v-if="dogsImg" :src="dogsImg" alt="Собачка">
    <video v-else :src="dogsVideo" autoplay> </video>
  </div>

  <button @click="skip">Следующая</button>
</div>
</template>

<script>

import axios from "axios";
export default {
  name: 'DogsView',

  data() {
    return {
      dogsImg: null,
      dogsVideo: null,
    }
  },

  computed: {
    url() {
      return `${this.$store.state.dogs}`;
    },
  },

  created() {
    this.skip();
  },

  methods: {
    isJpgOrMp4(url) {
      return (
          url.endsWith('.png') ||
          url.endsWith('.jpg') ||
          url.endsWith('.JPG') ||
          url.endsWith('.gif') ||
          url.endsWith('.jpeg')
          );
    },

    skip() {
      axios.get(this.url)
          .then(res => {
            let url = res.data.url;
            if (this.isJpgOrMp4(url)) {
              this.dogsImg = res.data.url
              this.dogsVideo = null
            } else {
              this.dogsVideo = res.data.url
              this.dogsImg = null
            }
          })
          .catch(error => {
            this.info = null
            console.log(error)
          })
    }
  }

}
</script>


<style scoped lang="scss">
.dogs {
  &-card {
  margin-inline: auto;
  gap: 10px;

  max-width: 1000px;
  max-height: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  }

  &-image {
    max-width: 700px;
    max-height: 400px;

    img, video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position:center;

      border-radius: 10px;
      box-shadow: 0 0 10px 0 rgba(44, 62, 80, 0.5);
    }
  }
}

button {
  cursor: pointer;
  border: none;
  color: white;
  background-color: #8ec5ff;
  padding: 10px 14px;
  border-radius: 10px;
}
</style>