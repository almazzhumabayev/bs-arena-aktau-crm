import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';

@Injectable()
export class MembershipsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.membership.findMany({
      where: { active: true },
      orderBy: [{ sortOrder: 'asc' }, { price: 'asc' }]
    });
  }

  async findOne(id: number) {
    const membership = await this.prisma.membership.findUnique({
      where: { id }
    });

    if (!membership || !membership.active) {
      throw new NotFoundException('Membership not found');
    }

    return membership;
  }

  create(dto: CreateMembershipDto) {
    return this.prisma.membership.create({ data: dto });
  }

  async update(id: number, dto: UpdateMembershipDto) {
    await this.ensureExists(id);
    return this.prisma.membership.update({
      where: { id },
      data: dto
    });
  }

  async remove(id: number) {
    await this.ensureExists(id);
    return this.prisma.membership.delete({ where: { id } });
  }

  private async ensureExists(id: number) {
    const membership = await this.prisma.membership.findUnique({ where: { id } });

    if (!membership) {
      throw new NotFoundException('Membership not found');
    }
  }
}
