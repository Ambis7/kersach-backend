import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateMedicalReportDto, UpdateMedicalReportDto } from './dto';

@Injectable()
export class MedicalReportService {
  constructor(private prisma: PrismaService) {}

  async create(
    createMedicalReportDto: CreateMedicalReportDto,
    doctorId: string,
  ) {
    return this.prisma.medicalReport.create({
      data: {
        ...createMedicalReportDto,
        findings: JSON.parse(createMedicalReportDto.findings),
        doctorId,
      },
    });
  }

  async findAll(patientId?: string) {
    return this.prisma.medicalReport.findMany({
      where: patientId ? { patientId } : {},
      include: { patient: true, doctor: true },
    });
  }

  async findOne(id: string) {
    const report = await this.prisma.medicalReport.findUnique({
      where: { id },
      include: { patient: true, doctor: true },
    });
    if (!report) throw new NotFoundException('Report not found');
    return report;
  }

  async findByPatientId(patientId: string) {
    return this.prisma.medicalReport.findMany({
      where: { patientId },
      include: { patient: true, doctor: true },
    });
  }

  async update(id: string, updateMedicalReportDto: UpdateMedicalReportDto) {
    if (updateMedicalReportDto.findings) {
      updateMedicalReportDto.findings = JSON.parse(
        updateMedicalReportDto.findings,
      );
    }
    return this.prisma.medicalReport.update({
      where: { id },
      data: updateMedicalReportDto,
    });
  }

  async remove(id: string) {
    return this.prisma.medicalReport.delete({ where: { id } });
  }
}
