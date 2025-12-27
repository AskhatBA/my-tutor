import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Group,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  Title,
  Avatar,
  Indicator,
  ActionIcon,
} from '@mantine/core';
import { Send, Search, Phone, Video, MoreVertical } from 'lucide-react';
import styles from './ChatPage.module.css';

type Message = {
  id: string;
  conversationId: string;
  authorId: string; // 'teacher' or student id
  text: string;
  createdAt: number; // epoch ms
  read?: boolean;
};

type Conversation = {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  lastMessageAt: number;
  unreadCount: number;
};

// Mock data and in-memory service (easily replaceable by API later)
const mockStudents = [
  { id: '1', name: 'Александр Попов' },
  { id: '2', name: 'Мария Иванова' },
  { id: '3', name: 'Дмитрий Орлов' },
];

function seedMessages(convId: string, studentId: string): Message[] {
  const now = Date.now();

  return [
    {
      id: `${convId}-m1`,
      conversationId: convId,
      authorId: studentId,
      text: 'Здравствуйте! Когда следующее занятие?',
      createdAt: now - 1000 * 60 * 60,
    },
    {
      id: `${convId}-m2`,
      conversationId: convId,
      authorId: 'teacher',
      text: 'Добрый день! В четверг в 18:00. Подходит?',
      createdAt: now - 1000 * 60 * 55,
    },
  ];
}

const initialConversations: Conversation[] = mockStudents.map((s, idx) => ({
  id: `c${idx + 1}`,
  studentId: s.id,
  studentName: s.name,
  lastMessageAt: Date.now() - (idx + 1) * 1000 * 60,
  unreadCount: idx === 0 ? 2 : 0,
}));

const initialMessages: Record<string, Message[]> = Object.fromEntries(
  initialConversations.map((c) => [c.id, seedMessages(c.id, c.studentId)]),
);

