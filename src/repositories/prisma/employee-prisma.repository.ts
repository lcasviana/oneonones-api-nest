import { PrismaService } from '@database';
import { EmployeeInputDto } from '@dtos';
import { Injectable } from '@nestjs/common';
import { Employee } from '@prisma/client';
import { EmployeeRepository } from '@repositories';

@Injectable()
export class EmployeePrismaRepository implements EmployeeRepository {
  constructor(private prismaService: PrismaService) {}

  public async getAll(): Promise<Array<Employee>> {
    const employees: Array<Employee> = await this.prismaService.employee.findMany();
    return employees;
  }

  public async getById(id: string): Promise<Employee | null> {
    const employee: Employee | null = await this.prismaService.employee.findFirst({ where: { id } });
    return employee;
  }

  public async getByEmail(email: string): Promise<Employee | null> {
    const employee: Employee | null = await this.prismaService.employee.findFirst({ where: { email } });
    return employee;
  }

  public async insert(input: EmployeeInputDto): Promise<Employee> {
    const employee: Employee = await this.prismaService.employee.create({ data: input });
    return employee;
  }

  public async update(id: string, input: EmployeeInputDto): Promise<Employee> {
    const employee: Employee = await this.prismaService.employee.update({
      data: { ...input, updatedAt: new Date() },
      where: { id },
    });
    return employee;
  }

  public async delete(id: string): Promise<void> {
    await this.prismaService.employee.delete({ where: { id } });
  }
}
