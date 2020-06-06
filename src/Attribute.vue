<template>
  <div class="attribute">
    <div class="attribute-label">{{attribute.label}}</div>
    <input v-bind:value="attribute.rating" v-on:input="updateValue($event.target.value)" />
  </div>
</template>

<script>
export default {
  name: "attribute",
  props: {
    attribute: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // label: this.attribute.label
    };
  },
  mounted() {
    // console.log(this.$props);
  },
  methods: {
    updateValue: function(newRating) {
      this.$emit(this.attribute.id, { id: this.attribute.id, newRating });
    }
  }
};
</script>

<style lang="scss">
.attribute {
  padding: 0 5px;
  display: flex;
  flex-direction: row;

  .attribute-label {
    width: 140px;
  }
  .attribute-input {
    width: 100px;
  }
}
</style>
