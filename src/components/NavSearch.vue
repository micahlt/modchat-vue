<template>
<div class="wrapper">
  <input @blur="closeAutocomplete" @click="openAutocomplete" @input="updateSuggestions($event)" type="text" name="" value="" placeholder="create or join a room...">
  <div id="autocomplete" :class="{active: autocompleteOpen}">
    <a href="#" target="_self" v-for="s in currentSuggestions" :key="s.label" @click="performAction(s)" :title="genTitle(s)">
      <div class="suggestion">
        {{ s.label }} <span class="lightgray">({{ s.type }})</span>
      </div>
    </a>
  </div>
</div>
</template>

<script>
export default {
  name: 'NavSearch',
  components: {},
  emits: ["roomSearch", "logOut"],
  data() {
    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {this.updateSuggestions({target: {value: ''}})}, 2000);
    });
    return {
      autocompleteOpen: false,
      builtInSuggestions: [{
          "label": "#general",
          "type": "room"
        }, {
          "label": "#design",
          "type": "room"
        }, {
          "label": "#gamedev",
          "type": "room"
        }, {
          "label": "#random",
          "type": "room"
        },
        {
          "label": "log out",
          "type": "action"
        },
        {
          "label": "theme",
          "type": "setting"
        }
      ],
      currentSuggestions: []
    }
  },
  methods: {
    performAction(s) {
      if (s.type == "room") {
        this.$emit("roomSearch", s.label);
      } else if (s.type == "action") {
        if (s.label == "log out") {
          this.$emit("logOut")
        }
      }
    },
    updateSuggestions(e) {
      this.currentSuggestions = this.builtInSuggestions.filter(s => s.label.includes(e.target.value));
      if (e.target.value.length > 0) {
        this.currentSuggestions.unshift({
          "label": `#${event.target.value.replace(/\s+/g, '-')}`,
          "type": "room"
        })
      }
      this.currentSuggestions = [...new Set(this.currentSuggestions)];
    },
    openAutocomplete() {
      this.autocompleteOpen = true;
    },
    closeAutocomplete() {
      this.autocompleteOpen = false;
    },
    genTitle(s) {
      switch (s.type) {
        case "room":
          return `Go to the ${s.label} room`;
        case "action":
          return s.label
        case "setting":
          return `Change the ${s.label} setting`
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  position: relative;
}

#autocomplete {
  font-size: 0.85em;
  top: 2.4em;
  position: absolute;
  border-style: solid;
  border-color: var(--outline);
  border-width: 2px;
  border-radius: 0.4em;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  width: 16.8em;
  height: 0;
  opacity: 0;
  background: var(--bg-secondary);
  box-shadow: var(--shadow);
  transform: translateY(-10px);
  transition: height 0.2s 0.2s, opacity 0.3s 0.2s;
  padding-top: 20px;
  text-align: left;
  padding-left: .2em;
  padding-right: .2em;
  padding-bottom: 10px;
  overflow-y: auto;
}

#autocomplete::-webkit-scrollbar {
  width: 10px;
}

#autocomplete::-webkit-scrollbar-track {
  background: transparent;
}

#autocomplete::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border: solid 3px var(--bg-secondary);
  border-radius: 8px;
}

#autocomplete::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}

.lightgray {
  color: var(--text-secondary)
}

.active {
  height: 8em !important;
  opacity: 1 !important;
  transition: height 0.2s 0.5s, opacity 0.3s 0.5s;
}

.suggestion {
  color: var(--text-primary);
  text-align: left;
  margin: 5px 0;
  padding: 8px;
  overflow-x: hidden;
  text-overflow: ellipsis;
}

a {
  color: white;
  text-decoration: none;
}

.suggestion:hover {
  border-radius: 0.4em;
  background: var(--bg-tertiary);
}

input {
  position: absolute;
  z-index: 1;
  font-family: 'Inter', sans-serif;
  font-size: 0.9em;
  height: 2em;
  width: 11em;
  padding: 0.2em;
  padding-left: 0.7em;
  background-color: var(--bg-secondary);
  border-style: solid;
  border-color: var(--outline);
  border-width: 2px;
  border-radius: 0.4em;
  color: var(--text-primary);
  transition: width 0.4s 0.4s, box-shadow 0.3s, border-color 0.4s,
    background-color 0.4s;
}

input:focus {
  outline: none;
  transition: width 0.2s, box-shadow 0.2s, border-color 0.2s, background-color 0.2s;
  width: 15.4em;
  background-color: var(--bg-tertiary);
  box-shadow: var(--shadow);
  border-bottom-color: var(--accent);
}

input::placeholder {
  color: var(--outline);
  font-size: 0.9em;
  padding-left: 0.5em;
}
</style>
