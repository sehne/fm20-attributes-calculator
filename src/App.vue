<template>
  <div id="app">
    <div class="header">
      <div class="app-name">FM20 Attributes Calculator</div>
    </div>

    <div class="content">
      <button @click="log()">Parse Stats</button>

      <div class="attributes">
        <div class="attribute-list technical">
          <div v-for="attributeKey in Object.keys(attributes)" v-bind:key="attributeKey">
            <attribute
              v-bind:attribute="attributes[attributeKey]"
              v-bind:label="attributes[attributeKey].label"
              @[attributeKey]="updateValue"
            />
          </div>
        </div>
        <div class="attribute-list mental"></div>
        <div class="attribute-list physical"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data: () => {
    return {
      attributes: {
        finishing: {
          id: "finishing",
          rating: "1",
          label: "Abschluss"
        },
        firstTouch: {
          id: "firstTouch",
          rating: "1",
          label: "Ballannahme"
        },
        marking: {
          id: "marking",
          rating: "1",
          label: "Deckung"
        },
        dribbling: {
          id: "dribbling",
          rating: "1",
          label: "Dribbling"
        },
        corners: {
          id: "corners",
          rating: "1",
          label: "Ecken"
        },
        penaltyTaking: {
          id: "penaltyTaking",
          rating: "1",
          label: "Elfmeter"
        },
        crossing: {
          id: "crossing",
          rating: "1",
          label: "Flanken"
        },
        freeKickTaking: {
          id: "freeKickTaking",
          rating: "1",
          label: "Freistöße"
        },
        heading: {
          id: "heading",
          rating: "1",
          label: "Kopfballtechnik"
        },
        passing: {
          id: "passing",
          rating: "1",
          label: "Passen"
        },
        tackling: {
          id: "tackling",
          rating: "1",
          label: "Tackling"
        },
        technique: {
          id: "technique",
          rating: "1",
          label: "Technik"
        },
        longThrows: {
          id: "longThrows",
          rating: "1",
          label: "Weite Einwürfe"
        },
        longShots: {
          id: "longShots",
          rating: "1",
          label: "Weitschüsse"
        }
      }
    };
  },
  methods: {
    log() {
      console.log("WORKS?");
      console.log(this.attributes);
    },
    updateValue(obj) {
      this.attributes[obj.id].rating = obj.newRating;
    }
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
  color: #ffffffbb;
  background-color: #301050;
  font-family: Helvetica;
}

.content {
  padding: 5px 10px;
  margin: auto;
  max-width: 1600px;
  display: flex;
  flex-direction: column;

  .attributes {
    display: flex;
    flex-direction: row;

    .attribute-list {
      display: flex;
      flex-direction: column;
    }
  }
}

.attribute {
  padding: 5px;
  display: flex;
  flex-direction: row;

  .attribute-label {
    width: 100px;
  }
  .attribute-input {
    width: 100px;
  }
}

.header {
  overflow: hidden;
  background-color: #200838;
  margin-bottom: 5px;
  display: flex;
  padding-left: 10px;
  height: 50px;
  justify-content: center;
}

.app-name {
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: bold;
  text-align: center;
}
</style>
