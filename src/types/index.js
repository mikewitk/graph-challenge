export type TagType = {tag: string};

export type TeamType = {team: string};

export type TransactionType = {
  id: number,
  date: string,
  amountInCents: number,
  tags: string,
  teams: string,
};
