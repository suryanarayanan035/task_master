import { useUIStore } from '../stores/UIStore'
import { getTasksOfProject } from './backendApi'
export const getCurrentProjectId = () => {
  return localStorage.getItem('currentProjectId')
}

export const refreshTasksList = async () => {
  const UIStore = useUIStore()
  const { tasks, error } = await getTasksOfProject(getCurrentProjectId())
  if (error) {
    console.error(error)
  } else {
    UIStore.setTasks(tasks)
  }
}

export const TASK_STATUSES = {
  'To Do': 0,
  'In Progress': 1,
  Done: 2,
}

export const TASK_PRIORITIES = {
  Low: 0,
  Medium: 1,
  High: 2,
}

export const getKeyValuePairFromValue = (obj, valueToSearch) => {
  return Object.entries(obj).find(([key, value]) => value == valueToSearch)
}
