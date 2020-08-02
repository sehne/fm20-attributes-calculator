<template>
  <div id="app">
    <div class="header">
      <div class="app-name">FM20 Attributes Calculator</div>

      <div class="tabs">
        <button
          class="tablinks"
          @click="switchTab('single')"
          v-bind:class="{active : currentTab == 'single' }"
        >Single</button>
        <button
          class="tablinks"
          @click="switchTab('multiple')"
          v-bind:class="{active : currentTab == 'multiple' }"
        >Multiple</button>
      </div>

      <select v-model="currentLanguage" class="language-select">
        <option value="de">de</option>
        <option value="en">en</option>
      </select>
    </div>

    <div class="content">
      <div id="single" v-if="currentTab === 'single'">
        <textarea
          v-bind:value="textToParse"
          v-on:input="updateText($event.target.value)"
          placeholder="paste Text from Image"
          class="textarea"
        />

        <button @click="parseText()">Parse</button>
        <button @click="log()">log</button>
        <button @click="getValue()">get value</button>

        <div class="attributes">
          <div class="attribute-list technical">
            Technical
            <div
              v-for="attributeKey in Object.keys(attributes.technical)"
              v-bind:key="attributeKey"
            >
              <attribute
                type="technical"
                v-bind:attribute="attributes.technical[attributeKey]"
                v-bind:label="attributes.technical[attributeKey].label"
                @[attributeKey]="updateValue"
              />
            </div>
          </div>
          <div class="attribute-list mental">
            Mental
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
            Physical
            <div v-for="attributeKey in Object.keys(attributes.physical)" v-bind:key="attributeKey">
              <attribute
                type="physical"
                v-bind:attribute="attributes.physical[attributeKey]"
                v-bind:label="attributes.physical[attributeKey].label"
                @[attributeKey]="updateValue"
              />
            </div>

            <div style="margin-top: 60px">
              <div class="attribute">
                <div class="attribute-label">Wichtiges Attribut</div>
                <input class="attribute-input" v-model.number="importantAttributeFactor" />
              </div>

              <div class="attribute">
                <div class="attribute-label">Schlüsselattribut</div>
                <input class="attribute-input" v-model.number="keyAttributeFactor" />
              </div>
            </div>
          </div>

          <div class="attribute-list roles">
            Roles
            <div
              v-for="role in getRoles"
              v-bind:key="role.id"
            >{{role.label}}: {{role.rating.toFixed(2)}}</div>
          </div>
        </div>
      </div>

      <div id="multiple" v-if="currentTab === 'multiple'"></div>
    </div>
  </div>
</template>

<script>
import roles from "./assets/roles";

