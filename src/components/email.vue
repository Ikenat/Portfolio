<script setup>
import { ref } from '@vue/reactivity';
import { useSizeStore } from '../stores/size';
import axios from 'axios'
import Title from './Title.vue';
import ScrollIcon from './icons/scrollIcon.vue'
import sendEmail from '../functions/ses-send-email.js'

const SizeStore = useSizeStore();

let isEmailValide = ref(false);
const name = ref("");
const email = ref("");
const entreprise = ref("");
const message = ref("");

const send = (e) => {
    e.preventDefault();
    if (ValidateEmail()) {
      sendEmail(name.value, email.value, entreprise.value, message.value);
    }
    
    
}

const ValidateEmail = (e) => {
  let regex = /^[\w\-.]+@([\w-]+\.)+[\w-]{2,4}$/
  if (!regex.test(email.value)) {
        isEmailValide.value = false
        return false
  }
  isEmailValide.value = true;
  return true
}

</script>

<template>
    <section id="contact">
      <div class="Model-contact" v-if="SizeStore.isDesktop">
          <img src="../assets/img/thorus.png" alt="thorus">
          <a href="#footer" class="scrollMore toContact">
            <ScrollIcon color="#33272A" />
            Pour mes informations de contact
          </a>
      </div>
      <div class="contact-content">
        <Title title="Contact" />
        <div class="contact-content-wrapper">
          <span>start a conversation</span>
          <form action="">
            <p class="name">
              <label hidden for="name">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                v-model="name"
                placeholder="name"
                required
              >
            </p>
            <p class="email">
              <label hidden for="email">Email</label>
              <input
                id="Email"
                type="text"
                name="email"
                v-model="email"
                placeholder="email"
                @blur="ValidateEmail"
                required
              >
            </p>
            <p>
              <label hidden for="entreprise">Entreprise</label>
              <input
                id="Entreprise"
                type="text"
                name="entreprise"
                v-model="entreprise"
                placeholder="entreprise"
                required
              >
            </p>
            <p>
              <label hidden for="message">Message</label>
              <textarea
                id="Message"
                type="text"
                name="message"
                v-model="message"
                placeholder="message"
                required
              ></textarea>
            </p>
            <p class="submit">
              <button type="submit" @click="send">
                  Submit
              </button>
            </p>
          </form>
        </div>
      </div>  
    </section>
</template>