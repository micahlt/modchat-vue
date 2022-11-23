<template>
  <div class="sidebar">
    <div class="sidebar-top">
      <UserStatus
        v-for="user in this.userList"
        :name="user.name"
        :pfp="user.scratch_picture"
        :key="user.name"
        :online="true"
      ></UserStatus>
    </div>
    <div class="sidebar-bottom">
      <p>Statuses from</p>
      <a href="https://ocular.jeffalo.net/dashboard">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 966 329"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xml:space="preserve"
          xmlns:serif="http://www.serif.com/"
          preserveAspectRatio="meet"
          style="
            fill-rule: evenodd;
            clip-rule: evenodd;
            stroke-linejoin: round;
            stroke-miterlimit: 2;
          "
        >
          <g transform="matrix(30.3812,0,0,30.3812,-10971.3,-8736.03)">
            <path
              d="M371.046,291.495C370.598,291.495 370.218,291.657 369.906,291.981C369.594,292.305 369.438,292.747 369.438,293.307C369.438,293.875 369.596,294.323 369.912,294.651C370.228,294.979 370.614,295.143 371.07,295.143C371.478,295.143 371.804,295.033 372.048,294.813C372.292,294.593 372.454,294.343 372.534,294.063L373.758,294.507C373.598,295.027 373.288,295.475 372.828,295.851C372.368,296.227 371.782,296.415 371.07,296.415C370.214,296.415 369.496,296.119 368.916,295.527C368.336,294.935 368.046,294.195 368.046,293.307C368.046,292.411 368.332,291.671 368.904,291.087C369.476,290.503 370.186,290.211 371.034,290.211C371.762,290.211 372.356,290.399 372.816,290.775C373.276,291.151 373.574,291.603 373.71,292.131L372.462,292.587C372.382,292.283 372.228,292.025 372,291.813C371.772,291.601 371.454,291.495 371.046,291.495Z"
              style="fill-rule: nonzero"
            />
            <path
              d="M378.234,295.587C378.098,295.843 377.876,296.043 377.568,296.187C377.26,296.331 376.93,296.403 376.578,296.403C375.898,296.403 375.36,296.183 374.964,295.743C374.568,295.303 374.37,294.747 374.37,294.075L374.37,290.391L375.762,290.391L375.762,293.823C375.762,294.215 375.858,294.535 376.05,294.783C376.242,295.031 376.538,295.155 376.938,295.155C377.33,295.155 377.632,295.035 377.844,294.795C378.056,294.555 378.162,294.239 378.162,293.847L378.162,290.391L379.554,290.391L379.554,295.167C379.554,295.519 379.574,295.875 379.614,296.235L378.282,296.235C378.25,296.059 378.234,295.843 378.234,295.587Z"
              style="fill-rule: nonzero"
            />
            <rect
              x="380.874"
              y="287.547"
              width="1.392"
              height="8.688"
              style="fill-rule: nonzero"
            />
            <path
              d="M383.202,294.651C383.202,294.155 383.364,293.757 383.688,293.457C384.012,293.157 384.438,292.967 384.966,292.887L386.466,292.659C386.754,292.619 386.898,292.479 386.898,292.239C386.898,291.975 386.806,291.761 386.622,291.597C386.438,291.433 386.162,291.351 385.794,291.351C385.442,291.351 385.162,291.449 384.954,291.645C384.746,291.841 384.626,292.095 384.594,292.407L383.322,292.119C383.378,291.591 383.63,291.141 384.078,290.769C384.526,290.397 385.094,290.211 385.782,290.211C386.63,290.211 387.256,290.415 387.66,290.823C388.064,291.231 388.266,291.755 388.266,292.395L388.266,295.299C388.266,295.683 388.29,295.995 388.338,296.235L387.042,296.235C387.002,296.115 386.982,295.867 386.982,295.491C386.598,296.107 385.998,296.415 385.182,296.415C384.59,296.415 384.112,296.241 383.748,295.893C383.384,295.545 383.202,295.131 383.202,294.651ZM385.446,295.323C385.878,295.323 386.228,295.205 386.496,294.969C386.764,294.733 386.898,294.347 386.898,293.811L386.898,293.547L385.374,293.775C384.854,293.863 384.594,294.127 384.594,294.567C384.594,294.775 384.67,294.953 384.822,295.101C384.974,295.249 385.182,295.323 385.446,295.323Z"
              style="fill-rule: nonzero"
            />
            <path
              d="M392.886,290.355L392.886,291.771C392.726,291.747 392.574,291.735 392.43,291.735C391.382,291.735 390.858,292.307 390.858,293.451L390.858,296.235L389.466,296.235L389.466,290.391L390.822,290.391L390.822,291.327C390.958,291.015 391.178,290.769 391.482,290.589C391.786,290.409 392.13,290.319 392.514,290.319C392.642,290.319 392.766,290.331 392.886,290.355Z"
              style="fill-rule: nonzero"
            />
            <g transform="matrix(0.0614105,0,0,0.0614105,351.814,274.962)">
              <path
                d="M253.368,333.1C253.04,332.773 252.585,332.607 252.123,332.649C251.662,332.69 251.243,332.933 250.979,333.314C246.691,339.486 241.259,344.797 234.993,348.958C234.602,349.218 234.349,349.638 234.302,350.105C234.256,350.571 234.421,351.034 234.752,351.365L264.115,380.734C264.725,381.344 265.715,381.344 266.325,380.734L282.558,364.507C282.851,364.214 283.016,363.816 283.016,363.402C283.016,362.987 282.851,362.589 282.558,362.296L253.368,333.1ZM202.374,350.439C230.397,350.439 253.19,327.64 253.19,299.624C253.19,271.607 230.391,248.808 202.374,248.808C174.358,248.808 151.559,271.602 151.559,299.624C151.559,327.646 174.358,350.439 202.374,350.439ZM202.374,268.754C219.399,268.754 233.25,282.605 233.25,299.624C233.25,316.643 219.393,330.494 202.374,330.494C185.356,330.494 171.505,316.643 171.505,299.624C171.505,282.605 185.35,268.754 202.374,268.754Z"
                style="fill-rule: nonzero"
              />
            </g>
          </g>
        </svg>
      </a>
    </div>
  </div>
