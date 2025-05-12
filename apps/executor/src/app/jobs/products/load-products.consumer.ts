import {
  Packages,
  PRODUCTS_SERVICE_NAME,
  ProductsServiceClient,
} from '@jobber/grpc';
import { Jobs } from '@jobber/nestjs';
import {
  LoadProductsMessage,
  PulsarClient,
  PulsarConsumer,
} from '@jobber/pulsar';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LoadProductsConsumer
  extends PulsarConsumer<LoadProductsMessage>
  implements OnModuleInit
{
  private productsService: ProductsServiceClient;
  constructor(
    pulsarClient: PulsarClient,
    @Inject(Packages.PRODUCTS) private clientProducts: ClientGrpc
  ) {
    super(pulsarClient, Jobs.LOAD_PRODUCTS);
  }

  async onModuleInit() {
    this.productsService =
      this.clientProducts.getService<ProductsServiceClient>(
        PRODUCTS_SERVICE_NAME
      );
    console.log(this.productsService);
    await super.onModuleInit();
  }

  protected async onMessage(data: LoadProductsMessage) {
    this.logger.log(`Loading products...`);
    try {
      await firstValueFrom(this.productsService.createProduct(data));
    } catch (error) {
      console.error(error);
    }
    this.logger.log(`Done`);
  }
}
