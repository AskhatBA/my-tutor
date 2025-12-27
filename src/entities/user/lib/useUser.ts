import { useUserStore } from '../model/store';

export const useUser = () => {
  const { user, setUser } = useUserStore();

  return {
    user,
    setUser,
  };
};
