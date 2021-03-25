<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
          <div class="header">
            <router-link class="header_link" to="/">  Задачи </router-link>
            <router-link class="header_link" to="/note/create">  Заметки </router-link>
          </div>
      </q-toolbar>
    </q-header>
    <q-page-container>

      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
const linksData = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
];

export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,

    }
  }
}
</script>

<style>
  .header {
    display: flex;
    flex-basis: 100%;
    justify-content: center;
    font-size: 32px;
  }

  .header_link {
    margin-left: auto;
    margin-right: auto;
    text-decoration: none;
      -webkit-text-stroke : 1px black;
  }

  .header_link:first-child {
    color : #f5ae4c;
  }
  .header_link:first-child:hover,
  .header_link:last-child:hover {
    border-bottom: 2px solid rgb(255, 255, 255);
  }
  .header_link:last-child {
    color: #d46670;
  }


</style>
