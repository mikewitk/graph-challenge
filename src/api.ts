import axios, {AxiosResponse} from 'axios';
import {TagType, TeamType, TransactionType} from './types';
import {fakeTransactions, fakeTags, fakeTeams} from './fakeData/';

const instance = axios.create({
  baseURL: 'https://my.api.mockaroo.com/',
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
};

export const Transaction = {
  getTransactions: (): TransactionType[] => fakeTransactions,
};

export const Tags = {
  getTags: (): TagType[] => fakeTags,
};

export const Teams = {
  getTeams: (): TeamType[] => fakeTeams,
};

// export const Transaction = {
//   getTransactions: (): Promise<TransactionType[]> =>
//     requests.get('transactions.json?key=c7b1dcd0'),
// };

// export const Tags = {
//   getTags: (): Promise<TagType[]> => requests.get('tags.json?key=c7b1dcd0'),
// };

// export const Teams = {
//   getTeams: (): Promise<TeamType[]> => requests.get('teams.json?key=c7b1dcd0'),
// };