export function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);

  const [messagesByConv, setMessagesByConv] = useState<Record<string, Message[]>>(initialMessages);

  const [selectedId, setSelectedId] = useState<string | null>(conversations[0]?.id ?? null);

  const [query, setQuery] = useState('');

  const selected = useMemo(
    () => conversations.find((c) => c.id === selectedId) || null,
    [conversations, selectedId],
  );

  // When opening a conversation, mark as read
  useEffect(() => {
    if (!selected) return;
    setConversations((prev) => prev.map((c) => (c.id === selected.id ? { ...c, unreadCount: 0 } : c)));
  }, [selected?.id]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return conversations;

    return conversations.filter((c) => c.studentName.toLowerCase().includes(q));
  }, [conversations, query]);

  const handleSend = (text: string) => {
    if (!selected || !text.trim()) return;
    const newMsg: Message = {
      id: `${selected.id}-m${Date.now()}`,
      conversationId: selected.id,
      authorId: 'teacher',
      text: text.trim(),
      createdAt: Date.now(),
      read: true,
    };

    setMessagesByConv((prev) => ({
      ...prev,
      [selected.id]: [...(prev[selected.id] || []), newMsg],
    }));
    setConversations((prev) =>
      prev.map((c) => (c.id === selected.id ? { ...c, lastMessageAt: newMsg.createdAt } : c)),
    );
  };

  return (
    <Box className={styles.container}>
      <Box
        style={{
          width: 340,
          borderRight: '1px solid var(--mantine-color-default-border)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box p={12}>
          <TextInput
            leftSection={<Search size={16} />}
            placeholder="Поиск ученика"
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
        </Box>
        <Divider />
        <ScrollArea style={{ flex: 1 }}>
          <Stack gap={0}>
            {filtered.map((c) => (
              <ConversationItem
                key={c.id}
                active={c.id === selectedId}
                conversation={c}
                onClick={() => setSelectedId(c.id)}
              />
            ))}
            {filtered.length === 0 && (
              <Box p={16}>
                <Text c="dimmed">Ничего не найдено</Text>
              </Box>
            )}
          </Stack>
        </ScrollArea>
      </Box>

      <Box style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {selected ? (
          <ConversationView
            conversation={selected}
            messages={messagesByConv[selected.id] || []}
            onSend={handleSend}
          />
        ) : (
          <EmptyState />
        )}
      </Box>
    </Box>
  );
}

function ConversationItem({
  conversation,
  active,
  onClick,
}: {
  conversation: Conversation;
  active?: boolean;
  onClick?: () => void;
}) {
  const { studentName, unreadCount } = conversation;

  return (
    <Box
      onClick={onClick}
      style={{
        cursor: 'pointer',
        padding: 12,
        background: active ? 'var(--mantine-color-default-hover)' : 'transparent',
      }}
    >
      <Group gap={12}>
        <Indicator disabled={!unreadCount} label={unreadCount} size={18}>
          <Avatar radius="xl">{studentName[0]}</Avatar>
        </Indicator>
        <Box style={{ flex: 1 }}>
          <Text fw={600}>{studentName}</Text>
          <Text size="sm" c="dimmed">
            Последнее сообщение
          </Text>
        </Box>
      </Group>
    </Box>
  );
}

function ConversationView({
  conversation,
  messages,
  onSend,
}: {
  conversation: Conversation;
  messages: Message[];
  onSend: (text: string) => void;
}) {
  return (
    <>
      <Header studentName={conversation.studentName} />
      <Divider />
      <MessageList messages={messages} currentUserId="teacher" />
      <Divider />
      <MessageComposer onSend={onSend} />
    </>
  );
}

function Header({ studentName }: { studentName: string }) {
  return (
    <Box p={12}>
      <Group justify="space-between">
        <Group>
          <Avatar radius="xl">{studentName[0]}</Avatar>
          <Stack gap={2}>
            <Title order={4} style={{ lineHeight: 1 }}>
              {studentName}
            </Title>
            <Text size="sm" c="dimmed">
              в сети
            </Text>
          </Stack>
        </Group>
        <Group>
          <ActionIcon variant="light" aria-label="call">
            <Phone size={18} />
          </ActionIcon>
          <ActionIcon variant="light" aria-label="video">
            <Video size={18} />
          </ActionIcon>
          <ActionIcon variant="subtle" aria-label="more">
            <MoreVertical size={18} />
          </ActionIcon>
        </Group>
      </Group>
    </Box>
  );
}

function MessageList({ messages, currentUserId }: { messages: Message[]; currentUserId: string }) {
  const viewportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scroll to bottom on new message
    const el = viewportRef.current;

    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages.length]);

  return (
    <ScrollArea viewportRef={viewportRef} style={{ flex: 1 }}>
      <Stack p={16}>
        {messages.map((m) => (
          <Bubble key={m.id} mine={m.authorId === currentUserId} text={m.text} time={m.createdAt} />
        ))}
      </Stack>
    </ScrollArea>
  );
}

function Bubble({ mine, text, time }: { mine?: boolean; text: string; time: number }) {
  return (
    <Group justify={mine ? 'flex-end' : 'flex-start'}>
      <Box
        style={{
          maxWidth: 520,
          background: mine ? 'var(--mantine-color-blue-6)' : 'var(--mantine-color-default-hover)',
          color: mine ? 'white' : 'inherit',
          padding: '8px 12px',
          borderRadius: 12,
        }}
      >
        <Text>{text}</Text>
        <Text size="xs" c={mine ? 'var(--mantine-color-blue-1)' : 'dimmed'} style={{ marginTop: 4 }}>
          {new Date(time).toLocaleTimeString()}
        </Text>
      </Box>
    </Group>
  );
}

function MessageComposer({ onSend }: { onSend: (text: string) => void }) {
  const [value, setValue] = useState('');

  const send = () => {
    if (!value.trim()) return;
    onSend(value);
    setValue('');
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <Box p={12}>
      <Group align="stretch">
        <TextInput
          style={{ flex: 1 }}
          placeholder="Напишите сообщение..."
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          onKeyDown={onKeyDown}
        />
        <Button leftSection={<Send size={16} />} onClick={send}>
          Отправить
        </Button>
      </Group>
    </Box>
  );
}

function EmptyState() {
  return (
    <Box style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Stack align="center">
        <Title order={3}>Выберите чат</Title>
        <Text c="dimmed">Список диалогов слева</Text>
      </Stack>
    </Box>
  );
}
