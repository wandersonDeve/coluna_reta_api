import { Student } from './../entities/student.entity';

export class CreateStudentDto extends Student {
  name: string;
  birth_date: string;
  phone: string;
  institution_id?: number;
  address_id?: number;
}
