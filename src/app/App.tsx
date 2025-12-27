import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAuth } from '@/features/auth/lib/useAuth';
import { Header } from '@/widgets/header/ui/Header';
import { Sidebar } from '@/widgets/sidebar/ui/Sidebar';
import { LoginForm } from '@/features/auth/ui/LoginForm';
import { Container } from '@mantine/core';
import { Router } from './Router';

function App() {
  const [opened, { toggle }] = useDisclosure();

  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Container size="sm" style={{ paddingTop: '5rem' }}>
        <LoginForm />
      </Container>
    );
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Header opened={opened} toggle={toggle} />
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Sidebar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Router />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
