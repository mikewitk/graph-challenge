export type TagType = {tag: string};

export type TeamType = {team: string};

export type TransactionType = {
  id: number,
  date: number,
  amountInCents: number,
  tags: TagType[],
  teams: TeamType[],
};
