import { Box, Callout, Flex, IconButton } from '@radix-ui/themes'
import { useTodos } from '../hooks/useTodos'
import { CheckIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import { Todo } from './types'
import { AnimatePresence, motion } from 'framer-motion'

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
        <AnimatePresence>
          {openTodos?.map((todo) => (
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
            </motion.div>
          ))}
        </AnimatePresence>
      </Flex>
    </Box>
  )
}

export { OpenTodos }