export default {
  name: "app",
  data: () => {
    return {
      textToParse: "",
      importantAttributeFactor: 2,
      keyAttributeFactor: 3,
      attributes: {
        technical: {
          finishing: {
            id: "finishing",
            rating: "10",
            label: "Abschluss",
            factor: "1"
          },
          firstTouch: {
            id: "firstTouch",
            rating: "10",
            label: "Ballannahme",
            factor: "1"
          },
          marking: {
            id: "marking",
            rating: "10",
            label: "Deckung",
            factor: "1"
          },
          dribbling: {
            id: "dribbling",
            rating: "10",
            label: "Dribbling",
            factor: "1"
          },
          corners: {
            id: "corners",
            rating: "10",
            label: "Ecken",
            factor: "0"
          },
          penaltyTaking: {
            id: "penaltyTaking",
            rating: "10",
            label: "Elfmeter",
            factor: "0"
          },
          crossing: {
            id: "crossing",
            rating: "10",
            label: "Flanken",
            factor: "1"
          },
          freeKickTaking: {
            id: "freeKickTaking",
            rating: "10",
            label: "Freistöße",
            factor: "0"
          },
          heading: {
            id: "heading",
            rating: "10",
            label: "Kopfballtechnik",
            factor: "1"
          },
          passing: {
            id: "passing",
            rating: "10",
            label: "Passen",
            factor: "1"
          },
          tackling: {
            id: "tackling",
            rating: "10",
            label: "Tackling",
            factor: "1"
          },
          technique: {
            id: "technique",
            rating: "10",
            label: "Technik",
            factor: "1"
          },
          longThrows: {
            id: "longThrows",
            rating: "10",
            label: "Weite Einwürfe",
            factor: "0"
          },
          longShots: {
            id: "longShots",
            rating: "10",
            label: "Weitschüsse",
            factor: "1"
          }
        },
        mental: {
          aggression: {
            id: "aggression",
            rating: "10",
            label: "Aggressivität",
            factor: "1"
          },
          anticipation: {
            id: "anticipation",
            rating: "10",
            label: "Antizipation",
            factor: "1"
          },
          workRate: {
            id: "workRate",
            rating: "10",
            label: "Einsatzfreude",
            factor: "1"
          },
          decisions: {
            id: "decisions",
            rating: "10",
            label: "Entscheidungen",
            factor: "1"
          },
          flair: {
            id: "flair",
            rating: "10",
            label: "Flair",
            factor: "1"
          },
          leadership: {
            id: "leadership",
            rating: "10",
            label: "Führungsqualitäten",
            factor: "0"
          },
          concentration: {
            id: "concentration",
            rating: "10",
            label: "Konzentration",
            factor: "1"
          },
          bravery: {
            id: "bravery",
            rating: "10",
            label: "Mut",
            factor: "1"
          },
          composure: {
            id: "composure",
            rating: "10",
            label: "Nervenstärke",
            factor: "1"
          },
          offTheBall: {
            id: "offTheBall",
            rating: "10",
            label: "Ohne Ball",
            factor: "1"
          },
          positioning: {
            id: "positioning",
            rating: "10",
            label: "Stellungsspiel",
            factor: "1"
          },
          teamwork: {
            id: "teamwork",
            rating: "10",
            label: "Teamwork",
            factor: "1"
          },
          vision: {
            id: "vision",
            rating: "10",
            label: "Übersicht",
            factor: "1"
          },
          determination: {
            id: "determination",
            rating: "10",
            label: "Zielstrebigkeit",
            factor: "0"
          }
        },
        physical: {
          acceleration: {
            id: "acceleration",
            rating: "10",
            label: "Antritt",
            factor: "1"
          },
          stamina: {
            id: "stamina",
            rating: "10",
            label: "Ausdauer",
            factor: "1"
          },
          balance: {
            id: "balance",
            rating: "10",
            label: "Balance",
            factor: "1"
          },
          agility: {
            id: "agility",
            rating: "10",
            label: "Beweglichkeit",
            factor: "1"
          },
          naturalFitness: {
            id: "naturalFitness",
            rating: "10",
            label: "Grundfitness",
            factor: "0"
          },
          strength: {
            id: "strength",
            rating: "10",
            label: "Kraft",
            factor: "1"
          },
          pace: {
            id: "pace",
            rating: "10",
            label: "Schnelligkeit",
            factor: "1"
          },
          jumpingHeight: {
            id: "jumpingHeight",
            rating: "10",
            label: "Sprunghöhe",
            factor: "1"
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
          switch (r.attributes.technical[key]) {
            case 0: {
              break;
            }
            case 1: {
              count += this.importantAttributeFactor;
              value +=
                this.attributes.technical[key].rating *
                this.importantAttributeFactor;
              break;
            }
            case 2: {
              count += this.keyAttributeFactor;
              value +=
                this.attributes.technical[key].rating * this.keyAttributeFactor;
              break;
            }
          }
        }
        for (let key in r.attributes.mental) {
          switch (r.attributes.mental[key]) {
            case 0: {
              break;
            }
            case 1: {
              count += this.importantAttributeFactor;
              value +=
                this.attributes.mental[key].rating *
                this.importantAttributeFactor;
              break;
            }
            case 2: {
              count += this.keyAttributeFactor;
              value +=
                this.attributes.mental[key].rating * this.keyAttributeFactor;
              break;
            }
          }
        }
        for (let key in r.attributes.physical) {
          switch (r.attributes.physical[key]) {
            case 0: {
              break;
            }
            case 1: {
              count += this.importantAttributeFactor;
              value +=
                this.attributes.physical[key].rating *
                this.importantAttributeFactor;
              break;
            }
            case 2: {
              count += this.keyAttributeFactor;
              value +=
                this.attributes.physical[key].rating * this.keyAttributeFactor;
              break;
            }
          }
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
    },
    updateText(text) {
      this.textToParse = text;
    },
    parseText() {
      const ratingsArray = this.textToParse
        .replace(/[^\d\s-]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .split(" ");
      const technicalKeys = Object.keys(this.attributes.technical);
      const mentalKeys = Object.keys(this.attributes.mental);
      const physicalKeys = Object.keys(this.attributes.physical);

      for (let i = 0; i < 14; i++) {
        if (ratingsArray[i].includes("-")) {
          const [min, max] = ratingsArray[i].split("-");
          const rating = Math.floor((Number(min) + Number(max)) / 2);
          this.attributes.technical[technicalKeys[i]].rating = rating;
        } else {
          this.attributes.technical[technicalKeys[i]].rating = ratingsArray[i];
        }
      }

      for (let i = 14; i < 28; i++) {
        if (ratingsArray[i].includes("-")) {
          const [min, max] = ratingsArray[i].split("-");
          const rating = Math.floor((Number(min) + Number(max)) / 2);
          this.attributes.mental[mentalKeys[i - 14]].rating = rating;
        } else {
          this.attributes.mental[mentalKeys[i - 14]].rating = ratingsArray[i];
        }
      }

      for (let i = 28; i < 36; i++) {
        if (ratingsArray[i].includes("-")) {
          const [min, max] = ratingsArray[i].split("-");
          const rating = Math.floor((Number(min) + Number(max)) / 2);
          this.attributes.physical[physicalKeys[i - 28]].rating = rating;
        } else {
          this.attributes.physical[physicalKeys[i - 28]].rating =
            ratingsArray[i];
        }
      }
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

  #single,
  #multiple {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .attributes {
    display: flex;
    flex-direction: row;

    .attribute-list {
      display: flex;
      flex-direction: column;
    }
  }
}

.header {
  overflow: hidden;
  background-color: #200838;
  margin-bottom: 5px;
  display: flex;
  padding-left: 10px;
  height: 50px;
  justify-content: space-between;
}

.app-name {
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: bold;
  @media (max-width: 700px) {
    display: none;
  }
}

/* Style tabs */
.tablinks {
  width: 200px;
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  font-size: 17px;
  color: rgba(255, 255, 255, 0.5);
  border-bottom: 2px solid transparent;
  @media (max-width: 700px) {
    width: initial;
  }
}

/* Change background color of buttons on hover */
.tabs button:hover {
  background-color: rgba(223, 223, 223, 0.2);
}

/* Create an active/current tablink class */
.tablinks.active {
  color: rgba(255, 255, 255, 0.8);
  border-bottom: 2px solid rgba(255, 255, 255, 0.8);
}

.language-select {
  min-width: 60px;
}

.textarea {
  height: 60px;
  width: 100%;
  max-width: 800px;
}
</style>
