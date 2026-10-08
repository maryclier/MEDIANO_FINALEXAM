
<template>
  <section class="list-card">
    <h3>My Goals</h3>
    <p class="muted">{{ goals.length }} goal(s) created</p>

    <div v-if="goals.length" class="item-list">
      <article v-for="goal in goals" :key="goal.id" class="list-item">
        <div class="goal-heading">
          <h4>{{ goal.title }}</h4>
          <span class="badge">{{ goal.progress }}%</span>
        </div>

        <p v-if="goal.description">{{ goal.description }}</p>

        <div class="progress-track">
          <div class="progress-fill" :style="{ width: `${goal.progress}%` }"></div>
        </div>

        <div class="item-meta">
          <span>{{ goal.progress === 100 ? 'Goal completed!' : 'Keep making progress' }}</span>
          <span v-if="goal.targetDate">Target: {{ goal.targetDate }}</span>
        </div>

        <div class="btn-row">
          <button class="btn btn-secondary" @click="$emit('edit', goal)">Edit</button>
          <button class="btn btn-danger" @click="$emit('delete', goal.id)">Delete</button>
        </div>
      </article>
    </div>

    <div v-else class="empty-state">
      <p>No goals added yet.</p>
      <p>Create a goal to start tracking your progress.</p>
    </div>
  </section>
</template>

<script setup>
defineProps({
  goals: { type: Array, default: () => [] }
})

defineEmits(['edit', 'delete'])
</script>

<style scoped>
.muted {
  color: #8290a4;
  font-size: 12px;
}

.goal-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.goal-heading h4 {
  margin: 0 0 12px;
}
</style>