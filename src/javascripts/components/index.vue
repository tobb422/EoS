<template>
  <div>A custom child-component!{{ test }}</div>
</template>

<script>
export default {
  data: function() {
    return {
      test: 'テストだよ'
    };
  }
}
</script>