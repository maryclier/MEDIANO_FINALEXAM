
import { ref, watch } from 'vue'

function loadGoals() {
  try {
    return JSON.parse(localStorage.getItem('personaltrack-goals') || '[]')
  } catch {
    return []
  }
}

const goals = ref(loadGoals())

watch(goals, (value) => {
  localStorage.setItem('personaltrack-goals', JSON.stringify(value))
}, { deep: true })

export function useGoals() {
  function addGoal(goal) {
    goals.value.unshift({
      ...goal,
      id: `${Date.now()}-${Math.random()}`,
      progress: Number(goal.progress) || 0
    })
  }

  function updateGoal(updatedGoal) {
    const index = goals.value.findIndex(goal => goal.id === updatedGoal.id)

    if (index !== -1) {
      goals.value[index] = {
        ...goals.value[index],
        ...updatedGoal,
        progress: Math.min(100, Math.max(0, Number(updatedGoal.progress) || 0))
      }
    }
  }

  function deleteGoal(id) {
    goals.value = goals.value.filter(goal => goal.id !== id)
  }

  return { goals, addGoal, updateGoal, deleteGoal }
}