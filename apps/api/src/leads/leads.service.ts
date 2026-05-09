import { Injectable, NotFoundException } from '@nestjs/common';
import { LeadStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';

@Injectable()
export class LeadsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateLeadDto) {
    return this.prisma.lead.create({
      data: {
        ...dto,
        status: LeadStatus.NEW
      }
    });
  }

  findAll() {
    return this.prisma.lead.findMany({
      include: {
        comments: {
          include: {
            user: {
              select: { id: true, name: true, email: true, role: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(id: number) {
    const lead = await this.prisma.lead.findUnique({
      where: { id },
      include: {
        comments: {
          include: {
            user: {
              select: { id: true, name: true, email: true, role: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!lead) {
      throw new NotFoundException('Lead not found');
    }

    return lead;
  }

  async updateStatus(id: number, status: LeadStatus) {
    await this.findOne(id);

    return this.prisma.lead.update({
      where: { id },
      data: { status },
      include: {
        comments: {
          include: {
            user: {
              select: { id: true, name: true, email: true, role: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });
  }

  async addComment(id: number, body: string, userId: number) {
    await this.findOne(id);

    return this.prisma.leadComment.create({
      data: {
        body,
        leadId: id,
        userId
      },
      include: {
        user: {
          select: { id: true, name: true, email: true, role: true }
        }
      }
    });
  }
}
