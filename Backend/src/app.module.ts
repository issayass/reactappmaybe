import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RecipeIngredientsModule } from '@/recipe-ingredients/recipe-ingredients.module';
import { RecipesModule } from './recipes/recipes.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { UserManagementModule } from '@/user-management/modules/user-management.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Configure a typeorm module for use.
    TypeOrmModule.forRoot({
      // Database
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true, // __dirname: Node.js global var that refers to the directory
      // of the current module, e.g., CptS322-Project/backend/src/user
      // This is then concatenated with a recursive glob pattern
      // `/**/*/*.entity{.ts,.js}'
      synchronize: true, // Synchronize tells the database to synchronize the schema with defined entities.

      /** synchronize: true should only be used in development. If used in production, this can lead to unexpected
       *                data loss or schema changes **/
    }),
    AuthModule,
    RecipeIngredientsModule,
    RecipesModule,
    OrderDetailsModule,
    UserManagementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}