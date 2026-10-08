
<template>
  <div>
    <div class="page-heading">
      <p class="small-title">YOUR FUTURE STARTS HERE</p>
      <h2>My Goals</h2>
      <p>Turn your plans into achievable goals and track every step forward.</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <span>Total Goals</span>
        <strong>{{ goals.length }}</strong>
        <small>Your personal targets</small>
      </div>
      <div class="stat-card">
        <span>Achieved</span>
        <strong>{{ achieved }}</strong>
        <small>Goals at 100%</small>
      </div>
      <div class="stat-card">
        <span>Average Progress</span>
        <strong>{{ averageProgress }}%</strong>
        <small>Across all goals</small>
      </div>
    </div>

    <div class="two-column">
      <GoalForm
        :editing-goal="editingGoal"
        @save="saveGoal"
        @cancel="editingGoal = null"
      />

      <GoalList
        :goals="goals"
        @edit="editingGoal = { ...$event }"
        @delete="removeGoal"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import GoalForm from '../components/GoalForm.vue'
import GoalList from '../components/GoalList.vue'
import { useGoals } from '../composables/useGoals'

const { goals, addGoal, updateGoal, deleteGoal } = useGoals()
const editingGoal = ref(null)

const achieved = computed(
  () => goals.value.filter(goal => Number(goal.progress) >= 100).length
)

const averageProgress = computed(() => {
  if (!goals.value.length) return 0

  return Math.round(
    goals.value.reduce((sum, goal) => sum + Number(goal.progress || 0), 0)
    / goals.value.length
  )
})

function saveGoal(goal) {
  if (goal.id) updateGoal(goal)
  else addGoal(goal)

  editingGoal.value = null
}

function removeGoal(id) {
  if (confirm('Delete this goal?')) deleteGoal(id)
}
</script>