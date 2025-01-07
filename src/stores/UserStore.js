import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    currentProject: {
      id: $cookies.get('currentProjectId') || null,
      name: '',
    },
    availableProjects: [],
  }),
  actions: {
    setCurrentProject(project) {
      this.currentProject = project
    },
    setAvailableProjects(projects) {
      this.availableProjects = projects
    },
  },
})
