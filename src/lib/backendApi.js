import axios from 'axios'
import VueCookies from 'vue-cookies'
const backendApi = axios.create({
  baseURL: 'https://6b6yabd5cf.execute-api.ap-south-1.amazonaws.com/Prod/',
})
const getIdToken = () => {
  const idToken = $cookies.get('idToken')
  if (idToken) {
    return idToken
  } else {
    throw new Error('No ID Token found. Please Login Again')
  }
}
export const getProjectsOfUser = async () => {
  try {
    const response = await backendApi.get('users/projects', {
      headers: { Authorization: getIdToken() },
    })
    return { projects: response.data.projects }
  } catch (error) {
    return { error: error.message }
  }
}

export const getUsersOfProject = async (projectId) => {
  try {
    const response = await backendApi.get(`projects/${projectId}/users`, {
      headers: { Authorization: getIdToken() },
    })
    return { users: response.data.users }
  } catch (error) {
    return { error }
  }
}

export const addUserToProject = async (projectId, email) => {
  try {
    const response = await backendApi.post(
      `users`,
      {
        email,
        project: projectId,
      },
      {
        headers: { Authorization: getIdToken() },
      },
    )
    return { user: response.data.user }
  } catch (error) {
    return { error }
  }
}
export const createProjectApi = async (projectName) => {
  try {
    const response = await backendApi.post(
      'projects',
      {
        projectName,
      },
      {
        headers: { Authorization: getIdToken() },
      },
    )
    return { project: response.data.project }
  } catch (error) {
    return { error }
  }
}

export const getTasksOfProject = async (projectId) => {
  try {
    const response = await backendApi.get(`projects/${projectId}/tasks`, {
      headers: { Authorization: getIdToken() },
    })
    return { tasks: response.data.taskGroups }
  } catch (error) {
    return { error }
  }
}
export const getTaskById = async (taskId) => {
  try {
    const response = await backendApi.get(`/tasks/${taskId}`, {
      headers: { Authorization: getIdToken() },
    })
    return { task: response.data.task }
  } catch (error) {
    return { error }
  }
}

export const createTask = async (title, description, projectId, assignee, priority, status) => {
  try {
    const response = await backendApi.post(
      `tasks`,
      {
        assignee,
        priority,
        status,
        projectId,
        title,
        description,
      },
      {
        headers: { Authorization: getIdToken() },
      },
    )
    return { task: response.data.task }
  } catch (error) {
    return { error }
  }
}

export const updateTaskById = async (taskId, title, description, status, assignee) => {
  try {
    const response = await backendApi.put(
      `tasks/${taskId}`,
      {
        title,
        description,
        status,
        assignee,
      },
      {
        headers: { Authorization: getIdToken() },
      },
    )
    return {}
  } catch (error) {
    return { error }
  }
}
