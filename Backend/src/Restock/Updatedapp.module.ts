import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserCredentialsModule } from '@/user-credentials/user-credentials.module';
import { UserInfoModule } from '@/user-info/user-info.module';
import { UserInfo } from '@/user-info/user-info';
import { UserCredentials } from '@/user-credentials/user-credentials';
import { AuthModule } from './auth/auth.module';
import { RecipeIngredientsModule } from '@/recipe-ingredients/recipe-ingredients.module';
import { RecipesModule } from './recipes/recipes.module';
import { Recipes } from './recipes/recipes';
import { Ingredients } from './ingredients/ingredients';
import { RecipeIngredients } from '@/recipe-ingredients/recipe-ingredients';
import { OrderDetails } from './order-details/order-details';
import { Orders } from './orders/orders';
import { OrderDetailsModule } from './order-details/order-details.module';
import { Restock } from './restock/restock';
import { RestockItems } from './restockitems/restockitems';
import { RestockModule } from './restock/restock.module';
import { RestockItemsModule } from './restockitems/restockitems.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        UserCredentials,
        UserInfo,
        Recipes,
        Ingredients,
        RecipeIngredients,
        OrderDetails,
        Orders,
        Restock,
        RestockItems,
      ],
      synchronize: true,
    }),
    UserCredentialsModule,
    UserInfoModule,
    AuthModule,
    RecipeIngredientsModule,
    RecipesModule,
    OrderDetailsModule,
    RestockModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
