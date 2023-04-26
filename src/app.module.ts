import { EmployeeController } from '@controllers';
import { PrismaService } from '@database';
import { Module, Provider } from '@nestjs/common';
import { EmployeePrismaRepository, EmployeeRepository } from '@repositories';

const prisma: Array<Provider> = [
  PrismaService,
  EmployeePrismaRepository,
  { provide: EmployeeRepository, useClass: EmployeePrismaRepository },
];

@Module({
  controllers: [EmployeeController],
  providers: [...prisma],
})
export class AppModule {}
