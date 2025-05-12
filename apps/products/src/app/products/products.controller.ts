import {
  CreateProductRequest,
  ProductsServiceController,
  ProductsServiceControllerMethods,
} from '@jobber/grpc';
import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller()
@ProductsServiceControllerMethods()
export class ProductsController implements ProductsServiceController {
  constructor(private readonly productsService: ProductsService) {}
  createProduct(request: CreateProductRequest) {
    return this.productsService.createProduct(request);
  }
}
