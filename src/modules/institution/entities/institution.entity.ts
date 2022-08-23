export class Institution {
  id: number;
  name: string;
  phone_number: string;
  address_id: number | null;
  created_at: Date;
  updated_at: Date;
  deleted: boolean;
}
