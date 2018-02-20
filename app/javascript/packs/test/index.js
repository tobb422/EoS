import Vue from 'vue/dist/vue.esm'

Vue.component('list', {
  props: ['item'],
  template: '<li>{{item.name}}</li>'
});

new Vue({
  el: '#hello',
  data: {
    items: [
      { name: 'Ruby' },
      { name: 'Golang' },
    ]
  }
});
