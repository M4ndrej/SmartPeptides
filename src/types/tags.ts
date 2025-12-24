export type TagsList = Tag[];

export interface Tag {
  id: number;
  name: string;
  slug: string;
  active?: boolean;
  count: number;
}
