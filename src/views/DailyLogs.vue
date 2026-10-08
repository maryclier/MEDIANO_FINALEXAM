
<template>
  <div>
    <div class="page-heading">
      <p class="small-title">REFLECT AND GROW</p>
      <h2>Daily Logs</h2>
      <p>Keep track of your experiences, activities, and lessons learned.</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <span>Total Entries</span>
        <strong>{{ dailyLogs.length }}</strong>
        <small>Your saved reflections</small>
      </div>
      <div class="stat-card">
        <span>Today's Entries</span>
        <strong>{{ todayCount }}</strong>
        <small>Entries dated today</small>
      </div>
      <div class="stat-card">
        <span>Latest Mood</span>
        <strong class="mood-value">{{ latestMood }}</strong>
        <small>From your newest entry</small>
      </div>
    </div>

    <div class="two-column">
      <DailyLogForm
        :editing-log="editingLog"
        @save="saveLog"
        @cancel="editingLog = null"
      />

      <DailyLogList
        :logs="dailyLogs"
        @edit="editingLog = { ...$event }"
        @delete="removeLog"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import DailyLogForm from '../components/DailyLogForm.vue'
import DailyLogList from '../components/DailyLogList.vue'
import { useDailyLogs } from '../composables/useDailyLogs'

const { dailyLogs, addLog, updateLog, deleteLog } = useDailyLogs()
const editingLog = ref(null)

const today = new Date()
const todayString = new Date(
  today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().slice(0, 10)

const todayCount = computed(
  () => dailyLogs.value.filter(log => log.date === todayString).length
)

const latestMood = computed(
  () => dailyLogs.value[0]?.mood || '—'
)

function saveLog(log) {
  if (log.id) updateLog(log)
  else addLog(log)

  editingLog.value = null
}

function removeLog(id) {
  if (confirm('Delete this journal entry?')) deleteLog(id)
}
</script>

<style scoped>
.mood-value {
  font-size: 21px;
}
</style>