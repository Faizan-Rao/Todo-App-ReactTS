import { Container, Heading, FormControl, Textarea, Input, Button, Card, CardBody, CardHeader, Text, SimpleGrid, Box } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // Type Definitions
  type TODO = {
    title: string;
    description: string;
  }

  type FormField = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

  // Dynamic Variables
  const [todo, setTodo] = useState<TODO>({
    title: "",
    description: ""
  })

  const [todos, setTodos] = useState<TODO[]>([])

  useEffect(() => {
    FetchTodos()
  }, [])

  //
  const FetchTodos = () => {
    const data = JSON.parse(window.localStorage.getItem('Todos') || "")
    if (typeof data === 'string')
      setTodos([])
    else
      setTodos(data)
  }
  // Handle Changes in Fields
  const handleChange = (e: FormField) => setTodo({ ...todo, [e.target.name]: e.target.value })

  // Handle Submits
  const handleSubmit = () => {
    todos?.push(todo)
    window.localStorage.setItem('Todos', JSON.stringify(todos))
    FetchTodos()
  }

  // Handle Delete
  const handleDelete = (index: string) => {
    const data = todos.filter((e) => todos[parseInt(index)] !== e);
    window.localStorage.setItem('Todos', JSON.stringify(data))
    FetchTodos()
  }

  return (
    <>
      <Container maxW={'container.xl'} maxH={'container.xl'}>
        {/* main header  */}
        <nav>
          <Heading as={'h2'} size={'xl'} className='logo' fontWeight={'semibold'}>Todo-App</Heading>
        </nav>

        {/* main body  */}
        <main>
          <FormControl my={'4'}>
            <Input type='text' name='title' placeholder='Enter Title' onChange={handleChange} />
            <Textarea my={5} name='description' placeholder='Enter Description' onChange={handleChange} />
            <Box display="flex" alignItems="center" justifyContent="flex-end">
              <Button colorScheme='teal' size='md' onClick={handleSubmit}>
                Add Todo
              </Button>
            </Box>
          </FormControl>
          <Heading as={'h5'} size={'lg'} className='heading' fontWeight={'semibold'}>Your Todos</Heading>
          <SimpleGrid columns={[1, null, 2]} spacingX='40px' spacingY='20px'>
            {
              todos.map((e, num) => {
                return (

                  <Card my={4} key={num}>
                    <CardHeader>
                      <Box display="flex" alignItems="center" justifyContent="space-between">

                        <Heading size='md'>{e.title}</Heading>
                        <Button colorScheme='red' size='md' id={`${num}`} onClick={(e) => handleDelete(e.currentTarget.id)}>
                          X
                        </Button>

                      </Box>
                    </CardHeader>

                    <CardBody>
                      <Text>{e.description}</Text>
                    </CardBody>
                  </Card>
                )
              })
            }
          </SimpleGrid>
        </main>

        {/* main footer */}
        <footer className='footer'>
          <p>Todo-App @ all Right Reserved 2023</p>
        </footer>
      </Container>
    </>
  )
}

export default App
