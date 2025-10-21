import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Prisma } from '@prisma/client';
import { PrismaModule } from '@/prisma/prisma.module';
import { UploadModule } from '@/upload/upload.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [PrismaModule,UploadModule],
})
export class ProductModule {}
