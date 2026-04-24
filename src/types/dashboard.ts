export type JsonLike = Record<string, unknown>;

export type LatestUserFormRow = {
  full_name: string | null;
  age: number | null;
  primary_industry: string | null;
  years_experience: number | null;
  career_summary: string | null;
  short_term_goal: string | null;
  target_schools: string[] | null;
  nao_json: JsonLike | null;
  created_at: string;
};
