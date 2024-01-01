import { Box, Callout, Flex, Heading, IconButton } from '@radix-ui/themes'
import { useTodos } from '../hooks/useTodos'
import { Pencil2Icon, ResetIcon, TrashIcon } from '@radix-ui/react-icons'
import { Todo } from './types'
import { AnimatePresence, motion } from 'framer-motion'

const CompletedTodos = () => {
  const { getAllTodosQuery, deleteTodoMutation, updateTodoMutation } =
    useTodos()
  const completedTodos = getAllTodosQuery.data?.filter(
    ({ isCompleted }) => isCompleted
  )

  const handleDeleteTodoClick = (todo: Todo) => {
    deleteTodoMutation.mutate(todo.id)
  }

  const handleRevertTodoClick = (todo: Todo) => {
    updateTodoMutation.mutate({
      ...todo,
      isCompleted: false,
    })
  }

  if (!completedTodos || completedTodos.length <= 0) {
    return null
  }

  return (
    <Box my="5">
      <Flex justify="center" mb="4">
        <Heading as="h2" size="6">
          Completed Todos
        </Heading>
      </Flex>
      <Flex direction="column" gap="2">
        <AnimatePresence>
          {completedTodos?.map((todo) => (
            <motion.div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px',
              }}
              key={todo.id}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <Callout.Root
                size="1"
                variant="soft"
                color="green"
                style={{ flexGrow: 1 }}
              >
                <Callout.Icon>
                  <Pencil2Icon />
                </Callout.Icon>
                <Callout.Text>{todo.text}</Callout.Text>
              </Callout.Root>
              <Flex gap="2">
                <IconButton
                  color="amber"
                  variant="surface"
                  size="3"
                  onClick={() => {
                    handleRevertTodoClick(todo)
                  }}
                >
                  <ResetIcon />
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
            </motion.div>
          ))}
        </AnimatePresence>
      </Flex>
    </Box>
  )
}

export { CompletedTodos }
