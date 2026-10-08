
<template>
  <div>
    <section class="welcome-banner">
      <div>
        <p class="welcome-label">WELCOME TO YOUR WORKSPACE</p>
        <h2>Make today count. ✨</h2>
        <p>Organize your tasks, focus on your goals, and celebrate your progress.</p>
        <RouterLink to="/tasks" class="btn btn-light">+ Create a Task</RouterLink>
      </div>
      <div class="welcome-art">✓</div>
    </section>

    <div class="page-heading dashboard-heading">
      <p class="small-title">YOUR OVERVIEW</p>
      <h2>Dashboard</h2>
      <p>Here's a quick look at your personal progress.</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <span>Total Tasks</span>
        <strong>{{ tasks.length }}</strong>
        <small>{{ completedTasks }} completed</small>
      </div>

      <div class="stat-card">
        <span>Active Goals</span>
        <strong>{{ activeGoals }}</strong>
        <small>{{ completedGoals }} goals achieved</small>
      </div>

      <div class="stat-card">
        <span>Daily Journal</span>
        <strong>{{ dailyLogs.length }}</strong>
        <small>Saved reflections</small>
      </div>
    </div>

    <div class="dashboard-grid">
      <section class="card">
        <div class="section-heading">
          <div>
            <p class="small-title">STAY ON TRACK</p>
            <h3>Recent Tasks</h3>
          </div>
          <RouterLink to="/tasks" class="text-link">View all →</RouterLink>
        </div>

        <div v-if="recentTasks.length" class="item-list">
          <article
            v-for="task in recentTasks"
            :key="task.id"
            class="list-item compact-item"
          >
            <div class="recent-task">
              <span class="task-dot" :class="{ done: task.completed }">
                {{ task.completed ? '✓' : '•' }}
              </span>
              <div>
                <h4 :class="{ completed: task.completed }">{{ task.title }}</h4>
                <div class="item-meta">
                  <span>{{ task.dueDate || 'No due date' }}</span>
                  <span>{{ task.priority }} priority</span>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div v-else class="empty-state">
          No tasks yet. Add your first task to get started.
        </div>
      </section>

      <section class="card">
        <div class="section-heading">
          <div>
            <p class="small-title">KEEP GROWING</p>
            <h3>Goal Progress</h3>
          </div>
          <RouterLink to="/goals" class="text-link">View all →</RouterLink>
        </div>

        <div v-if="recentGoals.length" class="item-list">
          <article v-for="goal in recentGoals" :key="goal.id" class="goal-summary">
            <div class="goal-summary-heading">
              <strong>{{ goal.title }}</strong>
              <span>{{ goal.progress }}%</span>
            </div>
            <div class="progress-track">
              <div
                class="progress-fill"
                :style="{ width: `${goal.progress}%` }"
              ></div>
            </div>
            <small>{{ goal.progress === 100 ? 'Completed!' : 'Keep going!' }}</small>
          </article>
        </div>

        <div v-else class="empty-state">
          You have no goals yet. Set one goal for yourself.
        </div>
      </section>
    </div>

    <section class="quick-actions">
      <h3>Quick Actions</h3>
      <div class="action-grid">
        <RouterLink to="/tasks" class="action-card">
          <span class="action-icon mint">✓</span>
          <strong>Manage Tasks</strong>
          <small>Organize your activities</small>
        </RouterLink>

        <RouterLink to="/goals" class="action-card">
          <span class="action-icon lavender">◎</span>
          <strong>Set a Goal</strong>
          <small>Plan your next achievement</small>
        </RouterLink>

        <RouterLink to="/daily-logs" class="action-card">
          <span class="action-icon peach">▤</span>
          <strong>Write a Log</strong>
          <small>Reflect on your day</small>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTasks } from '../composables/useTasks'
import { useGoals } from '../composables/useGoals'
import { useDailyLogs } from '../composables/useDailyLogs'

const { tasks } = useTasks()
const { goals } = useGoals()
const { dailyLogs } = useDailyLogs()

const completedTasks = computed(
  () => tasks.value.filter(task => task.completed).length
)

const completedGoals = computed(
  () => goals.value.filter(goal => Number(goal.progress) >= 100).length
)

const activeGoals = computed(
  () => goals.value.length - completedGoals.value
)

const recentTasks = computed(() => tasks.value.slice(0, 4))
const recentGoals = computed(() => goals.value.slice(0, 4))
</script>

<style scoped>
.welcome-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 30px;
  margin-bottom: 28px;
  overflow: hidden;
  border-radius: 18px;
  color: white;
  background: linear-gradient(120deg, #17694f, #239b72);
}

.welcome-label {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.4px;
  color: #c8f5e4;
}

.welcome-banner h2 {
  margin: 12px 0;
  font-size: clamp(23px, 3vw, 34px);
}

.welcome-banner p:not(.welcome-label) {
  max-width: 480px;
  font-size: 13px;
  line-height: 1.7;
  color: #e0f8ee;
}

.btn-light {
  margin-top: 8px;
  color: #17694f;
  background: white;
}

.welcome-art {
  width: 105px;
  height: 105px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  border: 1px solid rgb(255 255 255 / 25%);
  border-radius: 28px;
  color: #fff;
  background: rgb(255 255 255 / 12%);
  font-size: 58px;
  font-weight: 800;
  transform: rotate(8deg);
}

.dashboard-heading {
  margin-bottom: 20px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
}

.section-heading h3 {
  margin: 7px 0 0;
}

.text-link {
  color: #168866;
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
}

.text-link:hover {
  text-decoration: underline;
}

.compact-item {
  padding: 12px;
}

.recent-task {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.recent-task h4 {
  margin: 2px 0 0;
}

.completed {
  color: #8290a4;
  text-decoration: line-through;
}

.task-dot {
  width: 25px;
  height: 25px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  border-radius: 8px;
  color: #168866;
  background: #e4f8ef;
}

.task-dot.done {
  color: white;
  background: #168866;
}

.goal-summary {
  padding: 10px 0;
}

.goal-summary-heading {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
  font-size: 12px;
}

.goal-summary-heading span {
  color: #168866;
  font-weight: 800;
}

.goal-summary small {
  display: block;
  margin-top: 7px;
  color: #8290a4;
  font-size: 10px;
}

.quick-actions {
  margin-top: 25px;
}

.quick-actions > h3 {
  font-size: 16px;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 15px;
}

.action-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 9px;
  padding: 19px;
  border: 1px solid #e7ecf3;
  border-radius: 14px;
  background: white;
  text-decoration: none;
  transition: 0.2s;
}

.action-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgb(31 45 70 / 7%);
}

.action-icon {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 11px;
  font-size: 21px;
}

.mint {
  color: #168866;
  background: #e1f8ee;
}

.lavender {
  color: #6654b9;
  background: #eee9ff;
}

.peach {
  color: #b96b3e;
  background: #fff0e5;
}

.action-card strong {
  font-size: 12px;
}

.action-card small {
  color: #8290a4;
  font-size: 11px;
}

@media (max-width: 900px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 550px) {
  .welcome-banner {
    padding: 22px;
  }

  .welcome-art {
    display: none;
  }

  .action-grid {
    grid-template-columns: 1fr;
  }
}
</style>