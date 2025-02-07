export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          created_at: string
          end_date: string
          id: string
          location_end: string
          location_start: string
          price: number
          profile_id: string
          start_date: string
          vehicle_id: string
        }
        Insert: {
          created_at?: string
          end_date: string
          id?: string
          location_end: string
          location_start: string
          price: number
          profile_id: string
          start_date: string
          vehicle_id: string
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: string
          location_end?: string
          location_start?: string
          price?: number
          profile_id?: string
          start_date?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_location_end_fkey"
            columns: ["location_end"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_location_start_fkey"
            columns: ["location_start"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      brands: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      colors: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string
          profile_id: string
          vehicle_id: string
        }
        Insert: {
          created_at?: string
          profile_id: string
          vehicle_id: string
        }
        Update: {
          created_at?: string
          profile_id?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      fuels: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      locations: {
        Row: {
          created_at: string
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      vehicle_location: {
        Row: {
          created_at: string
          location_id: string
          vehicle_id: string
        }
        Insert: {
          created_at?: string
          location_id: string
          vehicle_id: string
        }
        Update: {
          created_at?: string
          location_id?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "locations_cars_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "locations_cars_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          firstname: string
          id: string
          img_url: string | null
          lastname: string
        }
        Insert: {
          created_at?: string
          firstname: string
          id: string
          img_url?: string | null
          lastname: string
        }
        Update: {
          created_at?: string
          firstname?: string
          id?: string
          img_url?: string | null
          lastname?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          created_at: string
          profile_id: string
          stars: number
          text: string
          vehicle_id: string
        }
        Insert: {
          created_at?: string
          profile_id: string
          stars: number
          text: string
          vehicle_id: string
        }
        Update: {
          created_at?: string
          profile_id?: string
          stars?: number
          text?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_location: {
        Row: {
          created_at: string
          location_id: string
          vehicle_id: string
        }
        Insert: {
          created_at?: string
          location_id: string
          vehicle_id: string
        }
        Update: {
          created_at?: string
          location_id?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_location_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_location_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: true
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_types: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          availability: boolean
          brand: string
          car_img: string | null
          color: string
          consumption: number
          created_at: string
          electric_vehicle: boolean
          fuel: string
          gear_type: Database["public"]["Enums"]["enum_gear_types"]
          id: string
          luggage: number
          model: string
          price_per_day: number | null
          ps: number
          seats: number
          vehicle_type: string
          year_of_construction: number
        }
        Insert: {
          availability?: boolean
          brand: string
          car_img?: string | null
          color: string
          consumption: number
          created_at?: string
          electric_vehicle: boolean
          fuel: string
          gear_type: Database["public"]["Enums"]["enum_gear_types"]
          id?: string
          luggage: number
          model: string
          price_per_day?: number | null
          ps: number
          seats: number
          vehicle_type: string
          year_of_construction: number
        }
        Update: {
          availability?: boolean
          brand?: string
          car_img?: string | null
          color?: string
          consumption?: number
          created_at?: string
          electric_vehicle?: boolean
          fuel?: string
          gear_type?: Database["public"]["Enums"]["enum_gear_types"]
          id?: string
          luggage?: number
          model?: string
          price_per_day?: number | null
          ps?: number
          seats?: number
          vehicle_type?: string
          year_of_construction?: number
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_brand_fkey"
            columns: ["brand"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicles_color_fkey"
            columns: ["color"]
            isOneToOne: false
            referencedRelation: "colors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicles_fuel_fkey"
            columns: ["fuel"]
            isOneToOne: false
            referencedRelation: "fuels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicles_vehicle_type_fkey"
            columns: ["vehicle_type"]
            isOneToOne: false
            referencedRelation: "vehicle_types"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_end_date_and_update: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      check_start_date_and_update: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      enum_gear_types: "Automatic" | "Manuel"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"]) | { schema: keyof Database }, TableName extends PublicTableNameOrOptions extends { schema: keyof Database } ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] & Database[PublicTableNameOrOptions["schema"]]["Views"]) : never = never> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] & Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
          Row: infer R;
      }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    ? (PublicSchema["Tables"] & PublicSchema["Views"])[PublicTableNameOrOptions] extends {
          Row: infer R;
      }
        ? R
        : never
    : never;

export type TablesInsert<PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database }, TableName extends PublicTableNameOrOptions extends { schema: keyof Database } ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"] : never = never> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Insert: infer I;
      }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
          Insert: infer I;
      }
        ? I
        : never
    : never;

export type TablesUpdate<PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database }, TableName extends PublicTableNameOrOptions extends { schema: keyof Database } ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"] : never = never> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Update: infer U;
      }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
          Update: infer U;
      }
        ? U
        : never
    : never;

export type Enums<PublicEnumNameOrOptions extends keyof PublicSchema["Enums"] | { schema: keyof Database }, EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database } ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"] : never = never> = PublicEnumNameOrOptions extends { schema: keyof Database } ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName] : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"] ? PublicSchema["Enums"][PublicEnumNameOrOptions] : never;

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"] | { schema: keyof Database },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
        : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database } ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName] : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"] ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions] : never;
