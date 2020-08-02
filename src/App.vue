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

        <div class="flex-row">
          <div class="flex-column">
            <div class="tabs attributeTabs">
              <button
                class="tablinks"
                @click="switchAttributesTab('values')"
                v-bind:class="{active : currentAttributesTab == 'values' }"
              >Values</button>
              <button
                class="tablinks"
                @click="switchAttributesTab('formula')"
                v-bind:class="{active : currentAttributesTab == 'formula' }"
              >Formula</button>
            </div>

            <div id="values" v-if="currentAttributesTab === 'values'">
              <div class="flex-row">
                <div class="flex-column technical">
                  <div class="bold">Technical</div>
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
                <div class="flex-column mental">
                  <div class="bold">Mental</div>
                  <div
                    v-for="attributeKey in Object.keys(attributes.mental)"
                    v-bind:key="attributeKey"
                  >
                    <attribute
                      type="mental"
                      v-bind:attribute="attributes.mental[attributeKey]"
                      v-bind:label="attributes.mental[attributeKey].label"
                      @[attributeKey]="updateValue"
                    />
                  </div>
                </div>
                <div class="flex-column physical">
                  <div class="bold">Physical</div>
                  <div
                    v-for="attributeKey in Object.keys(attributes.physical)"
                    v-bind:key="attributeKey"
                  >
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

            <div id="formula" v-if="currentAttributesTab === 'formula'">
              <div class="flex-row">
                <div class="flex-column technical">
                  <div class="bold">Technical</div>
                  <div
                    v-for="attributeKey in Object.keys(factors.technical)"
                    v-bind:key="attributeKey"
                  >
                    <attribute
                      type="technical"
                      v-bind:isFactor="true"
                      v-bind:attribute="factors.technical[attributeKey]"
                      v-bind:label="factors.technical[attributeKey].label"
                      @[attributeKey]="updateValue"
                    />
                  </div>
                </div>
                <div class="flex-column mental">
                  <div class="bold">Mental</div>
                  <div
                    v-for="attributeKey in Object.keys(factors.mental)"
                    v-bind:key="attributeKey"
                  >
                    <attribute
                      type="mental"
                      v-bind:isFactor="true"
                      v-bind:attribute="factors.mental[attributeKey]"
                      v-bind:label="factors.mental[attributeKey].label"
                      @[attributeKey]="updateValue"
                    />
                  </div>
                </div>
                <div class="flex-column physical">
                  <div class="bold">Physical</div>
                  <div
                    v-for="attributeKey in Object.keys(factors.physical)"
                    v-bind:key="attributeKey"
                  >
                    <attribute
                      type="physical"
                      v-bind:isFactor="true"
                      v-bind:attribute="factors.physical[attributeKey]"
                      v-bind:label="factors.physical[attributeKey].label"
                      @[attributeKey]="updateValue"
                    />
                  </div>

                  <div style="margin-top: 60px">
                    <div class="attribute">
                      <div class="attribute-label">Grundattribut</div>
                      <input class="attribute-input" v-model.number="basicAttributeFactor" />
                    </div>

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
              </div>
            </div>
            <div class="add-player flex-row">
              <div class="add-player-label">Name des Spielers</div>
              <input class="add-player-input" v-model="playerName" />
              <button class="add-player-button" @click="addPlayer()">add</button>
            </div>
            <div v-for="player in savedPlayers" v-bind:key="player.name">
              <player
                v-bind:player="player"
                v-bind:getRoles="getRoles"
                @playerSelected="playerSelected"
              />
            </div>
          </div>
          <div class="attribute-list roles">
            <div class="bold">Roles</div>
            <div
              v-for="role in getRoles(attributes)"
              v-bind:key="role.id"
            >{{role.rating.toFixed(2)}} - {{role.label}}</div>
          </div>
        </div>
      </div>

      <div id="multiple" v-if="currentTab === 'multiple'"></div>
    </div>
  </div>
</template>

<script>
import roles from "./assets/roles";
import attributesData from "./attributesData";
import factorsData from "./factorsData";
import _ from "lodash";

