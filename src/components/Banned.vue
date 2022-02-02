<template>
  <div class="banned-parent">
    <div class="banned-modal">
      <div class="banned-icon">
        <i data-eva="slash-outline" :data-eva-fill="iconColor" data-eva-height="64" data-eva-width="64"></i>
      </div>
      <h1>Banned</h1>
      <p><br/>You have been banned from Modchat due to breaking the <a href="#">terms of use</a> or <a href="#">Community Guidelines</a>. This account will remain banned until {{ expiry }}.  The moderator provided this reason:<br/></p>
      <div class="banned-reason"><em>{{ reason }}</em></div>
      <p>If you believe you have been banned in error, please <a href="https://scratch.mit.edu/users/-Archon-">-Archon-</a> and we will look into your case.</p>
    </div>  
  </div>
</template>
<script>
import * as eva from 'eva-icons';
export default {
  data() {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    function getNumberWithOrdinal(n) {
      var s = ["th", "st", "nd", "rd"],
          v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }
    const formatAMPM = (date) => {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      let ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes.toString().padStart(2, '0');
      let strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
      return strTime;
    }
    const expirer = JSON.parse(window.localStorage.getItem("user")).expiry;
    const d = new Date(Number(expirer));
    const expiry = months[d.getMonth()] + ' ' + getNumberWithOrdinal(d.getDate()) + ' ' + d.getFullYear() + ', ' + formatAMPM(d) +" (your time zone)";
    return {
      reason: JSON.parse(window.localStorage.getItem("user")).reason,
      expiry: expiry,
      iconColor: getComputedStyle(document.documentElement).getPropertyValue('--bad')
    }
  },
  mounted() {
    eva.replace();
  },
}
</script>
<style scoped>
.banned-parent {
  height: 100vh;
  width: 100%;
  background: var(--bg-primary);
  display: grid;
  align-items: center;
  justify-content: center;
}

.banned-modal {
  position: relative;
  font-size: 0.95em;
  background: var(--bg-secondary);
  box-shadow: var(--shadow);
  color: var(--text-primary);
  display: block;
  width: clamp(5em, 100%, 550px);
  margin: auto;
  padding: 3em;
  padding-top: calc(3em + 32px);
  border-radius: 0.3em;
}

.banned-icon {
  position: absolute;
  top: calc(-32px - 0.5em);
  left: 50%;
  transform: translateX(-50%);
  width: 64px;
  height: 64px;
  margin: auto;
  padding: 11px;
  background: var(--bg-tertiary);
  border-radius: 100%;
  box-shadow: var(--shadow);
}

a {
  color: var(--text-primary);
}

.banned-reason {
  border-radius: 0.3em;
  background: var(--bg-tertiary);
  padding: 1em;
  width: max-content;
  margin: 1em auto;
}
</style>