</template>

<script>
import UserStatus from "./UserStatus.vue"
export default {
  name: "UsersOnline",
  props: {
    room: String,
    usersList: Array
  },
  components: {
    UserStatus,
  },
  data() {
    return {
      userList: []
    }
  },
  mounted() {
    this.update()
    window.setInterval(this.update, 100)
  },
  methods: {
    update() {
        const data = this.usersList
        this.userList = []
          if(data[0]) {
          const set = new Set(data.map((item) => JSON.stringify(item)))
          this.userList = [...set].map((item) => JSON.parse(item))
          this.userList = this.userList.filter((item) => {
            if (item.room == this.room) return true;
            return false;
          })
        }
    }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sidebar {
  background: var(--bg-secondary);
  display: grid;
  grid-template-rows: auto 100px;
  width: 240px;
}

.sidebar-top {
  padding-top: 15px;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  width: 240px;
}

.sidebar-top::-webkit-scrollbar {
  width: 10px;
}

.sidebar-top::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-top::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border: solid 3px var(--bg-primary);
  border-radius: 8px;
}

.sidebar-top::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}

.sidebar-bottom {
  display: block;
  color: var(--text-secondary);
  padding: 1.5em;
  font-size: 0.8em;
  z-index: 1;
  box-shadow: var(--bg-secondary) 0 -15px 10px;
  width: calc(240px - 3em);
}

.user:first-of-type {
  margin-top: 90px;
}

.coming-soon {
  align-self: center;
  color: var(--text-secondary);
}

svg {
  fill: var(--text-secondary);
  height: 25px;
  width: calc(240px - 3em);
  transition: 0.2s fill;
}

a:hover svg {
  fill: var(--text-primary);
  transition: 0.2s fill;
}

@media only screen and (max-width: 700px) {
  .sidebar {
    grid-column: 1 / 3;
    grid-row: 2 / 3;
    width: 100%;
    height: calc(100vh - 70px);
  }

  .sidebar-top {
    width: 100%;
  }
  
  .sidebar-bottom {
    width: calc(100% - 3em);
  }
}
</style>