// Zustand не требует Provider на уровне приложения
// Этот файл оставлен для будущих расширений или middleware

interface Props {
  children: React.ReactNode
}

export function StoreProvider({ children }: Props) {
  return <>{children}</>;
}
