<template>
  <div
    class="player-container"
    v-bind:class="{'player-selected': player.selected}"
    @click="playerSelected()"
  >
    <div class="player-name">{{player.name}}</div>
    <div class="player-rating">{{getBestRating()}}</div>
    <div class="player-roles">
      <div v-for="role in getTopFourRoles()" v-bind:key="role.id">
        <div class="player-role">{{role.rating.toFixed(2)}} - {{role.label}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "player",
  props: {
    player: {
      type: Object,
      required: true
    },
    getRoles: {
      type: Function,
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
    // console.log(this.$props.getRoles(this.$props.player.attributes));
  },
  methods: {
    getTopFourRoles() {
      return this.getRoles(this.player.attributes).slice(0, 4);
    },
    getBestRating() {
      return this.getRoles(this.player.attributes)
        .shift()
        .rating.toFixed(2);
    },
    playerSelected() {
      this.$emit("playerSelected", this.player);
    }
  }
};
</script>

<style lang="scss">
.player-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0;
  padding: 4px 0 2px;
  border-top: white 1px solid;

  .player-name {
    flex: 3;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .player-rating {
    flex: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .player-roles {
    flex: 5;
    font-size: 14px;
    line-height: 16px;

    .player-role {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

.player-selected {
  background-color: #fff4;
}

.player-container:hover {
  cursor: pointer;
}
</style>
