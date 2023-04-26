import { EmployeeInputDto } from '@dtos';
import { Employee } from '@prisma/client';

export abstract class EmployeeRepository {
  abstract getAll(): Promise<Array<Employee>>;
  abstract getById(id: string): Promise<Employee | null>;
  abstract getByEmail(email: string): Promise<Employee | null>;
  abstract insert(input: EmployeeInputDto): Promise<Employee>;
  abstract update(id: string, input: EmployeeInputDto): Promise<Employee>;
  abstract delete(id: string): Promise<void>;
}
