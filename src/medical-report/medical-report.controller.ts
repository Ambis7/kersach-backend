import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
  Query,
  ForbiddenException,
} from '@nestjs/common';
import { MedicalReportService } from './medical-report.service';
import { CreateMedicalReportDto, UpdateMedicalReportDto } from './dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guard';

@ApiTags('medical-reports')
@Controller('medical-reports')
export class MedicalReportController {
  constructor(private readonly medicalReportService: MedicalReportService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new medical report' })
  @ApiResponse({ status: 201, description: 'Report created' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  create(
    @Body() createMedicalReportDto: CreateMedicalReportDto,
    @Request() req,
  ) {
    if (req.user.role !== 'DOCTOR')
      throw new ForbiddenException('Doctors only');
    return this.medicalReportService.create(
      createMedicalReportDto,
      req.user.id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Get all medical reports' })
  @ApiResponse({ status: 200, description: 'List of reports' })
  @ApiQuery({
    name: 'patientId',
    required: false,
    description: 'Filter by patient ID',
  })
  findAll(@Query('patientId') patientId?: string) {
    return this.medicalReportService.findAll(patientId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get a medical report by ID' })
  @ApiResponse({ status: 200, description: 'Report details' })
  @ApiResponse({ status: 404, description: 'Report not found' })
  findOne(@Param('id') id: string) {
    return this.medicalReportService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a medical report' })
  @ApiResponse({ status: 200, description: 'Report updated' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  update(
    @Param('id') id: string,
    @Body() updateMedicalReportDto: UpdateMedicalReportDto,
    @Request() req,
  ) {
    if (req.user.role !== 'DOCTOR')
      throw new ForbiddenException('Doctors only');
    return this.medicalReportService.update(id, updateMedicalReportDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a medical report' })
  @ApiResponse({ status: 200, description: 'Report deleted' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  remove(@Param('id') id: string, @Request() req) {
    if (req.user.role !== 'DOCTOR')
      throw new ForbiddenException('Doctors only');
    return this.medicalReportService.remove(id);
  }
}
