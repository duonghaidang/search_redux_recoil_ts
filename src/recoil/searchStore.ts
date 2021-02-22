import {atom, selectorFamily} from 'recoil';
import API from '../utils/api';
import {asyncStorageEffect} from './asyncStorageEffect';
import {RECOIL_TYPE} from '../utils/recoil_type';

export const searchList = atom({
  key: RECOIL_TYPE.SEARCH_LIST,
  default: [],
  effects_UNSTABLE: [asyncStorageEffect(RECOIL_TYPE.SEARCH_LIST)],
});

export const listQuery = selectorFamily({
  key: RECOIL_TYPE.GET_SEARCH_LIST,
  get: (name: any) => async () => {
    try {
      const response = await API.get(
        `artist?filter={"name" : { "$iLike" : "%25${name}%25" }}&fields=["$all"]`,
      );

      return response?.data?.results?.objects?.rows || [];
    } catch (e) {
      console.log('e', e);
    }
  },
});
