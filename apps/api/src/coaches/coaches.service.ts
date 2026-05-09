import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCoachDto } from './dto/create-coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';

@Injectable()
export class CoachesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.coach.findMany({
      where: { active: true },
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }]
    });
  }

  async findOne(id: number) {
    const coach = await this.prisma.coach.findUnique({
      where: { id }
    });

    if (!coach || !coach.active) {
      throw new NotFoundException('Coach not found');
    }

    return coach;
  }

  create(dto: CreateCoachDto) {
    return this.prisma.coach.create({ data: dto });
  }

  async update(id: number, dto: UpdateCoachDto) {
    await this.ensureExists(id);
    return this.prisma.coach.update({
      where: { id },
      data: dto
    });
  }

  async remove(id: number) {
    await this.ensureExists(id);
    return this.prisma.coach.delete({ where: { id } });
  }

  private async ensureExists(id: number) {
    const coach = await this.prisma.coach.findUnique({ where: { id } });

    if (!coach) {
      throw new NotFoundException('Coach not found');
    }
  }
}
