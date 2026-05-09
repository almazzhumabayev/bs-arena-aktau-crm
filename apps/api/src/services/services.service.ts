import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.service.findMany({
      where: { active: true },
      orderBy: [{ sortOrder: 'asc' }, { title: 'asc' }]
    });
  }

  async findBySlug(slug: string) {
    const service = await this.prisma.service.findUnique({
      where: { slug }
    });

    if (!service || !service.active) {
      throw new NotFoundException('Service not found');
    }

    return service;
  }

  create(dto: CreateServiceDto) {
    return this.prisma.service.create({ data: dto });
  }

  async update(id: number, dto: UpdateServiceDto) {
    await this.ensureExists(id);
    return this.prisma.service.update({
      where: { id },
      data: dto
    });
  }

  async remove(id: number) {
    await this.ensureExists(id);
    return this.prisma.service.delete({ where: { id } });
  }

  private async ensureExists(id: number) {
    const service = await this.prisma.service.findUnique({ where: { id } });

    if (!service) {
      throw new NotFoundException('Service not found');
    }
  }
}
