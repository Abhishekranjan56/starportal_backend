import express, { urlencoded } from 'express';
import { RegisterRoutes } from '../build/routes';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../build/swagger.json';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './graphql/schema';
import { root } from './graphql/resolvers';



dotenv.config();

const app = express();

app.use(urlencoded({ extended: true }));
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  }));
mongoose.connect(process.env.MONGO_URI!, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
RegisterRoutes(app);

export { app };
