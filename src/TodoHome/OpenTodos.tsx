import { Box, Callout, Flex, IconButton } from '@radix-ui/themes'
import { useTodos } from '../hooks/useTodos'
import { CheckIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import { Todo } from './types'

const OpenTodos = () => {
  const { getAllTodosQuery, updateTodoMutation, deleteTodoMutation } =
    useTodos()
  const openTodos = getAllTodosQuery.data?.filter(
    ({ isCompleted }) => !isCompleted
  )

  const handleDeleteTodoClick = (todo: Todo) => {
    deleteTodoMutation.mutate(todo.id)
  }

  const handleCompleteTodoClick = (todo: Todo) => {
    updateTodoMutation.mutate({
      ...todo,
      isCompleted: true,
    })
  }

  return (
    <Box my="5">
      <Flex direction="column" gap="2">
        {openTodos?.map((todo, index) => (
          <Flex justify="between" align="center" gap="3" key={index}>
            <Callout.Root size="1" variant="soft" style={{ flexGrow: 1 }}>
              <Callout.Icon>
                <Pencil2Icon />
              </Callout.Icon>
              <Callout.Text>{todo.text}</Callout.Text>
            </Callout.Root>
            <Flex gap="2">
              <IconButton
                color="grass"
                variant="surface"
                size="3"
                onClick={() => {
                  handleCompleteTodoClick(todo)
                }}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                color="red"
                variant="outline"
                size="3"
                onClick={() => {
                  handleDeleteTodoClick(todo)
                }}
              >
                <TrashIcon />
              </IconButton>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Box>
  )
}

export { OpenTodos }
