import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateScheduleItemDto } from './dto/create-schedule-item.dto';
import { UpdateScheduleItemDto } from './dto/update-schedule-item.dto';

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.scheduleItem.findMany({
      where: { active: true },
      include: {
        coach: true,
        service: true
      },
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }]
    });
  }

  create(dto: CreateScheduleItemDto) {
    return this.prisma.scheduleItem.create({ data: dto });
  }

  async update(id: number, dto: UpdateScheduleItemDto) {
    await this.ensureExists(id);
    return this.prisma.scheduleItem.update({
      where: { id },
      data: dto
    });
  }

  async remove(id: number) {
    await this.ensureExists(id);
    return this.prisma.scheduleItem.delete({ where: { id } });
  }

  private async ensureExists(id: number) {
    const scheduleItem = await this.prisma.scheduleItem.findUnique({ where: { id } });

    if (!scheduleItem) {
      throw new NotFoundException('Schedule item not found');
    }
  }
}
