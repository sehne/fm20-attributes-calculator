<template>
  <div class="attribute">
    <div class="attribute-label">{{translations.attributes[type][attribute.id]}}</div>
    <input
      class="attribute-input"
      v-bind:value="isFactor ? attribute.factor :attribute.rating"
      v-on:input="updateValue($event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "attribute",
  props: {
    attribute: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    isFactor: {
      type: Boolean,
      default: false
    },
    translations: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // label: this.attribute.label
    };
  },
  mounted() {},
  methods: {
    updateValue: function(newRating) {
      console.log(this.currentLanguage, this.translations);
      this.$emit(this.attribute.id, {
        id: this.attribute.id,
        newRating,
        type: this.type,
        isFactor: this.isFactor
      });
    }
  }
};
</script>

<style lang="scss">
.attribute {
  padding: 2px 20px 0 0;
  display: flex;
  flex-direction: row;

  .attribute-label {
    width: 150px;
    border-bottom: 1px dotted white;
    margin-right: 10px;
  }
  .attribute-input {
    width: 30px;
  }
}
</style>
