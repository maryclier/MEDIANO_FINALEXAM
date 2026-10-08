
<template>
  <section class="list-card">
    <h3>My Journal</h3>
    <p class="muted">{{ logs.length }} journal entry/entries</p>

    <div v-if="logs.length" class="item-list">
      <article v-for="log in logs" :key="log.id" class="list-item">
        <div class="log-heading">
          <h4>{{ log.title }}</h4>
          <span class="badge">{{ log.mood }}</span>
        </div>

        <div class="item-meta">
          <span>{{ log.date }}</span>
        </div>

        <p class="log-content">{{ log.content }}</p>

        <div class="btn-row">
          <button class="btn btn-secondary" @click="$emit('edit', log)">Edit</button>
          <button class="btn btn-danger" @click="$emit('delete', log.id)">Delete</button>
        </div>
      </article>
    </div>

    <div v-else class="empty-state">
      <p>Your journal is waiting for its first entry.</p>
      <p>Record something meaningful about your day.</p>
    </div>
  </section>
</template>

<script setup>
defineProps({
  logs: { type: Array, default: () => [] }
})

defineEmits(['edit', 'delete'])
</script>

<style scoped>
.muted {
  color: #8290a4;
  font-size: 12px;
}

.log-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.log-heading h4 {
  margin: 0;
}

.log-content {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
</style>