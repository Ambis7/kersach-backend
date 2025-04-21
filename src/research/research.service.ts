import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateResearchDto, UpdateResearchDto } from './dto';

@Injectable()
export class ResearchService {
  constructor(private prisma: PrismaService) {}

  async create(createResearchDto: CreateResearchDto) {
    return this.prisma.research.create({
      data: {
        ...createResearchDto,
        data: JSON.parse(createResearchDto.data),
      },
    });
  }

  async findAll(patientId?: string) {
    return this.prisma.research.findMany({
      where: patientId ? { patientId } : {},
      include: { patient: true },
    });
  }

  async findOne(id: string) {
    const research = await this.prisma.research.findUnique({
      where: { id },
      include: { patient: true },
    });
    if (!research) throw new NotFoundException('Research not found');
    return research;
  }

  async update(id: string, updateResearchDto: UpdateResearchDto) {
    if (updateResearchDto.data) {
      updateResearchDto.data = JSON.parse(updateResearchDto.data);
    }
    return this.prisma.research.update({
      where: { id },
      data: updateResearchDto,
    });
  }

  async remove(id: string) {
    return this.prisma.research.delete({ where: { id } });
  }
}
