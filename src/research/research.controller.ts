import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ResearchService } from './research.service';
import { CreateResearchDto, UpdateResearchDto } from './dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guard';

@ApiTags('research')
@Controller('research')
export class ResearchController {
  constructor(private readonly researchService: ResearchService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new research' })
  @ApiResponse({ status: 201, description: 'Research created' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  create(@Body() createResearchDto: CreateResearchDto) {
    return this.researchService.create(createResearchDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Get all research' })
  @ApiResponse({ status: 200, description: 'List of research' })
  @ApiQuery({
    name: 'patientId',
    required: false,
    description: 'Filter by patient ID',
  })
  findAll(@Query('patientId') patientId?: string) {
    return this.researchService.findAll(patientId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('patient')
  @ApiOperation({ summary: 'Get research by patient ID' })
  @ApiResponse({ status: 200, description: 'Research details' })
  @ApiResponse({ status: 404, description: 'Research not found' })
  findOneByPatientId(@Query('patientId') patientId: string) {
    return this.researchService.findOneByPatientId(patientId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get a research by ID' })
  @ApiResponse({ status: 200, description: 'Research details' })
  @ApiResponse({ status: 404, description: 'Research not found' })
  findOne(@Param('id') id: string) {
    return this.researchService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a research' })
  @ApiResponse({ status: 200, description: 'Research updated' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  update(
    @Param('id') id: string,
    @Body() updateResearchDto: UpdateResearchDto,
  ) {
    return this.researchService.update(id, updateResearchDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a research' })
  @ApiResponse({ status: 200, description: 'Research deleted' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  remove(@Param('id') id: string) {
    return this.researchService.remove(id);
  }
}
