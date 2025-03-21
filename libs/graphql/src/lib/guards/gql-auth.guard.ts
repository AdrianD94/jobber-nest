import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ClientGrpc } from '@nestjs/microservices';
import { catchError, map, Observable, of } from 'rxjs';
import { AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME, AuthServiceClient } from '@jobber/grpc';
@Injectable()
export class GqlAuthGuard implements CanActivate, OnModuleInit {
  private authService: AuthServiceClient;
  private readonly logger = new Logger(GqlAuthGuard.name);
  constructor(@Inject(AUTH_PACKAGE_NAME) private client: ClientGrpc) {}

  canActivate(context: ExecutionContext): boolean | Observable<boolean> {
    const token = this.getRequest(context).cookies?.Authentication;

    if (!token) {
      return false;
    }

    return this.authService.authenticate({ token }).pipe(
      map(
        (res) => {
          this.getRequest(context).user = res;
          return true;
        },
        catchError((err) => {
          this.logger.error(err);
          return of(false);
        })
      )
    );
  }
  onModuleInit() {
    this.authService =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  private getRequest(context: ExecutionContext) {
    return GqlExecutionContext.create(context).getContext().req;
  }
}
