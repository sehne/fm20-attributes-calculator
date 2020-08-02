<template>
  <div
    class="player-container"
    v-bind:class="{'player-selected': player.selected}"
    @click="playerSelected()"
  >
    <div class="player-name">{{player.name}}</div>
    <div>{{getBestRating()}}</div>
    <div class="player-roles">
      <div v-for="role in getTopFiveRoles()" v-bind:key="role.id">
        <div class="player-role">
          <span class="bold">{{role.rating.toFixed(2)}}</span>
          - {{role.label}}
        </div>
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
    getTopFiveRoles() {
      return this.getRoles(this.player.attributes).slice(0, 5);
    },
    getBestRating() {
      return this.getRoles(this.player.attributes)
        .shift()
        .rating.toFixed(2);
    },
    playerSelected() {
      this.$emit("playerSelected", this.player.attributes);
      this.player.selected = true;
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
  padding: 2px 0;

  .player-name {
    width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .player-roles {
    font-size: 12px;
    line-height: 12px;
    width: 300px;

    //   display: flex;
    //   flex-direction: "column";

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
