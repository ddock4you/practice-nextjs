import { atom } from 'recoil';

export const selectedUserIdState = atom<string | null>({
  key: 'selectedUserIdState',
  default: null,
});

export const selectedUserIndexState = atom<number | null>({
  key: 'selectedUserIndexState',
  default: null,
});
