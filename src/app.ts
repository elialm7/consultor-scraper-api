
import path from 'path';
import express from 'express';
import { router } from '../src/api/routes/consultor.router';
import expressLayouts from 'express-ejs-layouts';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT, () => {
  console.log(`API Server is running on port ${PORT}`);
});
