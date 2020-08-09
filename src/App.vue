<template>
  <div id="app">
    <div class="header">
      <div class="app-name">FM20 Attributes Calculator</div>

      <div class="tabs">
        <button
          class="tablinks"
          @click="switchTab('home')"
          v-bind:class="{active : currentTab == 'home' }"
        >Home</button>
        <button
          class="tablinks"
          @click="switchTab('help')"
          v-bind:class="{active : currentTab == 'help' }"
        >Help</button>
      </div>

      <select v-model="currentLanguage" class="language-select" @change="loadNewLanguage($event)">
        <option value="de">de</option>
        <option value="en">en</option>
      </select>
    </div>

    <div class="content">
      <div id="home" v-if="currentTab === 'home'">
        <textarea
          v-bind:value="textToParse"
          v-on:input="updateText($event.target.value)"
          placeholder="paste Text from Image"
          class="textarea"
        />

        <div class="parse-buttons">
          <button class="pares-button" @click="parseText()">Parse Attributes</button>
          <button class="pares-button" @click="log()">log</button>
          <button class="pares-button" @click="parseText2()">Add Players from .rtf</button>
        </div>
        <div class="flex-row main-content">
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
                    v-for="attributeKey of this.getAttributeKeys('technical')"
                    v-bind:key="attributeKey"
                  >
                    <attribute
                      type="technical"
                      v-bind:attribute="attributes.technical[attributeKey]"
                      v-bind:label="attributes.technical[attributeKey].label"
                      @[attributeKey]="updateValue"
                      v-bind:translations="translations"
                    />
                  </div>
                </div>
                <div class="flex-column mental">
                  <div class="bold">Mental</div>
                  <div
                    v-for="attributeKey of this.getAttributeKeys('mental')"
                    v-bind:key="attributeKey"
                  >
                    <attribute
                      type="mental"
                      v-bind:attribute="attributes.mental[attributeKey]"
                      v-bind:label="attributes.mental[attributeKey].label"
                      @[attributeKey]="updateValue"
                      v-bind:translations="translations"
                    />
                  </div>
                </div>
                <div class="flex-column physical">
                  <div class="bold">Physical</div>
                  <div
                    v-for="attributeKey of this.getAttributeKeys('physical')"
                    v-bind:key="attributeKey"
                  >
                    <attribute
                      type="physical"
                      v-bind:attribute="attributes.physical[attributeKey]"
                      v-bind:label="attributes.physical[attributeKey].label"
                      @[attributeKey]="updateValue"
                      v-bind:translations="translations"
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
                    v-for="attributeKey of this.getAttributeKeys('technical')"
                    v-bind:key="attributeKey"
                  >
                    <attribute
                      type="technical"
                      v-bind:isFactor="true"
                      v-bind:attribute="factors.technical[attributeKey]"
                      v-bind:label="factors.technical[attributeKey].label"
                      v-bind:translations="translations"
                      @[attributeKey]="updateValue"
                    />
                  </div>
                </div>
                <div class="flex-column mental">
                  <div class="bold">Mental</div>
                  <div
                    v-for="attributeKey of this.getAttributeKeys('mental')"
                    v-bind:key="attributeKey"
                  >
                    <attribute
                      type="mental"
                      v-bind:isFactor="true"
                      v-bind:attribute="factors.mental[attributeKey]"
                      v-bind:label="factors.mental[attributeKey].label"
                      v-bind:translations="translations"
                      @[attributeKey]="updateValue"
                    />
                  </div>
                </div>
                <div class="flex-column physical">
                  <div class="bold">Physical</div>
                  <div
                    v-for="attributeKey of this.getAttributeKeys('physical')"
                    v-bind:key="attributeKey"
                  >
                    <attribute
                      type="physical"
                      v-bind:isFactor="true"
                      v-bind:attribute="factors.physical[attributeKey]"
                      v-bind:label="factors.physical[attributeKey].label"
                      v-bind:translations="translations"
                      @[attributeKey]="updateValue"
                    />
                  </div>

                  <div style="padding-top: 50px">
                    <span class="bold">Role Multipliers:</span>
                    <div class="attribute">
                      <div class="attribute-label">Basic Attribute</div>
                      <input class="attribute-input" v-model.number="basicAttributeFactor" />
                    </div>

                    <div class="attribute">
                      <div class="attribute-label">Important Attribute</div>
                      <input class="attribute-input" v-model.number="importantAttributeFactor" />
                    </div>

                    <div class="attribute">
                      <div class="attribute-label">Key Attribute</div>
                      <input class="attribute-input" v-model.number="keyAttributeFactor" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="add-player flex-row">
              <div class="add-player-label">Player Name:</div>
              <input class="add-player-input" v-model="playerName" />
              <button class="add-player-button" @click="addPlayer()">add</button>
              <!-- <button class="add-player-button" @click="exportPlayers()">export</button> -->
              <button class="add-player-button" v-if="selectedPlayer" @click="deletePlayer()">delete</button>
              <button class="add-player-button" v-if="!selectedPlayer" @click="resetValues()">reset</button>
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
        <hr style="width: 100%" />
        <div class="player-list">
          <div class="table-header">
            <div class="table-name">Name</div>
            <div class="table-rating">Rating</div>
            <div class="table-roles">Roles</div>
          </div>

          <div v-for="player in savedPlayers" v-bind:key="player.name">
            <player
              v-bind:player="player"
              v-bind:getRoles="getRoles"
              @playerSelected="playerSelected"
            />
          </div>
        </div>
      </div>

      <div id="help" v-if="currentTab === 'help'"></div>
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
      attributes: _.cloneDeep(attributesData),
      factors: factorsData,
      playerName: "",
      savedPlayers: [],
      selectedPlayer: null
    };
  },
  computed: {},
  methods: {
    log() {
      this.getAttributeKeys("technical");
    },
    updateValue(obj) {
      if (obj.isFactor) {
        this.factors[obj.type][obj.id].factor = obj.newRating;
      } else {
        this.attributes[obj.type][obj.id].rating = obj.newRating;
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
      this.attributes = this.getAttributeList(ratingsArray);
    },
    savePlayer(name, attributes) {
      this.savedPlayers.push({
        name,
        attributes: JSON.parse(JSON.stringify(attributes)),
        selected: false
      });
    },
    parseText2() {
      let arr = this.textToParse.split("|");
      arr = arr.filter(e => !!e.replace(/-|\s/g, ""));
      arr = arr.map(e => e.trim());
      for (let i = 0; i < arr.length - 36; i += 37) {
        this.savePlayer(
          arr[i],
          this.getAttributeList(arr.slice(i + 1, i + 37))
        );
      }
    },
    getAttributeList(ratingsArray) {
      let attributeList = _.cloneDeep(attributesData);

      const technicalKeys = this.getAttributeKeys("technical");
      const mentalKeys = this.getAttributeKeys("mental");
      const physicalKeys = this.getAttributeKeys("physical");

      for (let i = 0; i < 14; i++) {
        if (ratingsArray[i].includes("-")) {
          const [min, max] = ratingsArray[i].split("-");
          const rating = Math.floor((Number(min) + Number(max)) / 2);
          attributeList.technical[technicalKeys[i]].rating = rating;
        } else {
          attributeList.technical[technicalKeys[i]].rating = ratingsArray[i];
        }
      }

      for (let i = 14; i < 28; i++) {
        if (ratingsArray[i].includes("-")) {
          const [min, max] = ratingsArray[i].split("-");
          const rating = Math.floor((Number(min) + Number(max)) / 2);
          attributeList.mental[mentalKeys[i - 14]].rating = rating;
        } else {
          attributeList.mental[mentalKeys[i - 14]].rating = ratingsArray[i];
        }
      }

      for (let i = 28; i < 36; i++) {
        if (ratingsArray[i].includes("-")) {
          const [min, max] = ratingsArray[i].split("-");
          const rating = Math.floor((Number(min) + Number(max)) / 2);
          attributeList.physical[physicalKeys[i - 28]].rating = rating;
        } else {
          attributeList.physical[physicalKeys[i - 28]].rating = ratingsArray[i];
        }
      }

      return attributeList;
    },
    addPlayer() {
      let name = this.playerName;
      if (!name) name = `Player ${this.savedPlayers.length + 1}`;
      this.savePlayer(name, _.cloneDeep(this.attributes));
      this.playerName = "";
    },
    deletePlayer() {
      let index = this.savedPlayers.indexOf(this.selectedPlayer);
      if (index !== -1) {
        this.savedPlayers.splice(index, 1);
        this.selectedPlayer = null;
        this.playerName = "";
      }
    },
    resetValues() {
      this.attributes = _.cloneDeep(attributesData);
    },
    exportPlayers() {
      // TODO create Text that can be used to import players again
    },
    playerSelected(player) {
      if (player.selected) {
        player.selected = false;
        this.playerName = "";
        this.attributes = _.cloneDeep(this.attributes);
        this.selectedPlayer = null;
      } else {
        this.attributes = player.attributes;
        this.unselectPlayer();
        player.selected = true;
        this.playerName = player.name;
        this.selectedPlayer = player;
      }
    },
    unselectPlayer() {
      for (let i = 0; i < this.savedPlayers.length; i++) {
        if (this.savedPlayers[i].selected) {
          this.savedPlayers[i].selected = false;
          break;
        }
      }
    },
    getAttributeKeys(type) {
      let keysValueParis = Object.entries(
        this.translations.attributes[type]
      ).sort(this.sortByValue);
      let keys = [];
      for (let pair of keysValueParis) {
        keys.push(pair[0]);
      }
      return keys;
    },
    sortByValue(x, y) {
      return x[1].localeCompare(y[1]);
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
  max-width: 1080px;

  #home,
  #help {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .main-content {
    height: 455px;
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

.parse-buttons {
  padding: 10px;
  .pares-button {
    margin-right: 10px;
  }
}

.add-player {
  padding-top: 20px;

  .add-player-label {
    margin-right: 5px;
  }
  .add-player-input {
  }
  .add-player-button {
    margin: 0px 5px;
  }
}

.roles {
  overflow-y: scroll;
}

.player-list {
  padding: 10px 0;
  align-self: stretch;
}

.table-header {
  flex-direction: row;
  display: flex;
  flex: 1;
  font-weight: bold;
  padding-bottom: 4px;

  .table-name {
    flex: 3;
  }
  .table-rating {
    flex: 2;
  }
  .table-roles {
    flex: 5;
  }
}
</style>
