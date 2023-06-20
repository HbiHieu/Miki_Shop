import { atom } from 'recoil';
import persistAtom from 'src/utils/recoilPersist';

export const dataUser = atom({
  key: 'user',
  default: {},
  effects_UNSTABLE: [persistAtom],
});