export default {
  name: "app",
  data: () => {
    return {
      textToParse: "",
      basicAttributeFactor: 0,
      importantAttributeFactor: 2,
      keyAttributeFactor: 3,
      currentAttributesTab: "values",
      attributes: attributesData,
      factors: factorsData,
      playerName: "",
      savedPlayers: []
    };
  },
  computed: {},
  methods: {
    log() {
      console.log("WORKS?");
      console.log(this.savedPlayers);
    },
    updateValue(obj) {
      console.log("update");
      if (obj.isFactor) {
        this.factors[obj.type][obj.id].factor = obj.newRating;
      } else {
        console.log("correct");
        this.attributes[obj.type][obj.id].rating = obj.newRating;
        this.unselectPlayer();
      }
    },
    updateText(text) {
      this.textToParse = text;
    },
    switchAttributesTab(tab) {
      this.currentAttributesTab = tab;
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
    },
    addPlayer() {
      this.savedPlayers.push({
        name: this.playerName,
        attributes: JSON.parse(JSON.stringify(this.attributes)),
        selected: false
      });
      this.playerName = "";
    },
    playerSelected(attributes) {
      this.attributes = _.cloneDeep(attributes);
      this.unselectPlayer();
    },
    unselectPlayer() {
      for (let i = 0; i <= this.savedPlayers.length; i++) {
        if (this.savedPlayers[i].selected) {
          this.savedPlayers[i].selected = false;
          break;
        }
      }
    },
    getRoles(attributes) {
      let myRoles = roles.map(r => {
        let count = 0;
        let value = 0;
        for (let key in r.attributes.technical) {
          switch (r.attributes.technical[key]) {
            case 0: {
              count +=
                this.basicAttributeFactor * this.factors.technical[key].factor;
              value +=
                attributes.technical[key].rating *
                this.basicAttributeFactor *
                this.factors.technical[key].factor;
              break;
            }
            case 1: {
              count +=
                this.importantAttributeFactor *
                this.factors.technical[key].factor;
              value +=
                attributes.technical[key].rating *
                this.importantAttributeFactor *
                this.factors.technical[key].factor;
              break;
            }
            case 2: {
              count +=
                this.keyAttributeFactor * this.factors.technical[key].factor;
              value +=
                attributes.technical[key].rating *
                this.keyAttributeFactor *
                this.factors.technical[key].factor;
              break;
            }
          }
        }
        for (let key in r.attributes.mental) {
          switch (r.attributes.mental[key]) {
            case 0: {
              count +=
                this.basicAttributeFactor * this.factors.mental[key].factor;
              value +=
                attributes.mental[key].rating *
                this.basicAttributeFactor *
                this.factors.mental[key].factor;
              break;
            }
            case 1: {
              count +=
                this.importantAttributeFactor * this.factors.mental[key].factor;
              value +=
                attributes.mental[key].rating *
                this.importantAttributeFactor *
                this.factors.mental[key].factor;
              break;
            }
            case 2: {
              count +=
                this.keyAttributeFactor * this.factors.mental[key].factor;
              value +=
                attributes.mental[key].rating *
                this.keyAttributeFactor *
                this.factors.mental[key].factor;
              break;
            }
          }
        }
        for (let key in r.attributes.physical) {
          switch (r.attributes.physical[key]) {
            case 0: {
              count +=
                this.basicAttributeFactor * this.factors.physical[key].factor;
              value +=
                attributes.physical[key].rating *
                this.basicAttributeFactor *
                this.factors.physical[key].factor;
              break;
            }
            case 1: {
              count +=
                this.importantAttributeFactor *
                this.factors.physical[key].factor;
              value +=
                attributes.physical[key].rating *
                this.importantAttributeFactor *
                this.factors.physical[key].factor;
              break;
            }
            case 2: {
              count +=
                this.keyAttributeFactor * this.factors.physical[key].factor;
              value +=
                attributes.physical[key].rating *
                this.keyAttributeFactor *
                this.factors.physical[key].factor;
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

  .flex-row {
    display: flex;
    flex-direction: row;
  }

  .flex-column {
    display: flex;
    flex-direction: column;
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

.attributeTabs {
  margin-bottom: 10px;
}

.bold {
  font-weight: bold;
}

.language-select {
  min-width: 60px;
}

.textarea {
  height: 60px;
  width: 100%;
  max-width: 800px;
}

.add-player {
  padding-top: 10px;

  .add-player-label {
    margin-right: 5px;
  }
  .add-player-input {
    margin-right: 5px;
  }
  .add-player-button {
  }
}
</style>
