import Vue from 'vue';

const componentData = {
  test: 'テストだよ'
}

const Child = {
  template: '<div>{{ myMessage }}A custom child-component!{{ test }}</div>',
  props: ['myMessage'],
  data: function() {
    return componentData;
  }
}

const vm = new Vue({
  el: '#app',
  data: {
    msg: 'Hello',
    isActive: false,
    ok: true,
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
    'my-component': Child
  }
})