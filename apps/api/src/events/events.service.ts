import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.event.findMany({
      where: { active: true },
      orderBy: { startsAt: 'asc' }
    });
  }

  async findBySlug(slug: string) {
    const event = await this.prisma.event.findUnique({
      where: { slug }
    });

    if (!event || !event.active) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  create(dto: CreateEventDto) {
    return this.prisma.event.create({
      data: {
        ...dto,
        startsAt: new Date(dto.startsAt),
        endsAt: dto.endsAt ? new Date(dto.endsAt) : undefined
      }
    });
  }

  async update(id: number, dto: UpdateEventDto) {
    await this.ensureExists(id);

    return this.prisma.event.update({
      where: { id },
      data: {
        ...dto,
        startsAt: dto.startsAt ? new Date(dto.startsAt) : undefined,
        endsAt: dto.endsAt ? new Date(dto.endsAt) : undefined
      }
    });
  }

  async remove(id: number) {
    await this.ensureExists(id);
    return this.prisma.event.delete({ where: { id } });
  }

  private async ensureExists(id: number) {
    const event = await this.prisma.event.findUnique({ where: { id } });

    if (!event) {
      throw new NotFoundException('Event not found');
    }
  }
}
