
import { ref, watch } from 'vue'

function loadLogs() {
  try {
    return JSON.parse(localStorage.getItem('personaltrack-daily-logs') || '[]')
  } catch {
    return []
  }
}

const dailyLogs = ref(loadLogs())

watch(dailyLogs, (value) => {
  localStorage.setItem('personaltrack-daily-logs', JSON.stringify(value))
}, { deep: true })

export function useDailyLogs() {
  function addLog(log) {
    dailyLogs.value.unshift({
      ...log,
      id: `${Date.now()}-${Math.random()}`
    })
  }

  function updateLog(updatedLog) {
    const index = dailyLogs.value.findIndex(log => log.id === updatedLog.id)

    if (index !== -1) {
      dailyLogs.value[index] = { ...updatedLog }
    }
  }

  function deleteLog(id) {
    dailyLogs.value = dailyLogs.value.filter(log => log.id !== id)
  }

  return { dailyLogs, addLog, updateLog, deleteLog }
}