import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const session = require("express-session")
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 5000;

  app.enableCors();
  app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true
    })
  );
  await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
}
bootstrap();
