export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes'] | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export type Database = {
  public: {
    CompositeTypes: {
      [_ in never]: never;
    };
    Enums: {
      app_permission: 'channels.delete' | 'messages.delete';
      app_role: 'admin' | 'moderator';
      user_status: 'OFFLINE' | 'ONLINE';
    };
    Functions: {
      authorize: {
        Args: {
          requested_permission: Database['public']['Enums']['app_permission'];
          user_id: string;
        };
        Returns: boolean;
      };
      custom_access_token_hook: {
        Args: {
          event: Json;
        };
        Returns: Json;
      };
    };
    Tables: {
      channels: {
        Insert: {
          created_by: string;
          id?: number;
          inserted_at?: string;
          slug: string;
        };
        Relationships: [
          {
            columns: ['created_by'];
            foreignKeyName: 'channels_created_by_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'users';
          },
        ];
        Row: {
          created_by: string;
          id: number;
          inserted_at: string;
          slug: string;
        };
        Update: {
          created_by?: string;
          id?: number;
          inserted_at?: string;
          slug?: string;
        };
      };
      messages: {
        Insert: {
          channel_id: number;
          id?: number;
          inserted_at?: string;
          message?: null | string;
          user_id: string;
        };
        Relationships: [
          {
            columns: ['channel_id'];
            foreignKeyName: 'messages_channel_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'channels';
          },
          {
            columns: ['user_id'];
            foreignKeyName: 'messages_user_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'users';
          },
        ];
        Row: {
          channel_id: number;
          id: number;
          inserted_at: string;
          message: null | string;
          user_id: string;
        };
        Update: {
          channel_id?: number;
          id?: number;
          inserted_at?: string;
          message?: null | string;
          user_id?: string;
        };
      };
      role_permissions: {
        Insert: {
          id?: number;
          permission: Database['public']['Enums']['app_permission'];
          role: Database['public']['Enums']['app_role'];
        };
        Relationships: [];
        Row: {
          id: number;
          permission: Database['public']['Enums']['app_permission'];
          role: Database['public']['Enums']['app_role'];
        };
        Update: {
          id?: number;
          permission?: Database['public']['Enums']['app_permission'];
          role?: Database['public']['Enums']['app_role'];
        };
      };
      user_roles: {
        Insert: {
          id?: number;
          role: Database['public']['Enums']['app_role'];
          user_id: string;
        };
        Relationships: [
          {
            columns: ['user_id'];
            foreignKeyName: 'user_roles_user_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'users';
          },
        ];
        Row: {
          id: number;
          role: Database['public']['Enums']['app_role'];
          user_id: string;
        };
        Update: {
          id?: number;
          role?: Database['public']['Enums']['app_role'];
          user_id?: string;
        };
      };
      users: {
        Insert: {
          id: string;
          status?: Database['public']['Enums']['user_status'] | null;
          username?: null | string;
        };
        Relationships: [];
        Row: {
          id: string;
          status: Database['public']['Enums']['user_status'] | null;
          username: null | string;
        };
        Update: {
          id?: string;
          status?: Database['public']['Enums']['user_status'] | null;
          username?: null | string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
  };
};

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;

export type Json = boolean | Json[] | null | number | string | { [key: string]: Json | undefined };

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

type PublicSchema = Database[Extract<keyof Database, 'public'>];
