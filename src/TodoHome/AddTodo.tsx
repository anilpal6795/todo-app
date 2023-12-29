import { Pencil1Icon, PlusIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import { Todo } from './types'
import { useTodos } from '../hooks/useTodos'

const AddTodo = () => {
  const [todo, setTodo] = useState<Pick<Todo, 'text' | 'isCompleted'>>({
    text: '',
  })
  const { addTodoMutation } = useTodos()

  const handleTodoTextChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setTodo((prev) => ({
      ...prev,
      text: e.target.value,
    }))
  }
  const handleTodoSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (!todo.text) {
      return
    }

    addTodoMutation.mutate(todo)

    // reset the input after submitting
    setTodo((prev) => ({
      ...prev,
      text: '',
    }))
  }
  return (
    <Box>
      <form onSubmit={handleTodoSubmit}>
        <Flex gap="3" align="center">
          <TextField.Root style={{ flexGrow: 1 }}>
            <TextField.Slot>
              <Pencil1Icon />
            </TextField.Slot>
            <TextField.Input
              placeholder="Add a todo"
              value={todo.text}
              onChange={handleTodoTextChange}
            />
          </TextField.Root>
          <Button type="submit" variant="solid">
            Add
            <PlusIcon />
          </Button>
        </Flex>
      </form>
    </Box>
  )
}

export { AddTodo }
