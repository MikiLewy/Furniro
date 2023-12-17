export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: number;
          title: string;
          price: number;
          image: string;
          transparentImage: string | null;
          isBestseller: boolean;
          created_at: Date;
        };
      };
      creators: {
        Row: {
          id: number;
          creator_name: string;
          image: string;
          created_at: Date;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
