import { Box, Flex, Heading } from '@radix-ui/themes'
import { AddTodo } from './AddTodo'
import { OpenTodos } from './OpenTodos'
import { CompletedTodos } from './CompletedTodos'

const TodoHome = () => {
  return (
    <>
      <Flex justify="center">
        <Heading as="h1" size="8">
          Todo-App
        </Heading>
      </Flex>
      <Box my="5">
        <AddTodo />
        <OpenTodos />
        <CompletedTodos />
      </Box>
    </>
  )
}

export { TodoHome }
