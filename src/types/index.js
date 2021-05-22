export type TagType = string;

export type TeamType = string;

export type TransactionType = {
  id: number,
  date: number,
  amountInCents: number,
  tags: TagType[],
  teams: TeamType[],
};
