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
  ForbiddenException,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto, UpdatePatientDto } from './dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guard';

@ApiTags('patients')
@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new patient' })
  @ApiResponse({ status: 201, description: 'Patient created' })
  create(@Body() createPatientDto: CreatePatientDto, @Request() req) {
    if (req.user.role !== 'ADMIN') throw new ForbiddenException('Admins only');
    return this.patientService.create(createPatientDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Get all patients' })
  @ApiResponse({ status: 200, description: 'List of patients' })
  findAll() {
    return this.patientService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get a patient by ID' })
  @ApiResponse({ status: 200, description: 'Patient details' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a patient' })
  @ApiResponse({ status: 200, description: 'Patient updated' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  update(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto,
    @Request() req,
  ) {
    if (req.user.role !== 'ADMIN') throw new ForbiddenException('Admins only');
    return this.patientService.update(id, updatePatientDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a patient' })
  @ApiResponse({ status: 200, description: 'Patient deleted' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  remove(@Param('id') id: string, @Request() req) {
    if (req.user.role !== 'ADMIN') throw new ForbiddenException('Admins only');
    return this.patientService.remove(id);
  }
}
