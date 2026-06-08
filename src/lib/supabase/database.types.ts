export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      agenda_audit_logs: {
        Row: {
          id: string;
          performed_at: string;
          user_name: string;
          user_profile: string;
          action_label: string;
          patient_name: string;
          from_description: string;
          to_description: string;
          appointment_id: string | null;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          performed_at?: string;
          user_name: string;
          user_profile: string;
          action_label: string;
          patient_name: string;
          from_description: string;
          to_description: string;
          appointment_id?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          performed_at?: string;
          user_name?: string;
          user_profile?: string;
          action_label?: string;
          patient_name?: string;
          from_description?: string;
          to_description?: string;
          appointment_id?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type AgendaAuditLogRow =
  Database["public"]["Tables"]["agenda_audit_logs"]["Row"];

export type AgendaAuditLogInsert =
  Database["public"]["Tables"]["agenda_audit_logs"]["Insert"];
