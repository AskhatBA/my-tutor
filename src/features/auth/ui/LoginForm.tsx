import { Button, Paper, PasswordInput, Stack, TextInput, Title } from '@mantine/core'
import { useState } from 'react'
import { useAuthStore } from '../model/store'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const setAuth = useAuthStore((state) => state.setAuth)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Здесь должен быть реальный API call
      // const response = await authApi.login({ email, password })
      // setAuth(response.user, response.token)
      
      // Временная заглушка
      setTimeout(() => {
        setAuth(
          { id: '1', email, name: 'Test User', role: 'teacher' as const },
          'mock-token'
        )
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Login failed:', error)
      setLoading(false)
    }
  }

  return (
    <Paper shadow="md" p="xl" radius="md" withBorder>
      <Title order={2} mb="lg" ta="center">
        Вход
      </Title>
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <TextInput
            label="Email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <PasswordInput
            label="Пароль"
            placeholder="Ваш пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" fullWidth loading={loading}>
            Войти
          </Button>
        </Stack>
      </form>
    </Paper>
  )
}
