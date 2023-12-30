import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getItemFromLocalStorage, setItemToLocalStorage } from '../utils'
import { Todo } from '../TodoHome/types'

const TodoQueryKeys = {
  getAllTodos: 'GET_ALL_TODOS',
}

const TodosLocalStorageKey = 'todos'

const useTodos = () => {
  const queryClient = useQueryClient()
  const getAllTodosQuery = useQuery<Todo[]>({
    queryFn: () =>
      new Promise((resolve, reject) => {
        try {
          const allTodos = getItemFromLocalStorage(TodosLocalStorageKey)
          const allTodosParsed = allTodos ? JSON.parse(allTodos) : []
          resolve(allTodosParsed)
        } catch (e) {
          reject(e)
        }
      }),
    queryKey: [TodoQueryKeys.getAllTodos],
  })

  const addTodoMutation = useMutation({
    mutationFn: (todo: Pick<Todo, 'text' | 'isCompleted'>) =>
      new Promise((resolve, reject) => {
        try {
          const currentTodos =
            (queryClient.getQueryData(TodoQueryKeys.getAllTodos) as Todo[]) ??
            []
          const lastTodoId =
            currentTodos.length > 0
              ? currentTodos[currentTodos.length - 1].id
              : 0
          const newTodo: Todo = {
            ...todo,
            id: lastTodoId + 1,
          }
          const newTodos = [...currentTodos, newTodo]
          setItemToLocalStorage(TodosLocalStorageKey, JSON.stringify(newTodos))
          resolve(undefined)
        } catch (e) {
          reject(e)
        }
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(TodoQueryKeys.getAllTodos)
    },
  })

  const updateTodoMutation = useMutation({
    mutationFn: (todo: Todo) =>
      new Promise((resolve, reject) => {
        try {
          const currentTodos =
            (queryClient.getQueryData(TodoQueryKeys.getAllTodos) as Todo[]) ??
            []
          const updatedTodos = currentTodos.map((currentTodo) => {
            if (currentTodo.id === todo.id) {
              return todo
            }

            return currentTodo
          })

          setItemToLocalStorage(
            TodosLocalStorageKey,
            JSON.stringify(updatedTodos)
          )
          resolve(undefined)
        } catch (e) {
          reject(e)
        }
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(TodoQueryKeys.getAllTodos)
    },
  })

  const deleteTodoMutation = useMutation({
    mutationFn: (id: Todo['id']) =>
      new Promise((resolve, reject) => {
        try {
          const currentTodos =
            (queryClient.getQueryData(TodoQueryKeys.getAllTodos) as Todo[]) ??
            []
          const updatedTodos = currentTodos.filter(
            (currentTodo) => currentTodo.id !== id
          )

          setItemToLocalStorage(
            TodosLocalStorageKey,
            JSON.stringify(updatedTodos)
          )
          resolve(undefined)
        } catch (e) {
          reject(e)
        }
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(TodoQueryKeys.getAllTodos)
    },
  })

  return {
    getAllTodosQuery,
    addTodoMutation,
    updateTodoMutation,
    deleteTodoMutation,
  }
}

export { useTodos }
