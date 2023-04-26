import { EmployeeInputDto } from '@dtos';
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, UseFilters } from '@nestjs/common';
import { Employee } from '@prisma/client';
import { EmployeeRepository } from '@repositories';
import { HttpExceptionFilter } from 'src/middlewares/http-exception-filter';

@UseFilters(HttpExceptionFilter)
@Controller({ version: '1', path: 'employee' })
export class EmployeeController {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  @Get()
  public async getAll(@Query('email') email?: string): Promise<Array<Employee> | Employee> {
    if (!email) return await this.employeeRepository.getAll();
    const employee: Employee | null = await this.employeeRepository.getByEmail(email);
    if (!employee) throw new NotFoundException();
    return employee;
  }

  @Get(':id')
  public async getById(@Param('id') id: string): Promise<Employee> {
    const employee: Employee | null = await this.employeeRepository.getById(id);
    if (!employee) throw new NotFoundException(`Employee ${id} not found.`);
    return employee;
  }

  @Post()
  public async insert(@Body() input: EmployeeInputDto): Promise<Employee> {
    return await this.employeeRepository.insert(input);
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() input: EmployeeInputDto): Promise<Employee> {
    return await this.employeeRepository.update(id, input);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<void> {
    await this.employeeRepository.delete(id);
  }
}
