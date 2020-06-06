<template>
  <div id="app">
    <div class="header">
      <div class="app-name">FM20 Attributes Calculator</div>
    </div>

    <div class="content">
      <button @click="log()">log</button>
      <button @click="getValue()">get value</button>

      <div class="attributes">
        <div class="attribute-list technical">
          technical
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
          mental
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
          physical
          <div v-for="attributeKey in Object.keys(attributes.physical)" v-bind:key="attributeKey">
            <attribute
              type="physical"
              v-bind:attribute="attributes.physical[attributeKey]"
              v-bind:label="attributes.physical[attributeKey].label"
              @[attributeKey]="updateValue"
            />
          </div>
        </div>
        <div class="attribute-list roles">
          roles
          <div
            v-for="role in getRoles"
            v-bind:key="role.id"
          >{{role.label}}: {{role.rating.toFixed(2)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import roles from "./assets/roles";

export default {
  name: "app",
  data: () => {
    return {
      attributes: {
        technical: {
          finishing: {
            id: "finishing",
            rating: "10",
            label: "Abschluss"
          },
          firstTouch: {
            id: "firstTouch",
            rating: "10",
            label: "Ballannahme"
          },
          marking: {
            id: "marking",
            rating: "10",
            label: "Deckung"
          },
          dribbling: {
            id: "dribbling",
            rating: "10",
            label: "Dribbling"
          },
          corners: {
            id: "corners",
            rating: "10",
            label: "Ecken"
          },
          penaltyTaking: {
            id: "penaltyTaking",
            rating: "10",
            label: "Elfmeter"
          },
          crossing: {
            id: "crossing",
            rating: "10",
            label: "Flanken"
          },
          freeKickTaking: {
            id: "freeKickTaking",
            rating: "10",
            label: "Freistöße"
          },
          heading: {
            id: "heading",
            rating: "10",
            label: "Kopfballtechnik"
          },
          passing: {
            id: "passing",
            rating: "10",
            label: "Passen"
          },
          tackling: {
            id: "tackling",
            rating: "10",
            label: "Tackling"
          },
          technique: {
            id: "technique",
            rating: "10",
            label: "Technik"
          },
          longThrows: {
            id: "longThrows",
            rating: "10",
            label: "Weite Einwürfe"
          },
          longShots: {
            id: "longShots",
            rating: "10",
            label: "Weitschüsse"
          }
        },
        mental: {
          aggression: {
            id: "aggression",
            rating: "10",
            label: "Aggressivität"
          },
          anticipation: {
            id: "anticipation",
            rating: "10",
            label: "Antizipation"
          },
          workRate: {
            id: "workRate",
            rating: "10",
            label: "Einsatzfreude"
          },
          decisions: {
            id: "decisions",
            rating: "10",
            label: "Entscheidungen"
          },
          flair: {
            id: "flair",
            rating: "10",
            label: "Flair"
          },
          leadership: {
            id: "leadership",
            rating: "10",
            label: "Führungsqualitäten"
          },
          concentration: {
            id: "concentration",
            rating: "10",
            label: "Konzentration"
          },
          bravery: {
            id: "bravery",
            rating: "10",
            label: "Mut"
          },
          composure: {
            id: "composure",
            rating: "10",
            label: "Nervenstärke"
          },
          offTheBall: {
            id: "offTheBall",
            rating: "10",
            label: "Ohne Ball"
          },
          positioning: {
            id: "positioning",
            rating: "10",
            label: "Stellungsspiel"
          },
          teamwork: {
            id: "teamwork",
            rating: "10",
            label: "Teamwork"
          },
          vision: {
            id: "vision",
            rating: "10",
            label: "Übersicht"
          },
          determination: {
            id: "determination",
            rating: "10",
            label: "Zielstrebigkeit"
          }
        },
        physical: {
          acceleration: {
            id: "acceleration",
            rating: "10",
            label: "Antritt"
          },
          stamina: {
            id: "stamina",
            rating: "10",
            label: "Ausdauer"
          },
          balance: {
            id: "balance",
            rating: "10",
            label: "Balance"
          },
          agility: {
            id: "agility",
            rating: "10",
            label: "Beweglichkeit"
          },
          naturalFitness: {
            id: "naturalFitness",
            rating: "10",
            label: "Grundfitness"
          },
          strength: {
            id: "strength",
            rating: "10",
            label: "Kraft"
          },
          pace: {
            id: "pace",
            rating: "10",
            label: "Schnelligkeit"
          },
          jumpingHeight: {
            id: "jumpingHeight",
            rating: "10",
            label: "Sprunghöhe"
          }
        }
      }
    };
  },
  computed: {
    getRoles: function() {
      let myRoles = roles.map(r => {
        let count = 0;
        let value = 0;
        for (let key in r.attributes.technical) {
          count += r.attributes.technical[key];
          value +=
            this.attributes.technical[key].rating * r.attributes.technical[key];
        }
        for (let key in r.attributes.mental) {
          count += r.attributes.mental[key];
          value +=
            this.attributes.mental[key].rating * r.attributes.mental[key];
        }
        for (let key in r.attributes.physical) {
          count += r.attributes.physical[key];
          value +=
            this.attributes.physical[key].rating * r.attributes.physical[key];
        }
        return { id: r.id, label: r.label, rating: value / count };
      });
      return myRoles.sort((a, b) => {
        return b.rating - a.rating;
      });
    }
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
