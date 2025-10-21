import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from '@/upload/upload.service';
import type { Express } from 'express';
import { Multer } from 'multer';
import { log } from 'console';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService,private readonly uploadService: UploadService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async create(@Body() createProductDto: any,@UploadedFile() file?: Express.Multer.File) {
    createProductDto.categoryId = Number(createProductDto.categoryId);
    createProductDto.price = Number(createProductDto.price);
    createProductDto.quantity = Number(createProductDto.quantity);
    if(!file){
      log('No file uploaded, using default image');
      return this.productService.create(createProductDto);
    }
    const imageUrl = await this.uploadService.uploadImageToCloudinary(file);
    log('Image URL:', imageUrl.secure_url);
    createProductDto.imageUrl = imageUrl.secure_url;
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }
  @Get('paginated/list')
  async getProducts(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;

    return this.productService.getAllProducts(pageNum, limitNum);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
