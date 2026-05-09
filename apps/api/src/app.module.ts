import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CoachesModule } from './coaches/coaches.module';
import { EventsModule } from './events/events.module';
import { HealthController } from './health.controller';
import { LeadsModule } from './leads/leads.module';
import { MembershipsModule } from './memberships/memberships.module';
import { PrismaModule } from './prisma/prisma.module';
import { ScheduleModule } from './schedule/schedule.module';
import { ServicesModule } from './services/services.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    LeadsModule,
    ServicesModule,
    CoachesModule,
    MembershipsModule,
    ScheduleModule,
    EventsModule
  ],
  controllers: [HealthController]
})
export class AppModule {}
