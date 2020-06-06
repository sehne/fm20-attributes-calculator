<template>
  <div id="app">
    <div class="header">
      <div class="app-name">FM20 Attributes Calculator</div>
    </div>

    <div class="content">
      <button @click="log()">Parse Stats</button>

      <div class="attributes">
        <div class="attribute-list technical">
          <div v-for="attributeKey in Object.keys(attributes.technical)" v-bind:key="attributeKey">
            <attribute
              type="technical"
              v-bind:attribute="attributes.technical[attributeKey]"
              v-bind:label="attributes.technical[attributeKey].label"
              @[attributeKey]="updateValue"
            />
          </div>
        </div>
        <div class="attribute-list mental">
          <div v-for="attributeKey in Object.keys(attributes.mental)" v-bind:key="attributeKey">
            <attribute
              type="mental"
              v-bind:attribute="attributes.mental[attributeKey]"
              v-bind:label="attributes.mental[attributeKey].label"
              @[attributeKey]="updateValue"
            />
          </div>
        </div>
        <div class="attribute-list physical">
          <div v-for="attributeKey in Object.keys(attributes.physical)" v-bind:key="attributeKey">
            <attribute
              type="physical"
              v-bind:attribute="attributes.physical[attributeKey]"
              v-bind:label="attributes.physical[attributeKey].label"
              @[attributeKey]="updateValue"
            />
          </div>
        </div>
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
        technical: {
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
        },
        mental: {
          aggression: {
            id: "aggression",
            rating: "1",
            label: "Aggressivität"
          },
          anticipation: {
            id: "anticipation",
            rating: "1",
            label: "Antizipation"
          },
          workRate: {
            id: "workRate",
            rating: "1",
            label: "Einsatzfreude"
          },
          decisions: {
            id: "decisions",
            rating: "1",
            label: "Entscheidungen"
          },
          flair: {
            id: "flair",
            rating: "1",
            label: "Flair"
          },
          leadership: {
            id: "leadership",
            rating: "1",
            label: "Führungsqualitäten"
          },
          concentration: {
            id: "concentration",
            rating: "1",
            label: "Konzentration"
          },
          bravery: {
            id: "bravery",
            rating: "1",
            label: "Mut"
          },
          composure: {
            id: "composure",
            rating: "1",
            label: "Nervenstärke"
          },
          offTheBall: {
            id: "offTheBall",
            rating: "1",
            label: "Ohne Ball"
          },
          positioning: {
            id: "positioning",
            rating: "1",
            label: "Stellungsspiel"
          },
          teamwork: {
            id: "teamwork",
            rating: "1",
            label: "Teamwork"
          },
          vision: {
            id: "vision",
            rating: "1",
            label: "Übersicht"
          },
          determination: {
            id: "determination",
            rating: "1",
            label: "Zielstrebigkeit"
          }
        },
        physical: {
          acceleration: {
            id: "acceleration",
            rating: "1",
            label: "Antritt"
          },
          stamina: {
            id: "stamina",
            rating: "1",
            label: "Ausdauer"
          },
          balance: {
            id: "technique",
            rating: "1",
            label: "Balance"
          },
          agility: {
            id: "agility",
            rating: "1",
            label: "Beweglichkeit"
          },
          naturalFitness: {
            id: "naturalFitness",
            rating: "1",
            label: "Grundfitness"
          },
          strength: {
            id: "strength",
            rating: "1",
            label: "Kraft"
          },
          pace: {
            id: "pace",
            rating: "1",
            label: "Schnelligkeit"
          },
          jumpingHeight: {
            id: "jumpingHeight",
            rating: "1",
            label: "Sprunghöhe"
          }
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
      this.attributes[obj.type][obj.id].rating = obj.newRating;
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
