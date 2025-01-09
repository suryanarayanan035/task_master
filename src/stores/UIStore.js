import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
  state: () => ({
    theme: 'light',
    showTaskCreationForm: false,
    selectedTask: {
      id: null,
      title: '',
      description: '',
      priority: 2,
      status: 1,
      assignee: { id: null, email: '' },
    },
    tasks: { 'To Do': [], 'In Progress': [], Done: [] },
  }),
  actions: {
    updateUIState(state) {
      Object.assign(this, { ...this, ...state })
    },
    setTasks(tasks) {
      console.log('setTasks', tasks)
      this.tasks = tasks
    },
    setSelectedTask(task) {
      this.selectedTask = task
    },
    setShowTaskCreationForm(show) {
      this.showTaskCreationForm = show
    },
  },
})
