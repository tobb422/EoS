import Vue from 'vue';
import Index from './components/index.vue';
import Main from './components/index/main.vue';

const vm = new Vue({
  el: '#app',
  data: {
    isActive: false,
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ],
    object: {
      firstName: 'John',
      lastName: 'Doe',
      age: 30
    },
    counter: 0,
    message: "test",
    checked: false,
    checkedNames: [],
    picked: '',
    selected: ''
  },
  computed: {
    // 算出 getter 関数
    reversedMessage: function () {
      // `this` は vm インスタンスを指します
      return this.message.split('').reverse().join('');
    }
  },
  methods: {
    add: function() {
      this.counter += 1;
    },
    say: function(msg) {
      alert(msg);
    }
  },
  components: {
    MyComponent: Index,
    MainComponent: Main
  }
})
