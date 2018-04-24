<template>
  <div>
    <p>Original message: "{{ msg }}"</p>
    <p>Computed reversed message: "{{ reversedMessage }}"</p>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      msg: 'Hello',
    };
  },
  computed: {
    reversedMessage: function () {
      // `this` は vm インスタンスを指します
      return this.msg.split('').reverse().join('');
    }
  }
}
</script>