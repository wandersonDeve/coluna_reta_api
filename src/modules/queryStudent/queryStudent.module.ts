import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { QueryStudentController } from './queryStudent.controller';
import { CreateQueryService } from './services';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [QueryStudentController],
  providers: [CreateQueryService],
})
export class QueryStudentModule {}
