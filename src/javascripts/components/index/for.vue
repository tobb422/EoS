<template>
  <div>
    <li v-for="(item, index) in items" :key="index">
      {{ index }} - {{ item.message }}
    </li>
    <br/>
    <li v-for="(value, key, index) in object" :key="key">
      {{ index }} - {{ key }} : {{ value }}
    </li>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      items: [
        { message: 'Foo' },
        { message: 'Bar' }
      ],
      object: {
        firstName: 'John',
        lastName: 'Doe',
        age: 30
      },
    };
  }
}
</script>
